import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Filter,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { QUESTIONS_BANK } from '../data/questions';
import { useStudentStore } from '../store/useStudentStore';

export default function Assessments() {
  const language = useStudentStore((state) => state.language);
  const addXP = useStudentStore((state) => state.addXP);
  const recordAssessmentResult = useStudentStore((state) => state.recordAssessmentResult);

  // Filter state
  const [difficultyFilter, setDifficultyFilter] = useState('all'); // 'all' | 'easy' | 'medium' | 'hard'
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);

  // Active question index
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(20 * 60); // 20 minutes

  // Filtered questions
  const activeQuestions = QUESTIONS_BANK.filter((q) =>
    difficultyFilter === 'all' ? true : q.difficulty === difficultyFilter
  );

  // Timer countdown
  useEffect(() => {
    if (!examStarted || examSubmitted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examStarted, examSubmitted]);

  const handleStartExam = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setExamSubmitted(false);
    setExamStarted(true);
    setTimerSeconds(20 * 60);
  };

  const handleSelectOption = (qIdx, optIdx) => {
    if (examSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx });
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    let correctCount = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answerIndex) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / activeQuestions.length) * 100);

    if (scorePct >= 70) {
      addXP(100, `Passed DGT Turner Assessment with ${scorePct}%`);
      recordAssessmentResult({
        id: `eval-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        title: `Comprehensive Trade Assessment (${difficultyFilter.toUpperCase()})`,
        score: scorePct,
        totalQuestions: activeQuestions.length,
        correctAnswers: correctCount,
        timeSpentSeconds: 20 * 60 - timerSeconds,
      });
    }
  };

  // Evaluation calculations
  const totalQuestions = activeQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  let correctCount = 0;
  activeQuestions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.answerIndex) correctCount++;
  });
  const finalScore = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = finalScore >= 70;

  // LO Breakdown
  const loScores = {};
  activeQuestions.forEach((q, idx) => {
    const lo = q.loId || 'General';
    if (!loScores[lo]) loScores[lo] = { total: 0, correct: 0 };
    loScores[lo].total++;
    if (selectedAnswers[idx] === q.answerIndex) loScores[lo].correct++;
  });

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  // 1. INTRO / EXAM SETUP VIEW
  if (!examStarted) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'hi' ? 'टर्नर ट्रेड परीक्षा एवं मूल्यांकन' : 'Turner Trade Examination & Quizzes'}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Test your proficiency in workshop safety, lathe mechanisms, single-point tooling, metrology, and Fanuc CNC.
            </p>
          </div>

          <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
            DGT CTS 2.0 • NSQF Level 4
          </span>
        </div>

        {/* Exam Setup Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FileCheck2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Comprehensive Machinist Examination
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                20 Questions • 20 Minutes • Passing Score: 70%
              </p>
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-2 mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Filter by Difficulty Level:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: 'all', label: 'All Levels (21 Qs)' },
                { key: 'easy', label: 'Easy (Beginner)' },
                { key: 'medium', label: 'Medium (Standard)' },
                { key: 'hard', label: 'Hard (Expert)' },
              ].map((diff) => (
                <button
                  key={diff.key}
                  onClick={() => setDifficultyFilter(diff.key)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    difficultyFilter === diff.key
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-xs text-blue-900 dark:text-blue-200 space-y-1 mb-6">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Assessment Rules & XP Rewards:</span>
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              Score 70% or higher to pass, master official Learning Outcomes (LO), and claim +100 Bonus XP. Full trade explanations will be provided upon exam completion.
            </p>
          </div>

          <button
            onClick={handleStartExam}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <span>Start Examination</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 2. EXAM RESULT & ANSWER REVIEW VIEW
  if (examSubmitted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Assessment Results & Performance Analysis
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Review your answers, LO breakdown, and technical explanations.
            </p>
          </div>
          <button
            onClick={handleStartExam}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Exam</span>
          </button>
        </div>

        {/* Scorecard Banner */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 ${
            isPassed
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 border-emerald-500'
              : 'bg-gradient-to-r from-rose-700 via-rose-600 to-orange-700 border-rose-500'
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Award className="w-4 h-4" />
              <span>{isPassed ? 'Official DGT Standard: PASSED' : 'NEEDS REVISION'}</span>
            </div>
            <h2 className="text-3xl font-black">
              Your Score: {finalScore}%
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-white/90">
              {correctCount} correct out of {totalQuestions} questions ({totalQuestions - correctCount} incorrect)
            </p>
          </div>

          <div className="text-right">
            {isPassed ? (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white text-emerald-800 font-extrabold text-xs shadow-md">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>+100 XP Awarded</span>
              </div>
            ) : (
              <span className="text-xs text-white/80">Passing requirement: 70%</span>
            )}
          </div>
        </div>

        {/* Learning Outcome (LO) Mastery Breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            Curriculum LO Mastery Breakdown
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(loScores).map(([lo, data]) => {
              const pct = Math.round((data.correct / data.total) * 100);
              const loPassed = pct >= 70;

              return (
                <div
                  key={lo}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-800 dark:text-slate-200">{lo}</span>
                    <span className={loPassed ? 'text-emerald-500' : 'text-rose-500'}>
                      {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${loPassed ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Question Answer Review */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Detailed Answer Review & Trade Explanations
          </h3>

          {activeQuestions.map((q, idx) => {
            const userChoice = selectedAnswers[idx];
            const isCorrect = userChoice === q.answerIndex;

            return (
              <div
                key={q.id || idx}
                className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                  isCorrect
                    ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800/70'
                    : 'bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-800/70'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-bold text-slate-400">
                    Question {idx + 1} • {q.loId}
                  </span>
                  {isCorrect ? (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-3">
                  {q.question}
                </p>

                <div className="space-y-1.5 text-xs sm:text-sm pl-2 mb-3">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = userChoice === optIdx;
                    const isRightAnswer = optIdx === q.answerIndex;

                    let optStyle = 'text-slate-600 dark:text-slate-400';
                    if (isRightAnswer) {
                      optStyle = 'text-emerald-700 dark:text-emerald-300 font-bold';
                    } else if (isUserChoice && !isRightAnswer) {
                      optStyle = 'text-rose-700 dark:text-rose-300 font-semibold line-through';
                    }

                    return (
                      <div key={optIdx} className={`p-2 rounded-lg flex items-center gap-2 ${optStyle}`}>
                        <span>{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                        {isRightAnswer && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      </div>
                    );
                  })}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Technical Explanation:{' '}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {q.explanation}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. LIVE EXAMINATION QUESTIONS VIEW (ONE QUESTION AT A TIME)
  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0];
  const selectedOpt = selectedAnswers[currentQIndex];

  return (
    <div className="space-y-6">
      {/* Exam Header: Question Counter & Timer */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            DGT CTS 2.0 Examination
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Question {currentQIndex + 1} of {totalQuestions}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/70 border border-amber-300/80 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold">
            <Clock className="w-4 h-4" />
            <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
          </div>

          <button
            onClick={handleSubmitExam}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
          >
            Submit Exam
          </button>
        </div>
      </div>

      {/* Question Palette Grid */}
      <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5 shadow-sm">
        {activeQuestions.map((_, idx) => {
          const isAnswered = selectedAnswers[idx] !== undefined;
          const isCurrent = idx === currentQIndex;

          return (
            <button
              key={idx}
              onClick={() => setCurrentQIndex(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                isCurrent
                  ? 'ring-2 ring-blue-600 bg-blue-600 text-white'
                  : isAnswered
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Current Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            {currentQ.loId}
          </span>
          <span className="text-xs text-slate-400 capitalize">{currentQ.difficulty}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((option, optIdx) => {
            const isSelected = selectedOpt === optIdx;

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(currentQIndex, optIdx)}
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/70 border-blue-500 text-blue-800 dark:text-blue-200 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            disabled={currentQIndex === 0}
            onClick={() => setCurrentQIndex((prev) => prev - 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentQIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentQIndex((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitExam}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
            >
              <span>Submit & Finish</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
