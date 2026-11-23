import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  StepForward,
  Sparkles,
  Zap,
  Gauge
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';

export default function SimulationToolbar({
  onStart,
  onPause,
  onResume,
  onReset,
  onStep,
  customStatus
}) {
  const {
    status,
    playbackSpeed,
    setPlaybackSpeed,
    simplifiedGraphics,
    toggleSimplifiedGraphics,
    stepMode,
    setStepMode,
    spindleRunning,
    toggleSpindle
  } = useSimulationStore();

  const effectiveStatus = customStatus || status;
  const isRunning = effectiveStatus === 'running';

  return (
    <div className="h-16 bg-slate-900 border-t border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-3 text-slate-200">
      {/* Left: Playback Controls */}
      <div className="flex items-center gap-2">
        {/* Play / Pause toggle */}
        {isRunning ? (
          <button
            onClick={onPause}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all"
            title="Pause Simulation"
          >
            <Pause className="w-4 h-4 fill-current" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={effectiveStatus === 'paused' ? onResume : onStart}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all"
            title="Start Machining Simulation"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{effectiveStatus === 'paused' ? 'Resume' : 'Start Machining'}</span>
          </button>
        )}

        {/* Step Forward button */}
        <button
          onClick={onStep}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
          title="Single Step Mode"
        >
          <StepForward className="w-4 h-4" />
        </button>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 text-xs font-semibold"
          title="Reset Stock & Tool Position"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Center: Spindle Power Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSpindle}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border font-mono font-bold text-xs transition-all ${
            spindleRunning
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
              : 'bg-rose-950/40 border-rose-800/80 text-rose-400 hover:bg-rose-900/50'
          }`}
          title="Spindle Motor Power Switch"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              spindleRunning ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'
            }`}
          />
          <span>SPINDLE: {spindleRunning ? 'RUNNING' : 'STOPPED'}</span>
        </button>
      </div>

      {/* Right: Playback Speed & Simplified Graphics */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Speed Selector */}
        <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
          {[0.5, 1.0, 2.0].map((s) => (
            <button
              key={s}
              onClick={() => setPlaybackSpeed(s)}
              className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                playbackSpeed === s
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Simplified Graphics Mode */}
        <button
          onClick={toggleSimplifiedGraphics}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            simplifiedGraphics
              ? 'bg-amber-950/60 border-amber-600 text-amber-300'
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
          }`}
          title="Toggle simplified rendering (no shadows, lower pixel ratio for low-end hardware)"
        >
          <Zap className="w-3.5 h-3.5" />
          <span className="hidden md:inline">
            {simplifiedGraphics ? 'Low-Graphics ON' : 'Graphics: Standard'}
          </span>
        </button>
      </div>
    </div>
  );
}
