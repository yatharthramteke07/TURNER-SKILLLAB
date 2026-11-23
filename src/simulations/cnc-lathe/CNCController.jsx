import React from 'react';
import { Terminal, Cpu, Gauge, Clock, Sparkles } from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';

export default function CNCController({ activeBlock, programName = 'O0001', cycleTimeSec = 0 }) {
  const spindleRunning = useSimulationStore((state) => state.spindleRunning);
  const spindleSpeed = useSimulationStore((state) => state.spindleSpeed);
  const feedRate = useSimulationStore((state) => state.feedRate);

  const formatCoord = (val) => {
    const num = Number(val || 0);
    const sign = num >= 0 ? '+' : '';
    return `${sign}${num.toFixed(3)}`;
  };

  const minutes = Math.floor(cycleTimeSec / 60);
  const seconds = Math.floor(cycleTimeSec % 60);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-100 font-mono text-xs select-none shadow-xl space-y-3">
      {/* Controller Top Title */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-white tracking-wide">FANUC Series 0i-TF</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-[10px] font-bold">
          {programName}
        </span>
      </div>

      {/* Controller Status Modes */}
      <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold">
        <div className="p-1 rounded bg-emerald-950/80 border border-emerald-600 text-emerald-300">
          MEM AUTO
        </div>
        <div
          className={`p-1 rounded border ${
            spindleRunning
              ? 'bg-amber-950/80 border-amber-600 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          SPN FWD
        </div>
        <div className="p-1 rounded bg-blue-950/80 border border-blue-600 text-blue-300">
          G54 WORK
        </div>
        <div className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
          SINGLE BLK
        </div>
      </div>

      {/* Coordinate Displays (G54 Work Coordinates) */}
      <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-2">
        <div className="text-[10px] uppercase font-bold text-slate-400 flex justify-between">
          <span>ACTUAL POSITION (G54)</span>
          <span className="text-blue-400">METRIC mm</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm font-extrabold">
          <div className="flex items-baseline justify-between p-2 rounded-lg bg-slate-900/90 border border-slate-800">
            <span className="text-amber-400 text-xs">X</span>
            <span className="text-white text-base">
              {formatCoord(activeBlock?.params?.X ?? 50.0)}
            </span>
          </div>

          <div className="flex items-baseline justify-between p-2 rounded-lg bg-slate-900/90 border border-slate-800">
            <span className="text-amber-400 text-xs">Z</span>
            <span className="text-white text-base">
              {formatCoord(activeBlock?.params?.Z ?? 2.0)}
            </span>
          </div>
        </div>
      </div>

      {/* Modal Codes & Machine Status */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">MODAL CODES</span>
          <div className="text-slate-200 font-bold truncate">
            G01 G90 G95 G97 G21
          </div>
        </div>

        <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">EST. CYCLE TIME</span>
          <div className="text-emerald-400 font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Active Line Display */}
      {activeBlock && (
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] flex items-center justify-between">
          <span className="text-slate-500 font-bold">N{activeBlock.line}:</span>
          <span className="text-yellow-300 font-bold truncate max-w-[200px]">
            {activeBlock.raw}
          </span>
        </div>
      )}
    </div>
  );
}
