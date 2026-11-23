import React from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, Info, Check } from 'lucide-react';
import { useStudentStore } from '../../../store/useStudentStore';

export default function StageRead({ stageData, isCompleted, onToggleComplete }) {
  const language = useStudentStore((state) => state.language);
  const data = stageData || {
    title: 'Trade Theory and Technical Concepts',
    sections: [
      {
        heading: '1. Standard Workshop Regulations',
        content: 'Review the technical handbook sections, machinery parameters, and safety regulations for this topic.'
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Article Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
            DGT CTS 2.0 • Trade Theory
          </span>
          <span className="text-xs text-slate-400 font-medium">Estimated read: 6 min</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {data.title}
        </h2>

        {/* Content Sections */}
        <div className="mt-6 space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          {data.sections?.map((sec, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
                <span>{sec.heading}</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Tip Box */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">ITI Examiner Tip:</span> Always inspect the zero error on vernier instruments before reporting final tolerance readings in practical journals.
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
                ? (language === 'hi' ? 'पढ़ा गया (पूर्ण)' : 'Theory Read (Completed)')
                : (language === 'hi' ? 'पढ़ा गया चिह्नित करें' : 'Mark Stage as Read')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
