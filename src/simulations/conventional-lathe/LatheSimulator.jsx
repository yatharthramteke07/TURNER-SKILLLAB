import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Box,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Award,
  CheckCircle2,
  X,
  Gauge,
  Layers,
  Sliders,
  Eye
} from 'lucide-react';
import Viewport from '../shared/Viewport';
import SimulationToolbar from '../shared/SimulationToolbar';
import CameraControls from '../shared/CameraControls';
import LatheScene from './LatheScene';
import LatheComponentTree from './LatheComponentTree';
import LatheControls from './LatheControls';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useStudentStore } from '../../store/useStudentStore';

export default function LatheSimulator() {
  const language = useStudentStore((state) => state.language);
  const addXP = useStudentStore((state) => state.addXP);
  const recordLabAttempt = useStudentStore((state) => state.recordLabAttempt);

  const {
    spindleRunning,
    spindleSpeed,
    feedRate,
    depthOfCut,
    selectedOperation,
    status,
    setStatus,
    playbackSpeed
  } = useSimulationStore();

  // Machine tool positioning
  const [toolZ, setToolZ] = useState(0.55); // Longitudinal carriage position
  const [toolX, setToolX] = useState(0.24); // Cross slide position
  const [cutLength, setCutLength] = useState(0); // Cut progress along workpiece
  const [currentRadius, setCurrentRadius] = useState(0.22); // Current radius
  const [safetyWarning, setSafetyWarning] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [activeSidePanel, setActiveSidePanel] = useState('components'); // 'components' | 'controls' on mobile

  const animationRef = useRef();

  // Reset function
  const handleReset = () => {
    setStatus('idle');
    setToolZ(0.55);
    setToolX(0.24);
    setCutLength(0);
    setCurrentRadius(0.22);
    setSafetyWarning(null);
  };

  // Start simulation with safety checks
  const handleStart = () => {
    // Safety Rule 1: Spindle must be running
    if (!spindleRunning) {
      setSafetyWarning('Safety Hazard: Spindle must be rotating before advancing cutting tool into workpiece!');
      return;
    }

    // Safety Rule 2: Depth of cut check
    if (depthOfCut > 1.8) {
      setSafetyWarning('Excessive Depth of Cut: Depth > 1.8mm risks tool fracture and severe chatter.');
      return;
    }

    setSafetyWarning(null);
    setStatus('running');
  };

  const handlePause = () => setStatus('paused');
  const handleResume = () => {
    if (!spindleRunning) {
      setSafetyWarning('Safety Hazard: Turn spindle motor ON before resuming feed.');
      return;
    }
    setStatus('running');
  };

  // Stepping forward
  const handleStep = () => {
    if (!spindleRunning) {
      setSafetyWarning('Spindle is stopped. Cannot cut.');
      return;
    }
    setStatus('paused');
    setToolZ((prev) => Math.max(-0.4, prev - 0.05));
    setCutLength((prev) => Math.min(0.9, prev + 0.05));
    setCurrentRadius(0.22 - depthOfCut * 0.02);
  };

  // Simulation execution loop
  useEffect(() => {
    if (status !== 'running') {
      cancelAnimationFrame(animationRef.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!spindleRunning) {
        setStatus('paused');
        setSafetyWarning('Spindle stopped during cutting! Feed halted automatically.');
        return;
      }

      // Cut rate based on feedRate and playbackSpeed
      const step = feedRate * dt * 0.6 * playbackSpeed;

      if (selectedOperation === 'facing') {
        // Facing: tool moves inward along X (cross slide)
        setToolX((prev) => {
          const next = prev - step * 0.8;
          if (next <= 0.02) {
            setStatus('completed');
            handleOperationCompleted('Facing Pass');
            return 0.02;
          }
          return next;
        });
      } else {
        // Plain turning or Step turning: tool moves longitudinally toward chuck (negative Z)
        const targetCutLimit = selectedOperation === 'step-turning' ? 0.45 : 0.85;

        setToolZ((prev) => Math.max(0.55 - targetCutLimit, prev - step));
        setCutLength((prev) => {
          const next = prev + step;
          if (next >= targetCutLimit) {
            setStatus('completed');
            handleOperationCompleted(selectedOperation === 'step-turning' ? 'Step Turning' : 'Plain Turning');
            return targetCutLimit;
          }
          return next;
        });

        // Material diameter reduction
        setCurrentRadius(0.22 - (depthOfCut * 0.02));
        setToolX(0.22 - (depthOfCut * 0.02));
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationRef.current);
  }, [status, spindleRunning, feedRate, depthOfCut, playbackSpeed, selectedOperation]);

  const handleOperationCompleted = (opName) => {
    setSuccessModal(true);
    addXP(50, `Completed ${opName} simulation successfully`);
    recordLabAttempt({
      id: `lab-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      simulationId: 'conventional-lathe',
      simulationTitle: `Conventional Lathe: ${opName}`,
      completed: true,
      score: 100,
      xpEarned: 50
    });
  };

  const isCutting = status === 'running' && spindleRunning && (cutLength > 0 || toolX < 0.22);
  const currentWorkpieceDiameterMm = (currentRadius * 200).toFixed(1);

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl">
      {/* 1. TOP SIMULATION HEADER */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/virtual-labs"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Exit Simulator"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Box className="w-4 h-4 text-blue-400" />
              <span>Conventional Lathe 3D Simulator</span>
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Centre Lathe • Component ID, Workpiece Setup & Real-time Material Removal
            </p>
          </div>
        </div>

        {/* Readouts */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div
            className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 ${
              spindleRunning
                ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${spindleRunning ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
            <span>{spindleSpeed} RPM</span>
          </div>

          <div className="hidden md:flex px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-[11px]">
            <span>⌀ {currentWorkpieceDiameterMm} mm</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN 3D WORKSPACE LAYOUT */}
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden bg-slate-950">
        {/* Left: Component Tree & Quiz Panel */}
        <div className="hidden lg:block w-72 shrink-0 h-full z-10">
          <LatheComponentTree />
        </div>

        {/* Center: 3D Viewport Area */}
        <div className="flex-1 h-full relative">
          {/* Floating Camera Toolbar */}
          <div className="absolute top-4 left-4 z-20">
            <CameraControls
              onResetCamera={() => {}}
              onSetPreset={() => {}}
            />
          </div>

          {/* Safety Warning Banner Alert */}
          {safetyWarning && (
            <div className="absolute top-4 inset-x-16 sm:inset-x-32 z-30 animate-in slide-in-from-top-3">
              <div className="p-3.5 rounded-2xl bg-rose-950/95 border border-rose-500 text-rose-100 text-xs font-bold shadow-2xl flex items-center justify-between gap-3 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{safetyWarning}</span>
                </div>
                <button
                  onClick={() => setSafetyWarning(null)}
                  className="p-1 rounded-lg hover:bg-rose-900 text-rose-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Real-time Machining Status Badge */}
          {status === 'running' && (
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-blue-950/80 backdrop-blur-md border border-blue-500/60 text-blue-200 text-xs font-mono font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Cutting Active: {selectedOperation.toUpperCase()}</span>
            </div>
          )}

          {/* 3D Viewport */}
          <Viewport cameraPosition={[0, 1.8, 3.8]} fov={45}>
            <LatheScene
              toolZ={toolZ}
              toolX={toolX}
              cutLength={cutLength}
              currentRadius={currentRadius}
              isCutting={isCutting}
            />
          </Viewport>
        </div>

        {/* Right: Parameter Controls Panel */}
        <div className="hidden md:block w-80 shrink-0 h-full z-10">
          <LatheControls />
        </div>
      </div>

      {/* 3. BOTTOM SIMULATION TOOLBAR */}
      <div className="shrink-0 z-10">
        <SimulationToolbar
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onReset={handleReset}
          onStep={handleStep}
        />
      </div>

      {/* SUCCESS MODAL ON OPERATION COMPLETION */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                Machining Completed
              </span>
              <h3 className="text-xl font-extrabold text-white">
                Target Dimension Reached!
              </h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Your {selectedOperation} operation finished with correct surface finish and dimensional tolerance.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>Final Diameter:</span>
                <span className="font-bold text-emerald-400">⌀ {currentWorkpieceDiameterMm} mm</span>
              </div>
              <div className="flex justify-between">
                <span>Spindle RPM:</span>
                <span className="font-bold text-amber-400">{spindleSpeed} RPM</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
              <Sparkles className="w-4 h-4" /> +50 XP Awarded
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSuccessModal(false);
                  handleReset();
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Continue Next Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
