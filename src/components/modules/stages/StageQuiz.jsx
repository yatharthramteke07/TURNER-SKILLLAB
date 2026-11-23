import React, { useState } from 'react';
import { FileCheck2, CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';
import { useStudentStore } from '../../../store/useStudentStore';

export default function StageQuiz({ stageData, moduleQuestions, isCompleted, onToggleComplete }) {
  const language = useStudentStore((state) => state.language);
  const addXP = useStudentStore((state) => state.addXP);
  const recordAssessmentResult = useStudentStore((state) => state.recordAssessmentResult);

  const questions = moduleQuestions && moduleQuestions.length > 0
    ? moduleQuestions
    : [
        {
          id: 'q-default-1',
          type: 'mcq',
          question: 'What is the correct direction of lathe spindle rotation when viewing from the tailstock end for standard turning?',
          options: ['Counter-clockwise (CCW)', 'Clockwise (CW)', 'Oscillating', 'Stationary'],
          answerIndex: 0,
          explanation: 'Standard right-hand turning tools cut with the workpiece rotating toward the operator (Counter-clockwise looking from tailstock to headstock).'
        },
        {
          id: 'q-default-2',
          type: 'mcq',
          question: 'What happens when cutting speed (RPM) is set too high for High Speed Steel (HSS) tools without coolant?',
          options: [
            'Tool nose burns and rapidly loses hardness due to thermal degradation',
            'Workpiece becomes cold',
            'Spindle rotates backward',
            'The lathe bed tilts'
          ],
          answerIndex: 0,
          explanation: 'Excessive cutting speed produces excessive friction heat, drawing the temper of HSS tools and causing catastrophic nose burn.'
        }
      ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answerIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);

    if (calculatedScore >= 70) {
      addXP(50, 'Passed Module Assessment Quiz');
      recordAssessmentResult({
        id: `assessment-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        title: stageData?.title || 'Module Quiz',
        score: calculatedScore,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
      });
      if (!isCompleted) {
        onToggleComplete();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
              DGT Assessment Engine
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {stageData?.title || 'Module Mastery Quiz'}
            </h2>
          </div>

          {submitted && (
            <div
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm ${
                score >= 70
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
              }`}
            >
              <span>Score: {score}%</span>
              <span>{score >= 70 ? '🎉 Passed' : '⚠️ Try Again'}</span>
            </div>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          Answer all questions to test your knowledge against CTS 2.0 examination standards. Passing threshold: 70%.
        </p>

        {/* Questions List */}
        <div className="space-y-6">
          {questions.map((q, qIdx) => {
            const chosen = selectedAnswers[qIdx];
            const isCorrect = chosen === q.answerIndex;

            return (
              <div
                key={q.id || qIdx}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {q.question}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 pl-9">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let style =
                      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400';

                    if (submitted) {
                      if (optIdx === q.answerIndex) {
                        style =
                          'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-400 text-emerald-800 dark:text-emerald-200 font-semibold';
                      } else if (isSelected) {
                        style =
                          'bg-rose-50 dark:bg-rose-950/70 border-rose-400 text-rose-800 dark:text-rose-200';
                      }
                    } else if (isSelected) {
                      style =
                        'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(qIdx, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {submitted && optIdx === q.answerIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs sm:text-sm pl-9 flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Explanation: </span>
                      <span>{q.explanation}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Reset button */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {submitted ? (
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedAnswers({});
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Retake Quiz
            </button>
          ) : (
            <span className="text-xs text-slate-400">
              {Object.keys(selectedAnswers).length} of {questions.length} answered
            </span>
          )}

          <div className="flex items-center gap-3">
            {!submitted && (
              <button
                disabled={Object.keys(selectedAnswers).length < questions.length}
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-sm"
              >
                Submit Answers
              </button>
            )}

            <button
              onClick={onToggleComplete}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Quiz Completed' : 'Mark Quiz Complete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
