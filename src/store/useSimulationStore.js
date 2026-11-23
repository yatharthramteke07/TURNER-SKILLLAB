import { create } from 'zustand';

export const useSimulationStore = create((set, get) => ({
  // Active Environment
  activeSimulation: null, // 'conventional-lathe' | 'cnc-lathe' | null
  selectedMachine: 'conventional-lathe',
  selectedOperation: 'plain-turning', // 'facing', 'plain-turning', 'step-turning', 'taper', etc.

  // Machine physical / cutting params
  spindleSpeed: 650, // RPM
  spindleRunning: false,
  spindleDirection: 'CW', // 'CW' | 'CCW'
  feedRate: 0.15, // mm/rev
  depthOfCut: 0.5, // mm

  // Workpiece specification
  workpiece: {
    material: 'Mild Steel (IS 2062)',
    initialDiameter: 50,
    currentDiameter: 50,
    length: 120,
    // Radial profile steps: array of { z: distance_from_chuck, r: radius }
    profile: [
      { z: 0, r: 25 },
      { z: 120, r: 25 }
    ]
  },

  // Tooling & Mounting
  selectedChuck: '3-jaw', // '3-jaw' | '4-jaw'
  selectedTool: 'roughing-rh', // 'roughing-rh' | 'facing' | 'parting' | 'threading'
  toolPosition: { x: 25, z: 100 }, // X is radius/diameter offset, Z is longitudinal position

  // Simulation status & execution
  status: 'idle', // 'idle' | 'running' | 'paused' | 'completed' | 'error'
  statusMessage: '',
  playbackSpeed: 1.0,
  stepMode: false,

  // Toolpath & G-code (for CNC)
  currentGCode: '',
  currentToolpath: [],
  activeBlockIndex: 0,

  // Graphics and display preferences
  simplifiedGraphics: false,
  cameraPreset: 'isometric', // 'isometric', 'front', 'top', 'tool-view'
  highlightedComponent: null, // Component name being hovered/identified

  // Actions
  setActiveSimulation: (simId) => set({ activeSimulation: simId }),
  setSelectedMachine: (machine) => set({ selectedMachine: machine }),
  setSelectedOperation: (operation) => set({ selectedOperation: operation }),

  setSpindleSpeed: (rpm) => set({ spindleSpeed: Math.max(50, Math.min(2500, rpm)) }),
  toggleSpindle: () => set((state) => ({ spindleRunning: !state.spindleRunning })),
  setSpindleRunning: (running) => set({ spindleRunning: running }),
  setSpindleDirection: (dir) => set({ spindleDirection: dir }),

  setFeedRate: (feed) => set({ feedRate: Math.max(0.02, Math.min(1.0, feed)) }),
  setDepthOfCut: (doc) => set({ depthOfCut: Math.max(0.1, Math.min(3.0, doc)) }),

  setWorkpiece: (params) => set((state) => ({ workpiece: { ...state.workpiece, ...params } })),
  setSelectedChuck: (chuck) => set({ selectedChuck: chuck }),
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setToolPosition: (pos) => set((state) => ({ toolPosition: { ...state.toolPosition, ...pos } })),

  setStatus: (status, message = '') => set({ status, statusMessage: message }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  setStepMode: (enabled) => set({ stepMode: enabled }),

  setCurrentGCode: (code) => set({ currentGCode: code }),
  setCurrentToolpath: (toolpath) => set({ currentToolpath: toolpath }),
  setActiveBlockIndex: (idx) => set({ activeBlockIndex: idx }),

  toggleSimplifiedGraphics: () => set((state) => ({ simplifiedGraphics: !state.simplifiedGraphics })),
  setCameraPreset: (preset) => set({ cameraPreset: preset }),
  setHighlightedComponent: (comp) => set({ highlightedComponent: comp }),

  resetSimulation: () => set((state) => ({
    status: 'idle',
    statusMessage: '',
    spindleRunning: false,
    toolPosition: { x: 25, z: 100 },
    workpiece: {
      ...state.workpiece,
      currentDiameter: state.workpiece.initialDiameter,
      profile: [
        { z: 0, r: state.workpiece.initialDiameter / 2 },
        { z: state.workpiece.length, r: state.workpiece.initialDiameter / 2 }
      ]
    },
    activeBlockIndex: 0,
  })),
}));
