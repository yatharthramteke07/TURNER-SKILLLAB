import React from 'react';
import { Award, CheckCircle2, Sparkles, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStudentStore } from '../../../store/useStudentStore';

export default function StageReview({ stageData, moduleTitle, moduleLO, isCompleted, onToggleComplete, allStagesCompleted }) {
  const language = useStudentStore((state) => state.language);
  const xp = useStudentStore((state) => state.xp);

  const takeaways = stageData?.keyTakeaways || [
    'Understood personal safety and machine emergency stoppage protocols.',
    'Mastered primary mechanical features of headstock, bed, carriage, and tailstock.',
    'Verified dimensional accuracy against DGT CTS 2.0 examination standards.'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300">
            Stage 7 • Final Review & Summary
          </span>
          <span className="text-xs text-slate-400 font-medium">{moduleLO}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {moduleTitle} — Competency Review
        </h2>

        {/* Certificate / Completion badge if all done */}
        {allStagesCompleted && (
          <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold">Module Fully Completed!</h3>
                <p className="text-xs text-emerald-100">
                  You have successfully finished all 7 stages of {moduleLO}.
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-white text-emerald-700 text-xs font-bold shadow-sm">
                +100 Bonus XP Awarded
              </span>
            </div>
          </div>
        )}

        {/* Key Takeaways */}
        <div className="mt-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {language === 'hi' ? 'सीखने के मुख्य निष्कर्ष' : 'Key Learning Outcomes Mastered'}
          </h4>

          <div className="space-y-2.5">
            {takeaways.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Module Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Link
            to="/modules"
            className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            ← Back to Modules Catalog
          </Link>

          <button
            onClick={onToggleComplete}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isCompleted
                ? (language === 'hi' ? 'समीक्षा पूर्ण' : 'Review Completed')
                : (language === 'hi' ? 'समीक्षा पूर्ण चिह्नित करें' : 'Mark Review as Completed')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
