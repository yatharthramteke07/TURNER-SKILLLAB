import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Play, CheckCircle2, ArrowRight, Sparkles, Terminal, ExternalLink } from 'lucide-react';
import { useStudentStore } from '../../../store/useStudentStore';

export default function StageSimulate({ stageData, moduleSimulations, isCompleted, onToggleComplete }) {
  const language = useStudentStore((state) => state.language);
  const simId = stageData?.simulationId || (moduleSimulations && moduleSimulations[0]) || 'conventional-lathe';

  const isCNC = simId.includes('cnc');
  const targetRoute = isCNC ? '/virtual-labs/cnc-lathe' : '/virtual-labs/conventional-lathe';

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300">
            3D Virtual Lab Integration
          </span>
          <span className="text-xs text-slate-400 font-medium">Interactive Simulation</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {stageData?.title || 'Interactive 3D Virtual Lab Experience'}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
          {stageData?.description ||
            'Apply theory directly on the virtual 3D machine. Practice mounting, alignment, speed adjustments, and turning operations in a risk-free environment.'}
        </p>

        {/* 3D Simulation Launch Card */}
        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 text-white relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 ${
                  isCNC ? 'bg-indigo-600' : 'bg-blue-600'
                }`}
              >
                {isCNC ? <Terminal className="w-7 h-7" /> : <Box className="w-7 h-7" />}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>{isCNC ? 'CNC Turning Simulator' : 'Conventional Lathe 3D Simulator'}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    WebGL 3D
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Full industrial controls, OrbitControls, workpiece profile generation.
                </p>
              </div>
            </div>

            <Link
              to={targetRoute}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 shrink-0"
            >
              <span>{language === 'hi' ? '3D सिम्युलेटर खोलें' : 'Launch 3D Simulator'}</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
            <Box className="w-48 h-48 text-white" />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onToggleComplete}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isCompleted
                ? (language === 'hi' ? 'सिमुलेशन पूर्ण' : 'Simulation Completed')
                : (language === 'hi' ? 'सिमुलेशन पूर्ण चिह्नित करें' : 'Mark Simulation as Completed')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
