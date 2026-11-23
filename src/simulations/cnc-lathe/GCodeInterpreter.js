/**
 * GCodeInterpreter.js
 * Pure JavaScript Fanuc-style CNC Turning Interpreter.
 * Strictly no React or Three.js imports.
 *
 * Coordinate Convention for Turning:
 * - X-axis: Workpiece diameter in millimeters (G21 metric). X0 is the spindle centerline.
 * - Z-axis: Spindle longitudinal axis in millimeters.
 *   Z0 is typically the finished front face of the workpiece.
 *   Z negative (Z-) moves toward the chuck/headstock (cutting direction).
 *   Z positive (Z+) retracts away from the chuck into clearance space.
 */

export function parseProgram(text) {
  const lines = text.split(/\r?\n/);
  const blocks = [];
  const errors = [];
  const warnings = [];

  let spindleStarted = false;
  let coolantOn = false;
  let currentTool = '01';
  let isAbsolute = true; // G90 default
  let isMetric = true; // G21 default
  let feedPerRev = true; // G95 default

  lines.forEach((rawLine, idx) => {
    const lineNum = idx + 1;
    // Strip comments enclosed in parentheses or after semicolon
    let clean = rawLine.replace(/\(.*?\)/g, '').split(';')[0].trim().toUpperCase();
    if (!clean || clean === '%') return;

    const block = {
      line: lineNum,
      raw: rawLine.trim(),
      gCodes: [],
      mCodes: [],
      params: {},
    };

    // Extract word-address tokens like G01, X50.0, Z-20.5, F0.15, M03, S1200
    const tokens = clean.match(/[A-Z][-+]?[0-9]*\.?[0-9]+/g);
    if (!tokens) return;

    tokens.forEach((token) => {
      const letter = token[0];
      const val = parseFloat(token.slice(1));

      if (letter === 'G') {
        const gInt = Math.floor(val);
        block.gCodes.push(gInt);

        // Check unsupported canned cycles
        if ([70, 71, 72, 73, 74, 75, 76].includes(gInt)) {
          warnings.push({
            line: lineNum,
            message: `G${gInt} canned cycle is recognized but not supported yet in standard simulation.`,
          });
        }
      } else if (letter === 'M') {
        const mInt = Math.floor(val);
        block.mCodes.push(mInt);
      } else {
        block.params[letter] = val;
      }
    });

    // Check modal states
    if (block.mCodes.includes(3) || block.mCodes.includes(4)) {
      spindleStarted = true;
    }
    if (block.mCodes.includes(5)) {
      spindleStarted = false;
    }
    if (block.mCodes.includes(8)) {
      coolantOn = true;
    }
    if (block.mCodes.includes(9)) {
      coolantOn = false;
    }
    if (block.gCodes.includes(90)) isAbsolute = true;
    if (block.gCodes.includes(91)) isAbsolute = false;
    if (block.gCodes.includes(20)) isMetric = false;
    if (block.gCodes.includes(21)) isMetric = true;
    if (block.gCodes.includes(94)) feedPerRev = false;
    if (block.gCodes.includes(95)) feedPerRev = true;

    // Safety semantic verification:
    // If cutting motion (G01, G02, G03) occurs without spindle start
    const isCuttingMotion = block.gCodes.some((g) => [1, 2, 3].includes(g));
    if (isCuttingMotion && !spindleStarted) {
      warnings.push({
        line: lineNum,
        message: 'Cutting motion (G01/G02/G03) programmed without starting the spindle (M03/M04)!',
      });
    }

    blocks.push(block);
  });

  return { blocks, errors, warnings };
}

export function generateToolpath(blocks, config = {}) {
  const toolpath = [];
  let currentPos = { x: config.startX || 60, z: config.startZ || 10 }; // diameter X, length Z
  let isAbsolute = true;
  let activeMotion = 0; // 0: G00, 1: G01, 2: G02, 3: G03

  blocks.forEach((block) => {
    // Update absolute / incremental mode
    if (block.gCodes.includes(90)) isAbsolute = true;
    if (block.gCodes.includes(91)) isAbsolute = false;

    // Determine motion command
    const motionCode = block.gCodes.find((g) => [0, 1, 2, 3].includes(g));
    if (motionCode !== undefined) {
      activeMotion = motionCode;
    }

    // Determine target coordinate
    let targetX = currentPos.x;
    let targetZ = currentPos.z;

    if (block.params.X !== undefined) {
      targetX = isAbsolute ? block.params.X : currentPos.x + block.params.X;
    }
    if (block.params.U !== undefined) {
      targetX = currentPos.x + block.params.U; // U is incremental X
    }

    if (block.params.Z !== undefined) {
      targetZ = isAbsolute ? block.params.Z : currentPos.z + block.params.Z;
    }
    if (block.params.W !== undefined) {
      targetZ = currentPos.z + block.params.W; // W is incremental Z
    }

    // If movement exists in this block
    if (targetX !== currentPos.x || targetZ !== currentPos.z) {
      let segmentType = 'rapid';
      if (activeMotion === 1) segmentType = 'feed';
      else if (activeMotion === 2) segmentType = 'arc_cw';
      else if (activeMotion === 3) segmentType = 'arc_ccw';

      const segment = {
        type: segmentType,
        from: { ...currentPos },
        to: { x: targetX, z: targetZ },
        line: block.line,
        raw: block.raw,
        radius: block.params.R || 0,
        feed: block.params.F || config.defaultFeed || 0.15,
      };

      toolpath.push(segment);
      currentPos = { x: targetX, z: targetZ };
    }
  });

  return toolpath;
}

export const SAMPLE_CNC_PROGRAMS = [
  {
    id: 'sample-facing',
    name: 'Sample 1: Facing & Rough Turning',
    description: 'Square end face and turn outer diameter from 50mm to 44mm.',
    code: `% O0001 (FACING AND ROUGH TURNING)
G21 G90 G95 ;
G28 U0 W0 ; (HOME RETURN)
T0101 M06 ; (SELECT ROUGHING TOOL)
G97 S1200 M03 ; (SPINDLE ON 1200 RPM)
M08 ; (COOLANT ON)
G00 X52.0 Z2.0 ; (RAPID TO CLEARANCE)
G00 Z0.0 ; (RAPID TO FACE)
G01 X-1.0 F0.12 ; (FACE TO CENTER)
G00 X52.0 Z2.0 ; (RETRACT)
G00 X46.0 ;
G01 Z-35.0 F0.18 ; (TURN PASS 1)
G01 X48.0 Z-33.0 ; (CHAMFER RETRACT)
G00 Z2.0 ;
G00 X44.0 ;
G01 Z-35.0 F0.15 ; (TURN FINISH PASS)
G00 X60.0 Z10.0 ;
M09 ; (COOLANT OFF)
M05 ; (SPINDLE STOP)
G28 U0 W0 ;
M30 ; (END PROGRAM)
%`
  },
  {
    id: 'sample-step',
    name: 'Sample 2: Multi-Stepped Shaft',
    description: 'Turn shaft with steps at ⌀30mm and ⌀42mm with shoulder reliefs.',
    code: `% O0002 (MULTI STEP TURNING)
G21 G90 G95 ;
G28 U0 W0 ;
T0101 M06 ;
G97 S1400 M03 ;
M08 ;
G00 X52.0 Z2.0 ;
G00 Z0.0 ;
G01 X-1.0 F0.12 ; (FACE WORKPIECE)
G00 X45.0 Z2.0 ;
G01 Z-40.0 F0.18 ; (TURN STEP 1)
G00 X48.0 Z-38.0 ;
G00 Z2.0 ;
G00 X32.0 ;
G01 Z-20.0 F0.15 ; (TURN STEP 2)
G00 X34.0 Z-18.0 ;
G00 Z2.0 ;
G00 X30.0 ; (FINISH PASS STEP 2)
G01 Z-20.0 F0.10 ;
G01 X42.0 ; (SQUARE SHOULDER)
G01 Z-40.0 F0.12 ; (FINISH PASS STEP 1)
G00 X60.0 Z15.0 ;
M09 ;
M05 ;
G28 U0 W0 ;
M30 ;
%`
  },
  {
    id: 'sample-arc',
    name: 'Sample 3: Taper & Circular Arc (G02/G03)',
    description: 'Conical taper followed by a smooth R5.0mm circular arc corner.',
    code: `% O0003 (TAPER AND CIRCULAR ARC)
G21 G90 G95 ;
G28 U0 W0 ;
T0202 M06 ; (FINISHING TOOL)
G97 S1600 M03 ;
M08 ;
G00 X52.0 Z2.0 ;
G00 X20.0 Z1.0 ;
G01 Z0.0 F0.12 ;
G01 X26.0 Z-15.0 ; (CONICAL TAPER)
G01 Z-25.0 ;
G02 X36.0 Z-30.0 R5.0 ; (CW CIRCULAR ARC R5)
G01 Z-45.0 ;
G01 X50.0 ;
G00 X60.0 Z15.0 ;
M09 ;
M05 ;
G28 U0 W0 ;
M30 ;
%`
  }
];
