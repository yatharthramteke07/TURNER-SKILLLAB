/**
 * Interpreter Unit Tests
 * Testing Fanuc CNC turning G-code interpreter:
 * 1. G00/G01 parsing
 * 2. Absolute (G90) vs Incremental (G91 / U, W)
 * 3. Arc handling (G02/G03 with R parameter)
 * 4. Error and warning detection
 */

import { parseProgram, generateToolpath } from '../GCodeInterpreter.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- RUNNING G-CODE INTERPRETER UNIT TESTS ---');

// Test 1: G00 & G01 linear motion parsing
console.log('\n[Test 1: G00 / G01 Linear Motions]');
const t1Code = `
G21 G90 G95 ;
M03 S1000 ;
G00 X50.0 Z2.0 ;
G01 Z-20.0 F0.15 ;
`;
const t1Parsed = parseProgram(t1Code);
assert(t1Parsed.blocks.length === 4, 'Correctly parsed 4 functional blocks');
const t1Toolpath = generateToolpath(t1Parsed.blocks, { startX: 60, startZ: 10 });
assert(t1Toolpath.length === 2, 'Generated 2 movement segments');
assert(t1Toolpath[0].type === 'rapid' && t1Toolpath[0].to.x === 50 && t1Toolpath[0].to.z === 2, 'G00 rapid positioning to X50 Z2 verified');
assert(t1Toolpath[1].type === 'feed' && t1Toolpath[1].to.z === -20, 'G01 cutting feed to Z-20 verified');

// Test 2: Absolute (G90) vs Incremental (G91 / U & W words)
console.log('\n[Test 2: Absolute vs Incremental (G90 vs G91 / U & W)]');
const t2Code = `
M03 S800 ;
G90 G00 X40.0 Z0.0 ;
G91 G01 Z-10.0 F0.2 ; (G91 relative move)
G90 G01 X30.0 ;       (back to G90 absolute)
G01 U-4.0 W-5.0 ;     (U and W incremental words)
`;
const t2Parsed = parseProgram(t2Code);
const t2Toolpath = generateToolpath(t2Parsed.blocks, { startX: 50, startZ: 5 });
assert(t2Toolpath[1].to.z === -10, 'G91 relative motion correctly computed (0 + -10 = -10)');
assert(t2Toolpath[2].to.x === 30 && t2Toolpath[2].to.z === -10, 'G90 absolute motion correctly returned X to 30');
assert(t2Toolpath[3].to.x === 26 && t2Toolpath[3].to.z === -15, 'U & W incremental words correctly applied (-4 to X, -5 to Z)');

// Test 3: Arc Handling (G02 CW and G03 CCW)
console.log('\n[Test 3: Arc Handling (G02 / G03 with R parameter)]');
const t3Code = `
M03 S1200 ;
G00 X20.0 Z0.0 ;
G02 X30.0 Z-5.0 R5.0 F0.12 ; (Clockwise arc R5)
G03 X40.0 Z-10.0 R5.0 ;      (Counter-clockwise arc R5)
`;
const t3Parsed = parseProgram(t3Code);
const t3Toolpath = generateToolpath(t3Parsed.blocks, { startX: 30, startZ: 5 });
assert(t3Toolpath[1].type === 'arc_cw' && t3Toolpath[1].radius === 5, 'G02 CW circular arc with radius R5 verified');
assert(t3Toolpath[2].type === 'arc_ccw' && t3Toolpath[2].radius === 5, 'G03 CCW circular arc with radius R5 verified');

// Test 4: Safety & Error Detection
console.log('\n[Test 4: Error & Safety Warning Detection]');
const t4Code = `
G21 G90 ;
G01 X20.0 Z-10.0 F0.15 ; (Hazard: cutting without spindle M03/M04)
G71 U2.0 R1.0 ;          (Unsupported canned cycle warning)
`;
const t4Parsed = parseProgram(t4Code);
assert(t4Parsed.warnings.length >= 2, 'Detected warnings for cutting without spindle and canned cycle');
assert(t4Parsed.warnings.some(w => w.message.includes('without starting the spindle')), 'Spindle safety violation caught with line number');
assert(t4Parsed.warnings.some(w => w.message.includes('G71 canned cycle')), 'G71 unsupported canned cycle warning reported');

console.log(`\n========================================`);
console.log(`RESULTS: ${passed} passed, ${failed} failed.`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
