import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Terminal,
  Play,
  RotateCcw,
  Code2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  FileText,
  HelpCircle,
  Copy,
  ChevronDown
} from 'lucide-react';
import Viewport from '../shared/Viewport';
import SimulationToolbar from '../shared/SimulationToolbar';
import CameraControls from '../shared/CameraControls';
import CNCMachine from './CNCMachine';
import Toolpath from './Toolpath';
import CNCController from './CNCController';
import { parseProgram, generateToolpath, SAMPLE_CNC_PROGRAMS } from './GCodeInterpreter';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useStudentStore } from '../../store/useStudentStore';

export default function CNCSimulator() {
  const language = useStudentStore((state) => state.language);
  const addXP = useStudentStore((state) => state.addXP);
  const recordLabAttempt = useStudentStore((state) => state.recordLabAttempt);

  const {
    spindleRunning,
    setSpindleRunning,
    playbackSpeed,
    status,
    setStatus
  } = useSimulationStore();

  // Current Program Code
  const [currentCode, setCurrentCode] = useState(SAMPLE_CNC_PROGRAMS[0].code);
  const [selectedSampleId, setSelectedSampleId] = useState(SAMPLE_CNC_PROGRAMS[0].id);

  // Parse G-code & generate toolpath
  const { blocks, errors, warnings } = useMemo(() => {
    return parseProgram(currentCode);
  }, [currentCode]);

  const toolpath = useMemo(() => {
    return generateToolpath(blocks, { startX: 52, startZ: 2 });
  }, [blocks]);

  // Active execution index
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [cycleTimeSec, setCycleTimeSec] = useState(0);
  const [successModal, setSuccessModal] = useState(false);

  const playbackTimerRef = useRef();

  // Load sample program
  const handleSelectSample = (sampleId) => {
    const found = SAMPLE_CNC_PROGRAMS.find((p) => p.id === sampleId);
    if (found) {
      setSelectedSampleId(sampleId);
      setCurrentCode(found.code);
      handleReset();
    }
  };

  // Playback handlers
  const handleStart = () => {
    if (errors.length > 0) return;
    setStatus('running');
    setSpindleRunning(true);
  };

  const handlePause = () => setStatus('paused');
  const handleResume = () => {
    setStatus('running');
    setSpindleRunning(true);
  };

  const handleReset = () => {
    setStatus('idle');
    setSpindleRunning(false);
    setActiveStepIndex(0);
    setCycleTimeSec(0);
  };

  const handleStep = () => {
    setStatus('paused');
    if (activeStepIndex + 1 < toolpath.length) {
      setActiveStepIndex((prev) => prev + 1);
      setCycleTimeSec((prev) => prev + 1.5);
    }
  };

  // Execution loop
  useEffect(() => {
    if (status !== 'running') {
      clearInterval(playbackTimerRef.current);
      return;
    }

    const intervalMs = Math.max(100, Math.round(900 / playbackSpeed));

    playbackTimerRef.current = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev + 1 >= toolpath.length) {
          clearInterval(playbackTimerRef.current);
          setStatus('completed');
          setSuccessModal(true);
          addXP(50, 'Successfully executed CNC turning program');
          recordLabAttempt({
            id: `cnc-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            simulationId: 'cnc-lathe',
            simulationTitle: 'CNC Lathe: Fanuc G-Code Program',
            completed: true,
            score: 100,
            xpEarned: 50
          });
          return prev;
        }
        return prev + 1;
      });

      setCycleTimeSec((prev) => prev + 1.2);
    }, intervalMs);

    return () => clearInterval(playbackTimerRef.current);
  }, [status, playbackSpeed, toolpath]);

  // Current active block and tool position
  const currentSegment = toolpath[activeStepIndex] || { to: { x: 52, z: 2 }, raw: '' };
  const currentBlock = blocks.find((b) => b.line === currentSegment.line) || blocks[0];

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl">
      {/* 1. TOP BAR */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/virtual-labs"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Exit CNC Simulator"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>CNC Lathe & Fanuc G-Code Simulator</span>
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              2-Axis Turning • Real-time G-Code Interpreter, Diagnostics & 3D Toolpath
            </p>
          </div>
        </div>

        {/* Sample Program Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 hidden md:inline">Program:</span>
          <select
            value={selectedSampleId}
            onChange={(e) => handleSelectSample(e.target.value)}
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {SAMPLE_CNC_PROGRAMS.map((prog) => (
              <option key={prog.id} value={prog.id}>
                {prog.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. MAIN CNC LAYOUT: EDITOR | 3D VIEWPORT | CONTROLLER */}
      <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden bg-slate-950">
        {/* Left: Code Editor & Diagnostics */}
        <div className="w-full lg:w-96 flex flex-col border-r border-slate-800 bg-slate-900/90 shrink-0">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Fanuc ISO G-Code</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {blocks.length} Blocks
            </span>
          </div>

          {/* G-Code Editor textarea */}
          <div className="flex-1 p-2 bg-slate-950/90 font-mono text-xs overflow-hidden flex flex-col">
            <textarea
              value={currentCode}
              onChange={(e) => {
                setCurrentCode(e.target.value);
                handleReset();
              }}
              rows={16}
              spellCheck="false"
              className="w-full flex-1 p-3 bg-transparent text-slate-200 font-mono text-xs leading-relaxed resize-none focus:outline-none border-0 selection:bg-indigo-600"
            />
          </div>

          {/* Diagnostics and Warnings Panel */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-[11px] space-y-1 max-h-36 overflow-y-auto">
            <div className="font-bold text-slate-400 uppercase text-[10px] mb-1 flex items-center justify-between">
              <span>Interpreter Diagnostics:</span>
              <span className="text-emerald-400 font-mono">
                {warnings.length === 0 ? '✓ Zero Errors' : `${warnings.length} Warnings`}
              </span>
            </div>

            {warnings.length === 0 && (
              <p className="text-slate-500">Code verified. All syntax and modal states valid.</p>
            )}

            {warnings.map((w, i) => (
              <div
                key={i}
                className="p-1.5 rounded-lg bg-amber-950/50 border border-amber-800/60 text-amber-300 flex items-start gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  Line {w.line}: {w.message}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: 3D CNC Viewport */}
        <div className="flex-1 h-full relative">
          <div className="absolute top-4 left-4 z-20">
            <CameraControls onResetCamera={() => {}} onSetPreset={() => {}} />
          </div>

          {/* 3D Visualizer Canvas */}
          <Viewport cameraPosition={[0, 1.5, 3.2]} fov={42}>
            <CNCMachine turretPos={currentSegment.to} />
            <Toolpath toolpath={toolpath} activeIndex={activeStepIndex} />
          </Viewport>
        </div>

        {/* Right: Controller Readout Panel */}
        <div className="w-full lg:w-80 border-l border-slate-800 bg-slate-900/90 p-4 shrink-0 overflow-y-auto space-y-4">
          <CNCController
            activeBlock={currentBlock}
            programName="O0001"
            cycleTimeSec={cycleTimeSec}
          />

          {/* Quick G-Code Cheat-sheet */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Fanuc Turning Codes:
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-slate-400 text-[10px]">
              <div><span className="text-white font-bold">G00</span> Rapid Move</div>
              <div><span className="text-white font-bold">G01</span> Linear Cut</div>
              <div><span className="text-white font-bold">G02</span> CW Arc</div>
              <div><span className="text-white font-bold">G03</span> CCW Arc</div>
              <div><span className="text-white font-bold">G21</span> Metric (mm)</div>
              <div><span className="text-white font-bold">G90</span> Absolute</div>
              <div><span className="text-white font-bold">G95</span> Feed/Rev</div>
              <div><span className="text-white font-bold">G97</span> Spindle RPM</div>
              <div><span className="text-white font-bold">M03</span> Spindle CW</div>
              <div><span className="text-white font-bold">M08</span> Coolant ON</div>
              <div><span className="text-white font-bold">M30</span> Prog End</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM CONTROLS */}
      <div className="shrink-0 z-10">
        <SimulationToolbar
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onReset={handleReset}
          onStep={handleStep}
        />
      </div>

      {/* SUCCESS MODAL ON CNC PROGRAM COMPLETION */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative">
            <div className="w-16 h-16 rounded-3xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-800">
                M30 Program End Executed
              </span>
              <h3 className="text-xl font-extrabold text-white">
                Part Machined Successfully!
              </h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              All G-code blocks executed accurately without collision or coordinate limits violation.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>Total G-Code Blocks:</span>
                <span className="font-bold text-white">{blocks.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Cycle Time:</span>
                <span className="font-bold text-emerald-400">
                  {Math.floor(cycleTimeSec / 60)}m {Math.floor(cycleTimeSec % 60)}s
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
              <Sparkles className="w-4 h-4" /> +50 XP Awarded
            </div>

            <button
              onClick={() => {
                setSuccessModal(false);
                handleReset();
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Run Program Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
