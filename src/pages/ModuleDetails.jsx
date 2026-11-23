import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  BookOpen,
  Layers,
  Box,
  FileCheck2,
  Target,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Share2
} from 'lucide-react';
import { useStudentStore } from '../store/useStudentStore';
import { getModuleById } from '../data/modulesHelper';
import EmptyState from '../components/common/EmptyState';

// Stage Renderers
import StageWatch from '../components/modules/stages/StageWatch';
import StageRead from '../components/modules/stages/StageRead';
import StagePractice from '../components/modules/stages/StagePractice';
import StageSimulate from '../components/modules/stages/StageSimulate';
import StageQuiz from '../components/modules/stages/StageQuiz';
import StageApply from '../components/modules/stages/StageApply';
import StageReview from '../components/modules/stages/StageReview';

export default function ModuleDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const foundFromLesson = params.lessonId ? getLessonById(params.lessonId)?.module?.id : null;
  const moduleId = params.moduleId || foundFromLesson;

  const module = getModuleById(moduleId);
  const language = useStudentStore((state) => state.language);
  const updateStageProgress = useStudentStore((state) => state.updateStageProgress);
  const addXP = useStudentStore((state) => state.addXP);

  // Module Progress from store
  const storedProgress = useStudentStore(
    (state) => state.moduleProgress[moduleId] || { completedStages: [], percentage: 0 }
  );
  const isCompletedModule = useStudentStore((state) =>
    state.completedModules.includes(moduleId)
  );

  const completedStages = new Set(storedProgress.completedStages || []);

  const stagesList = [
    { key: 'watch', label: 'Watch', labelHi: 'देखें', icon: Play, subtitle: 'Video Demo' },
    { key: 'read', label: 'Read', labelHi: 'पढ़ें', icon: BookOpen, subtitle: 'Trade Theory' },
    { key: 'practice', label: 'Practice', labelHi: 'अभ्यास', icon: Layers, subtitle: 'Interactive Drills' },
    { key: 'simulate', label: 'Simulate', labelHi: 'सिमुलेट', icon: Box, subtitle: '3D Virtual Lab' },
    { key: 'quiz', label: 'Quiz', labelHi: 'क्विज', icon: FileCheck2, subtitle: 'LO Assessment' },
    { key: 'apply', label: 'Apply', labelHi: 'लागू करें', icon: Target, subtitle: 'Practical Task' },
    { key: 'review', label: 'Review', labelHi: 'समीक्षा', icon: Award, subtitle: 'Summary & Cert' },
  ];

  // Active Stage Tab
  const [activeStageKey, setActiveStageKey] = useState('watch');

  // If module not found
  if (!module) {
    return (
      <EmptyState
        title={language === 'hi' ? 'मॉड्यूल नहीं मिला' : 'Module Not Found'}
        description={`The requested module with ID "${moduleId}" does not exist in the curriculum.`}
        actionLabel={language === 'hi' ? 'सभी मॉड्यूल्स देखें' : 'View All Modules'}
        actionLink="/modules"
      />
    );
  }

  // Get current lesson data
  const primaryLesson = module.lessons?.[0] || {};
  const currentStageData = primaryLesson.stages?.[activeStageKey] || {};

  const currentStageIndex = stagesList.findIndex((s) => s.key === activeStageKey);
  const isCurrentStageCompleted = completedStages.has(activeStageKey) || isCompletedModule;

  const handleToggleStageCompletion = (stageKey = activeStageKey) => {
    const willBeCompleted = !completedStages.has(stageKey);
    updateStageProgress(module.id, stageKey, willBeCompleted);

    if (willBeCompleted) {
      addXP(25, `Completed ${stageKey.toUpperCase()} stage in ${module.title}`);
    }
  };

  const handleNextStage = () => {
    if (currentStageIndex < stagesList.length - 1) {
      setActiveStageKey(stagesList[currentStageIndex + 1].key);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      setActiveStageKey(stagesList[currentStageIndex - 1].key);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleCompleteAndNext = () => {
    if (!isCurrentStageCompleted) {
      handleToggleStageCompletion(activeStageKey);
    }
    handleNextStage();
  };

  const percentage = isCompletedModule ? 100 : storedProgress.percentage || 0;

  return (
    <div className="space-y-6">
      {/* 1. Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to={`/modules/year-${module.year}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            {language === 'hi' ? `वर्ष ${module.year} के मॉड्यूल्स` : `Back to Year ${module.year} Modules`}
          </span>
        </Link>

        <span className="text-xs font-mono font-bold text-slate-400">
          Module ID: {module.id}
        </span>
      </div>

      {/* 2. Module Header Overview Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                Module {module.number < 10 ? `0${module.number}` : module.number}
              </span>

              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
                Year {module.year} • {module.learningOutcomes?.[0]}
              </span>

              {module.simulations && module.simulations.length > 0 && (
                <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <Box className="w-3.5 h-3.5" /> 3D Virtual Lab Included
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'hi' ? (module.titleHi || module.title) : module.title}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {language === 'hi' ? (module.descriptionHi || module.description) : module.description}
            </p>
          </div>

          {/* Module Progress Circular/Pill Gauge */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 dark:border-slate-800 shrink-0">
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {percentage}%
              </span>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {completedStages.size} / 7 {language === 'hi' ? 'चरण पूर्ण' : 'Stages Done'}
              </p>
            </div>

            <div className="w-32 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-2">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. 7-STAGE INTERACTIVE STEPPER BAR */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 sm:p-3 shadow-sm overflow-x-auto">
        <div className="flex items-center min-w-[700px] justify-between gap-1.5">
          {stagesList.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = completedStages.has(stage.key) || isCompletedModule;
            const isActive = activeStageKey === stage.key;

            return (
              <button
                key={stage.key}
                onClick={() => setActiveStageKey(stage.key)}
                className={`flex-1 flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl text-left transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : isDone
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100/60'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {isDone && !isActive ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="overflow-hidden">
                  <div className="text-xs font-bold leading-tight flex items-center gap-1">
                    <span>{idx + 1}.</span>
                    <span>{language === 'hi' ? stage.labelHi : stage.label}</span>
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      isActive ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {stage.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. ACTIVE STAGE VIEWPORT CONTENT */}
      <div className="transition-all duration-150">
        {activeStageKey === 'watch' && (
          <StageWatch
            stageData={currentStageData}
            isCompleted={isCurrentStageCompleted}
            onToggleComplete={() => handleToggleStageCompletion('watch')}
          />
        )}

        {activeStageKey === 'read' && (
          <StageRead
            stageData={currentStageData}
            isCompleted={isCurrentStageCompleted}
            onToggleComplete={() => handleToggleStageCompletion('read')}
          />
        )}

        {activeStageKey === 'practice' && (
          <StagePractice
            stageData={currentStageData}
            isCompleted={isCurrentStageCompleted}
            onToggleComplete={() => handleToggleStageCompletion('practice')}
          />
        )}

        {activeStageKey === 'simulate' && (
          <StageSimulate
            stageData={currentStageData}
            moduleSimulations={module.simulations}
            isCompleted={isCurrentStageCompleted}
            onToggleComplete={() => handleToggleStageCompletion('simulate')}
          />
        )}

        {activeStageKey === 'quiz' && (
          <StageQuiz
            stageData={currentStageData}
            moduleQuestions={module.questions}
            isCompleted={isCurrentStageCompleted}
            onToggleComplete={() => handleToggleStageCompletion('quiz')}
          />
        )}

        {activeStageKey === 'apply' && (
          <StageApply
            stageData={currentStageData}
            isCompleted={isCurrentStageCompleted}
            onToggleComplete={() => handleToggleStageCompletion('apply')}
          />
        )}

        {activeStageKey === 'review' && (
          <StageReview
            stageData={currentStageData}
            moduleTitle={module.title}
            moduleLO={module.learningOutcomes?.[0]}
            isCompleted={isCurrentStageCompleted}
            allStagesCompleted={percentage >= 100}
            onToggleComplete={() => handleToggleStageCompletion('review')}
          />
        )}
      </div>

      {/* 5. BOTTOM NAVIGATION BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm flex items-center justify-between gap-3">
        {/* Previous Stage Button */}
        <button
          disabled={currentStageIndex === 0}
          onClick={handlePrevStage}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'पिछला चरण' : 'Previous Stage'}</span>
        </button>

        {/* Complete & Next Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleToggleStageCompletion(activeStageKey)}
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              isCurrentStageCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCurrentStageCompleted ? 'Stage Complete' : 'Toggle Complete'}</span>
          </button>

          {currentStageIndex < stagesList.length - 1 ? (
            <button
              onClick={handleCompleteAndNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
            >
              <span>{language === 'hi' ? 'पूर्ण करें और अगला' : 'Complete & Next Stage'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/modules"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              <Award className="w-4 h-4" />
              <span>{language === 'hi' ? 'मॉड्यूल सूची पर लौटें' : 'Finish & Return to Modules'}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
