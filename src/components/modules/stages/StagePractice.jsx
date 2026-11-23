import React, { useState } from 'react';
import { Layers, CheckCircle2, XCircle, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useStudentStore } from '../../../store/useStudentStore';

export default function StagePractice({ stageData, isCompleted, onToggleComplete }) {
  const language = useStudentStore((state) => state.language);
  const addXP = useStudentStore((state) => state.addXP);

  const items = stageData?.items || [
    {
      question: 'What is the primary function of the lathe apron assembly?',
      options: [
        'To house gears and clutches for automatic feed along the bed',
        'To hold the workpiece between dead centers',
        'To control the motor electrical switch',
        'To lubricate the cutting tool'
      ],
      answerIndex: 0,
      explanation: 'The apron is bolted to the front of the saddle and contains the gear trains, split nut, and feed levers.'
    }
  ];

  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  const handleSelectOption = (itemIndex, optIndex) => {
    setUserAnswers({ ...userAnswers, [itemIndex]: optIndex });
    setShowFeedback({ ...showFeedback, [itemIndex]: true });

    // Award XP if correct
    if (optIndex === items[itemIndex].answerIndex && !userAnswers[itemIndex]) {
      addXP(10, 'Solved practice drill question');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
              Guided Interactive Exercises
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {stageData?.title || 'Interactive Practice Drill'}
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> +10 XP per correct answer
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          Test your comprehension with immediate feedback before moving into the 3D Virtual Lab simulation.
        </p>

        {/* Questions list */}
        <div className="space-y-6">
          {items.map((item, qIdx) => {
            const selected = userAnswers[qIdx];
            const isAnswered = showFeedback[qIdx];
            const isCorrect = selected === item.answerIndex;

            return (
              <div
                key={qIdx}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {item.question}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pl-9">
                  {item.options.map((opt, optIdx) => {
                    const isSelected = selected === optIdx;
                    let btnStyle =
                      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400';

                    if (isAnswered) {
                      if (optIdx === item.answerIndex) {
                        btnStyle =
                          'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-400 text-emerald-800 dark:text-emerald-200 font-semibold';
                      } else if (isSelected) {
                        btnStyle =
                          'bg-rose-50 dark:bg-rose-950/70 border-rose-400 text-rose-800 dark:text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && optIdx === item.answerIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div
                    className={`mt-3 p-3.5 rounded-xl text-xs sm:text-sm pl-9 flex items-start gap-2 ${
                      isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200'
                        : 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">{isCorrect ? 'Correct! ' : 'Explanation: '}</span>
                      <span>{item.explanation}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
                ? (language === 'hi' ? 'अभ्यास पूर्ण' : 'Practice Completed')
                : (language === 'hi' ? 'अभ्यास पूर्ण चिह्नित करें' : 'Mark Practice as Completed')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
