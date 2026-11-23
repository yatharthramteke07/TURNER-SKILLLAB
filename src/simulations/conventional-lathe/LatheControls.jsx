import React from 'react';
import {
  Sliders,
  Play,
  RotateCcw,
  Zap,
  Gauge,
  Layers,
  Wrench,
  Disc3,
  ShieldAlert
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useStudentStore } from '../../store/useStudentStore';

export default function LatheControls() {
  const language = useStudentStore((state) => state.language);
  const {
    selectedOperation,
    setSelectedOperation,
    spindleSpeed,
    setSpindleSpeed,
    spindleRunning,
    toggleSpindle,
    spindleDirection,
    setSpindleDirection,
    feedRate,
    setFeedRate,
    depthOfCut,
    setDepthOfCut,
    selectedChuck,
    setSelectedChuck,
    selectedTool,
    setSelectedTool,
    workpiece,
    setWorkpiece
  } = useSimulationStore();

  // Calculate live Cutting Speed V = (pi * D * N) / 1000 m/min
  const diameter = workpiece.currentDiameter || 50;
  const cuttingSpeed = Math.round((Math.PI * diameter * spindleSpeed) / 1000);

  const rpmPresets = [180, 360, 650, 1150, 1800];

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-200 overflow-y-auto p-4 space-y-5 text-xs select-none">
      {/* 1. Operation Selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>{language === 'hi' ? 'टर्निंग ऑपरेशन' : 'Machining Operation'}</span>
          <span className="text-blue-400 font-bold capitalize">{selectedOperation}</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {[
            { id: 'facing', label: 'Facing' },
            { id: 'plain-turning', label: 'Turning' },
            { id: 'step-turning', label: 'Step Turn' },
          ].map((op) => (
            <button
              key={op.id}
              onClick={() => setSelectedOperation(op.id)}
              className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all text-center ${
                selectedOperation === op.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Spindle Speed (RPM) & Cutting Speed Calculation */}
      <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-amber-500" />
            <span>Spindle Speed</span>
          </span>
          <span className="font-mono font-bold text-sm text-amber-400">
            {spindleSpeed} RPM
          </span>
        </div>

        {/* Speed Slider */}
        <input
          type="range"
          min="80"
          max="2000"
          step="20"
          value={spindleSpeed}
          onChange={(e) => setSpindleSpeed(Number(e.target.value))}
          className="w-full accent-blue-600 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
        />

        {/* RPM Preset Buttons */}
        <div className="flex justify-between gap-1">
          {rpmPresets.map((rpm) => (
            <button
              key={rpm}
              onClick={() => setSpindleSpeed(rpm)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                spindleSpeed === rpm
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {rpm}
            </button>
          ))}
        </div>

        {/* Live Cutting Speed Metrology Readout */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Cutting Speed (V):</span>
          <span className="font-mono font-bold text-emerald-400">
            {cuttingSpeed} m/min
          </span>
        </div>
      </div>

      {/* 3. Feed Rate & Depth of Cut */}
      <div className="grid grid-cols-2 gap-3">
        {/* Feed Rate */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
          <label className="text-[10px] font-bold uppercase text-slate-400 block">
            Feed (mm/rev)
          </label>
          <div className="text-sm font-mono font-bold text-blue-400">
            {feedRate.toFixed(2)}
          </div>
          <input
            type="range"
            min="0.05"
            max="0.40"
            step="0.02"
            value={feedRate}
            onChange={(e) => setFeedRate(Number(e.target.value))}
            className="w-full accent-blue-600 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Depth of Cut */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
          <label className="text-[10px] font-bold uppercase text-slate-400 block">
            Depth of Cut
          </label>
          <div className="text-sm font-mono font-bold text-indigo-400">
            {depthOfCut.toFixed(1)} mm
          </div>
          <input
            type="range"
            min="0.2"
            max="2.0"
            step="0.1"
            value={depthOfCut}
            onChange={(e) => setDepthOfCut(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* 4. Workpiece Specification */}
      <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          Workpiece Parameters
        </label>

        {/* Material Selection */}
        <div className="space-y-1">
          <span className="text-[11px] text-slate-400">Stock Material:</span>
          <select
            value={workpiece.material}
            onChange={(e) => setWorkpiece({ material: e.target.value })}
            className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Mild Steel (IS 2062)">Mild Steel (IS 2062)</option>
            <option value="Aluminium Alloy (6061)">Aluminium Alloy (6061)</option>
            <option value="Brass (CuZn39Pb3)">Brass Free Cutting</option>
            <option value="Grey Cast Iron (FG 200)">Grey Cast Iron (FG 200)</option>
          </select>
        </div>

        {/* Diameter */}
        <div className="flex items-center justify-between text-[11px] pt-1">
          <span className="text-slate-400">Stock Diameter:</span>
          <span className="font-mono font-bold text-white">⌀ {diameter} mm</span>
        </div>
      </div>

      {/* 5. Chuck & Tool Mounting */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          Tooling & Chuck Mounting
        </label>

        {/* Chuck toggle */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
          <button
            onClick={() => setSelectedChuck('3-jaw')}
            className={`flex-1 py-1 rounded-lg font-bold text-center text-xs transition-all ${
              selectedChuck === '3-jaw'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3-Jaw Chuck
          </button>
          <button
            onClick={() => setSelectedChuck('4-jaw')}
            className={`flex-1 py-1 rounded-lg font-bold text-center text-xs transition-all ${
              selectedChuck === '4-jaw'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4-Jaw Independent
          </button>
        </div>

        {/* Tool Insert */}
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
          <span className="text-slate-400">Tool Type:</span>
          <span className="font-bold text-amber-400">CNMG 120408 (Carbide)</span>
        </div>
      </div>
    </div>
  );
}
