import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Box,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Terminal,
  Play,
  FileCheck2,
  Layers,
  Award,
  Target
} from 'lucide-react';
import { useStudentStore } from '../../store/useStudentStore';

export default function ModuleCard({ module }) {
  const language = useStudentStore((state) => state.language);
  const moduleProgress = useStudentStore(
    (state) => state.moduleProgress[module.id] || { completedStages: [], percentage: 0 }
  );
  const isCompletedInStore = useStudentStore((state) =>
    state.completedModules.includes(module.id)
  );

  const percentage = isCompletedInStore ? 100 : (moduleProgress.percentage || 0);

  // Determine status
  let status = 'not-started';
  if (percentage >= 100) {
    status = 'completed';
  } else if (percentage > 0) {
    status = 'in-progress';
  }

  const stagesList = [
    { key: 'watch', label: 'Watch', icon: Play },
    { key: 'read', label: 'Read', icon: BookOpen },
    { key: 'practice', label: 'Practice', icon: Layers },
    { key: 'simulate', label: 'Simulate', icon: Box },
    { key: 'quiz', label: 'Quiz', icon: FileCheck2 },
    { key: 'apply', label: 'Apply', icon: Target },
    { key: 'review', label: 'Review', icon: Award },
  ];

  const hasSim = module.simulations && module.simulations.length > 0;
  const isCNC = module.year === 2 && module.simulations?.some((s) => s.includes('cnc'));

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 group">
      {/* Top Header: Module #, LO tag, Status */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono">
            M{module.number < 10 ? `0${module.number}` : module.number}
          </span>

          {module.learningOutcomes?.map((lo) => (
            <span
              key={lo}
              className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40"
            >
              {lo}
            </span>
          ))}

          {hasSim && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                isCNC
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
              }`}
            >
              {isCNC ? <Terminal className="w-3 h-3" /> : <Box className="w-3 h-3" />}
              <span>{isCNC ? 'CNC Sim' : '3D Sim'}</span>
            </span>
          )}
        </div>

        {/* Status Badge */}
        <div>
          {status === 'completed' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language === 'hi' ? 'पूर्ण' : 'Completed'}</span>
            </span>
          )}
          {status === 'in-progress' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span>{language === 'hi' ? 'प्रगति पर' : 'In Progress'}</span>
            </span>
          )}
          {status === 'not-started' && (
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full">
              {language === 'hi' ? 'शुरू नहीं हुआ' : 'Not Started'}
            </span>
          )}
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
        {language === 'hi' ? (module.titleHi || module.title) : module.title}
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed flex-1">
        {language === 'hi' ? (module.descriptionHi || module.description) : module.description}
      </p>

      {/* 7-Stage Indicator Dots */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>{language === 'hi' ? '7-चरणीय प्रगति' : '7-Stage Progress'}</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{percentage}%</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {stagesList.map((st) => {
            const isStageDone = moduleProgress.completedStages?.includes(st.key) || isCompletedInStore;
            return (
              <div
                key={st.key}
                title={`${st.label}: ${isStageDone ? 'Completed' : 'Pending'}`}
                className="flex flex-col items-center gap-1 group/dot"
              >
                <div
                  className={`w-full h-1.5 rounded-full transition-all ${
                    isStageDone
                      ? 'bg-emerald-500'
                      : 'bg-slate-100 dark:bg-slate-800 group-hover/dot:bg-slate-200 dark:group-hover/dot:bg-slate-700'
                  }`}
                />
                <span className="text-[9px] text-slate-400 truncate max-w-full hidden sm:inline-block">
                  {st.label[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Footer: Action button */}
      <div className="mt-4 pt-3 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">
          {module.isPlaceholder ? (
            <span className="italic">Foundation content</span>
          ) : (
            <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Full Lesson
            </span>
          )}
        </span>

        <Link
          to={`/modules/${module.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 dark:text-slate-200 dark:hover:text-white text-xs font-bold transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <span>
            {percentage > 0
              ? (language === 'hi' ? 'जारी रखें' : 'Continue')
              : (language === 'hi' ? 'मॉड्यूल खोलें' : 'Open Module')}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
