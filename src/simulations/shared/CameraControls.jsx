import React from 'react';
import { Camera, RotateCcw, Eye, Compass } from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';

export default function CameraControls({ onResetCamera, onSetPreset }) {
  const cameraPreset = useSimulationStore((state) => state.cameraPreset);
  const setCameraPreset = useSimulationStore((state) => state.setCameraPreset);

  const presets = [
    { key: 'isometric', label: 'Isometric', icon: Compass },
    { key: 'front', label: 'Front (X-Z)', icon: Eye },
    { key: 'top', label: 'Top (Spindle)', icon: Camera },
    { key: 'tool-view', label: 'Tool Zoom', icon: Eye },
  ];

  const handleSelectPreset = (key) => {
    setCameraPreset(key);
    if (onSetPreset) onSetPreset(key);
  };

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs shadow-lg">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 hidden sm:inline-block">
        Camera
      </span>

      {presets.map((p) => {
        const Icon = p.icon;
        const isActive = cameraPreset === p.key;

        return (
          <button
            key={p.key}
            onClick={() => handleSelectPreset(p.key)}
            className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={`View: ${p.label}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{p.label}</span>
          </button>
        );
      })}

      <div className="w-px h-4 bg-slate-800 mx-1"></div>

      <button
        onClick={onResetCamera}
        className="px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
        title="Reset Camera Orientation"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span className="hidden lg:inline text-xs font-semibold">Reset</span>
      </button>
    </div>
  );
}
