import React, { useState } from 'react';
import {
  Layers,
  HelpCircle,
  Award,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Info,
  RotateCcw
} from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useStudentStore } from '../../store/useStudentStore';

export const LATHE_COMPONENTS = [
  {
    name: 'Bed',
    nameHi: 'खराद बेड (आधार)',
    material: 'High-grade Grey Cast Iron (Chilled)',
    function: 'Heavy foundational casting absorbing vibration, guiding saddle and tailstock on precision induction-hardened V-ways.',
    lo: 'LO-02'
  },
  {
    name: 'Headstock',
    nameHi: 'हेडस्टॉक',
    material: 'Cast Iron Housing with Alloy Steel Gears',
    function: 'Houses main spindle, speed change gear train, and feeds driving torque to the chuck.',
    lo: 'LO-02'
  },
  {
    name: 'Chuck',
    nameHi: 'चक (3-जॉ / 4-जॉ)',
    material: 'Forged Steel Body with Hardened Jaws',
    function: 'Holds the workpiece concentric to the spindle axis for rotational cutting operations.',
    lo: 'LO-02'
  },
  {
    name: 'Carriage',
    nameHi: 'कैरिज एवं एप्रन',
    material: 'Cast Iron Saddle & Apron',
    function: 'Traverses longitudinally along the bed ways manually or via feed rod / lead screw.',
    lo: 'LO-02'
  },
  {
    name: 'Cross slide',
    nameHi: 'क्रॉस स्लाइड',
    material: 'Cast Iron with Dovetail Ways',
    function: 'Moves perpendicular to the bed axis for facing cuts and setting depth of cut.',
    lo: 'LO-02'
  },
  {
    name: 'Compound rest',
    nameHi: 'कंपाउंड रेस्ट',
    material: 'Cast Iron with 360° Circular Swivel Base',
    function: 'Swivels to any acute angle for machining short steep external and internal tapers.',
    lo: 'LO-05'
  },
  {
    name: 'Tool post',
    nameHi: 'टूल पोस्ट',
    material: 'Alloy Steel Block',
    function: 'Clamps single-point turning tools, boring bars, and parting blades rigidly at center height.',
    lo: 'LO-03'
  },
  {
    name: 'Tailstock',
    nameHi: 'टेलस्टॉक',
    material: 'Cast Iron with Morse Taper Quill',
    function: 'Supports the free end of long workpieces with centers and mounts drill chucks or reamers.',
    lo: 'LO-02'
  },
  {
    name: 'Lead screw',
    nameHi: 'लीड स्क्रू',
    material: 'High-tensile Alloy Steel (Acme Thread)',
    function: 'Precision Acme-threaded screw used exclusively for transmitting accurate pitch drive during thread cutting.',
    lo: 'LO-07'
  }
];

export default function LatheComponentTree() {
  const language = useStudentStore((state) => state.language);
  const addXP = useStudentStore((state) => state.addXP);
  const highlightedComponent = useSimulationStore((state) => state.highlightedComponent);
  const setHighlightedComponent = useSimulationStore((state) => state.setHighlightedComponent);

  const [activeTab, setActiveTab] = useState('components'); // 'components' | 'quiz'
  const [selectedCompName, setSelectedCompName] = useState('Headstock');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const currentQuizTarget = LATHE_COMPONENTS[quizIndex];

  const handleComponentClick = (compName) => {
    setSelectedCompName(compName);
    setHighlightedComponent(compName);

    // If quiz is active
    if (activeTab === 'quiz' && !quizFinished) {
      if (compName === currentQuizTarget.name) {
        setFeedback({ correct: true, message: `Correct! That is the ${compName}.` });
        const nextScore = quizScore + 1;
        setQuizScore(nextScore);

        setTimeout(() => {
          setFeedback(null);
          if (quizIndex + 1 < LATHE_COMPONENTS.length) {
            setQuizIndex(quizIndex + 1);
          } else {
            setQuizFinished(true);
            addXP(50, 'Mastered 3D Lathe Component Identification');
          }
        }, 1200);
      } else {
        setFeedback({ correct: false, message: `That is the ${compName}. Try locating the ${currentQuizTarget.name}!` });
      }
    }
  };

  const selectedData = LATHE_COMPONENTS.find((c) => c.name === selectedCompName) || LATHE_COMPONENTS[0];

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200 overflow-hidden select-none">
      {/* Top Tab Switcher */}
      <div className="flex border-b border-slate-800 p-2 gap-1 bg-slate-950/60">
        <button
          onClick={() => setActiveTab('components')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'components'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          {language === 'hi' ? 'घटक अन्वेषण' : 'Parts Inspector'}
        </button>

        <button
          onClick={() => {
            setActiveTab('quiz');
            setQuizIndex(0);
            setQuizScore(0);
            setQuizFinished(false);
            setFeedback(null);
          }}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'quiz'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'पहचान क्विज' : 'Part ID Quiz'}</span>
        </button>
      </div>

      {/* QUIZ MODE VIEW */}
      {activeTab === 'quiz' ? (
        <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto">
          {!quizFinished ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>Part {quizIndex + 1} of {LATHE_COMPONENTS.length}</span>
                <span className="text-amber-400">Score: {quizScore}</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-600/40 text-center space-y-2">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  Target Component:
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  Find & Click the &quot;{currentQuizTarget.name}&quot;
                </h3>
                <p className="text-xs text-slate-400">
                  {currentQuizTarget.nameHi}
                </p>
              </div>

              {feedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold text-center animate-in fade-in ${
                    feedback.correct
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600'
                      : 'bg-rose-950/80 text-rose-300 border border-rose-600'
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              <p className="text-[11px] text-slate-500 text-center">
                💡 Tip: Click directly on the 3D lathe model or select from the list below to guess.
              </p>

              <div className="grid grid-cols-2 gap-1.5 pt-2">
                {LATHE_COMPONENTS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleComponentClick(c.name)}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium text-left truncate transition-colors border border-slate-700/60"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center space-y-4 my-auto">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Quiz Completed!</h3>
              <p className="text-xs text-slate-400">
                You correctly identified {quizScore} out of {LATHE_COMPONENTS.length} lathe parts.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                <Sparkles className="w-4 h-4" /> +50 XP Awarded
              </div>
              <button
                onClick={() => {
                  setQuizIndex(0);
                  setQuizScore(0);
                  setQuizFinished(false);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
              >
                Restart Identification Quiz
              </button>
            </div>
          )}
        </div>
      ) : (
        /* STUDY / INSPECTOR MODE VIEW */
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          {/* Component List */}
          <div className="p-3 space-y-1 overflow-y-auto max-h-[50%] border-b border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
              Select Component to Inspect
            </span>
            {LATHE_COMPONENTS.map((comp) => {
              const isSelected = selectedCompName === comp.name;
              return (
                <button
                  key={comp.name}
                  onClick={() => handleComponentClick(comp.name)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <span>{comp.name}</span>
                  <span
                    className={`text-[10px] font-mono ${
                      isSelected ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {comp.lo}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Component Technical Detail Card */}
          <div className="p-4 bg-slate-950/80 space-y-3 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>{selectedData.name}</span>
              </h4>
              <span className="text-[10px] text-blue-400 font-mono font-bold bg-blue-950/80 px-2 py-0.5 rounded">
                {selectedData.lo}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-medium">{selectedData.nameHi}</p>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Material & Spec:
              </span>
              <p className="text-slate-300 text-xs font-mono">{selectedData.material}</p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Engineering Function:
              </span>
              <p className="text-slate-400 text-xs leading-relaxed">{selectedData.function}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
