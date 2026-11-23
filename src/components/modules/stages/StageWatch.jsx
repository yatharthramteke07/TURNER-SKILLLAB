import React from 'react';
import { Play, CheckCircle2, Clock, Sparkles, AlertCircle } from 'lucide-react';
import { useStudentStore } from '../../../store/useStudentStore';

export default function StageWatch({ stageData, isCompleted, onToggleComplete }) {
  const language = useStudentStore((state) => state.language);
  const data = stageData || {
    title: 'Trade Demonstration Video',
    duration: '10 mins',
    summary: 'Visual explanation of operations, machine controls, safety protocols, and correct workpiece alignment.'
  };

  return (
    <div className="space-y-6">
      {/* Video Container Placeholder / Embed */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center p-6 group">
        {/* Background gradient & grid */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-slate-950 to-slate-900 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-md">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg shadow-blue-500/20">
            <Play className="w-8 h-8 fill-current ml-1" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-bold mb-2">
            <Clock className="w-3.5 h-3.5" />
            {data.duration || '10 min'} • DGT CTS 2.0 Video
          </span>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            {data.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {data.summary}
          </p>
        </div>

        {/* Video progress mock footer */}
        <div className="absolute bottom-0 inset-x-0 h-1.5 bg-slate-800">
          <div className={`h-full bg-blue-500 transition-all ${isCompleted ? 'w-full' : 'w-1/3'}`} />
        </div>
      </div>

      {/* Video Summary Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{language === 'hi' ? 'वीडियो अवलोकन एवं मुख्य बिंदु' : 'Demonstration Key Focus'}</span>
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              {data.summary}
            </p>
          </div>

          <button
            onClick={onToggleComplete}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm shrink-0 ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isCompleted
                ? (language === 'hi' ? 'देखा गया (पूर्ण)' : 'Watched (Completed)')
                : (language === 'hi' ? 'देखा गया चिह्नित करें' : 'Mark Stage as Watched')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
