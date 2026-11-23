import React from 'react';
import { Target, CheckCircle2, ArrowRight, Sparkles, Wrench, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStudentStore } from '../../../store/useStudentStore';

export default function StageApply({ stageData, isCompleted, onToggleComplete }) {
  const language = useStudentStore((state) => state.language);
  const data = stageData || {
    title: 'Practical Workshop Challenge',
    task: 'Execute the standard operational setup on the machine. Verify alignment tolerances and record readings in your practical job diary.'
  };

  const steps = [
    'Verify machine bed cleanliness and wipe off grit or fine metal dust.',
    'Inspect spindle center height using a 60-degree center gage.',
    'Securely clamp cutting tool with minimal overhang (< 25 mm).',
    'Set correct gearbox lever configuration for calculated spindle RPM.',
    'Execute trial cut and verify dimensional limits with precision micrometers.'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300">
              Stage 6 • Practical Application
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {data.title}
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> +25 XP Reward
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          {data.task}
        </p>

        {/* Practical Steps Checklist */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-blue-600" />
            <span>Standard Practical SOP Checklist</span>
          </h4>

          <div className="space-y-2.5">
            {steps.map((st, i) => (
              <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Links to Missions */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                View related Trade Challenge in Missions
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Complete missions to rank up from Apprentice to Master Turner.
              </p>
            </div>
          </div>
          <Link
            to="/missions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700"
          >
            <span>Open Missions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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
                ? (language === 'hi' ? 'चुनौती पूर्ण' : 'Application Completed')
                : (language === 'hi' ? 'चुनौती पूर्ण चिह्नित करें' : 'Mark Challenge as Completed')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
