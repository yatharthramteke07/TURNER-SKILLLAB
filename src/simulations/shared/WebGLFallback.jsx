import React from 'react';
import { AlertTriangle, RefreshCw, Monitor } from 'lucide-react';

export default function WebGLFallback({ onRetry }) {
  return (
    <div className="min-h-[400px] h-full w-full flex flex-col items-center justify-center p-8 text-center bg-slate-950 text-slate-100 rounded-3xl border border-slate-800">
      <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/10">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        WebGL Graphics Acceleration Unavailable
      </h3>

      <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        Your browser or hardware graphics driver currently cannot initialize WebGL 3D context. Ensure hardware acceleration is enabled in your browser settings (Chrome/Edge: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-200">chrome://settings/system</code>).
      </p>

      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Initializing 3D</span>
          </button>
        )}

        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 rounded-2xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
