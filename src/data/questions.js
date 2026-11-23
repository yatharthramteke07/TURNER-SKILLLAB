export const QUESTIONS_BANK = [
  {
    id: 'q01',
    type: 'mcq',
    difficulty: 'easy',
    loId: 'LO-01',
    question: 'What is the least count of a metric vernier caliper having 49 main scale divisions matching 50 vernier scale divisions?',
    options: ['0.1 mm', '0.05 mm', '0.02 mm', '0.01 mm'],
    answerIndex: 2,
    explanation: 'Least count = 1 MSD - 1 VSD = 1 mm - (49/50) mm = 0.02 mm.'
  },
  {
    id: 'q02',
    type: 'mcq',
    difficulty: 'easy',
    loId: 'LO-01',
    question: 'What safety rule must always be observed before powering ON the lathe spindle?',
    options: [
      'Ensure the chuck key is removed from the chuck socket',
      'Wear cotton gloves while gripping rotating parts',
      'Engage the half-nut lever',
      'Turn off all workshop lights'
    ],
    answerIndex: 0,
    explanation: 'Leaving a chuck key in the chuck socket creates a deadly high-speed projectile when the spindle rotates.'
  },
  {
    id: 'q03',
    type: 'mcq',
    difficulty: 'easy',
    loId: 'LO-02',
    question: 'Why is grey cast iron universally chosen for casting conventional lathe beds?',
    options: [
      'High tensile elasticity',
      'High compressive strength and superior vibration damping capacity',
      'Lightweight and easily bendable',
      'Low melting temperature'
    ],
    answerIndex: 1,
    explanation: 'Grey cast iron has free graphite flakes that absorb machining chatter and provide high compressive rigidity.'
  },
  {
    id: 'q04',
    type: 'mcq',
    difficulty: 'easy',
    loId: 'LO-02',
    question: 'What standard internal taper is ground into the tailstock quill and lathe spindle bore?',
    options: ['Brown & Sharpe Taper', 'Morse Taper (MT)', 'Jarno Taper', 'Quick Release Taper'],
    answerIndex: 1,
    explanation: 'Lathe spindles and tailstock barrels use self-holding Morse Taper (MT2, MT3, MT4, MT5).'
  },
  {
    id: 'q05',
    type: 'mcq',
    difficulty: 'medium',
    loId: 'LO-03',
    question: 'What is the primary function of the back rake angle on a single-point turning tool?',
    options: [
      'To prevent tool flank rubbing against the job',
      'To guide chip flow over the tool face and reduce cutting force',
      'To support the tool shank in the tool post',
      'To increase the tool nose radius'
    ],
    answerIndex: 1,
    explanation: 'Back rake angle guides the chip away from the cutting edge and reduces the shear force required to slice the metal.'
  },
  {
    id: 'q06',
    type: 'calculation',
    difficulty: 'medium',
    loId: 'LO-11',
    question: 'Calculate the spindle RPM required to turn a 50 mm diameter mild steel shaft at a recommended cutting speed of 30 m/min. (Use N = (1000 * V) / (pi * D))',
    options: ['120 RPM', '191 RPM', '350 RPM', '600 RPM'],
    answerIndex: 1,
    explanation: 'N = (1000 * 30) / (3.1416 * 50) = 30000 / 157.08 = 190.98 ≈ 191 RPM.'
  },
  {
    id: 'q07',
    type: 'mcq',
    difficulty: 'medium',
    loId: 'LO-05',
    question: 'Which taper turning method on a conventional lathe is most suitable for turning steep, short tapers (like chamfers or valve seats)?',
    options: [
      'Tailstock set-over method',
      'Taper turning attachment method',
      'Compound rest swivelling method',
      'Form tool method'
    ],
    answerIndex: 2,
    explanation: 'The compound rest can be swivelled up to 360 degrees to turn steep short tapers manually.'
  },
  {
    id: 'q08',
    type: 'mcq',
    difficulty: 'medium',
    loId: 'LO-06',
    question: 'Why must tool overhang be kept strictly to a minimum when boring internal diameters with a boring bar?',
    options: [
      'To prevent excessive bar deflection and acoustic chatter',
      'To save cutting fluid',
      'To make the lathe run faster',
      'To reduce workpiece diameter'
    ],
    answerIndex: 0,
    explanation: 'Deflection of a cantilevered boring bar increases with the cube of overhang length (L^3), causing chatter and bell-mouthed bores.'
  },
  {
    id: 'q09',
    type: 'mcq',
    difficulty: 'medium',
    loId: 'LO-07',
    question: 'Which mechanism is engaged to transmit positive drive from the lead screw to the carriage during screw thread cutting?',
    options: ['Rack and pinion', 'Half-nut (split nut) mechanism', 'Cross slide handwheel', 'Feed clutch'],
    answerIndex: 1,
    explanation: 'Closing the split half-nut tightly clamps the carriage onto the Acme threads of the revolving lead screw.'
  },
  {
    id: 'q10',
    type: 'mcq',
    difficulty: 'medium',
    loId: 'LO-08',
    question: 'Which lathe accessory is mounted on the lathe carriage saddle to support slender shafts directly behind the cutting tool?',
    options: ['Fixed steady rest', 'Follower steady rest', 'Face plate', 'Angle plate'],
    answerIndex: 1,
    explanation: 'A follower steady rest is bolted directly to the saddle and travels along with the tool to prevent the slender shaft from flexing away.'
  },
  {
    id: 'q11',
    type: 'mcq',
    difficulty: 'hard',
    loId: 'LO-12',
    question: 'According to ISO 286, which standard tolerance grade is generally recommended for precision ground bearing journals?',
    options: ['IT14', 'IT11', 'IT6 or IT7', 'IT01'],
    answerIndex: 2,
    explanation: 'IT6 and IT7 represent high-precision machining tolerances suitable for bearing seats and press fits.'
  },
  {
    id: 'q12',
    type: 'scenario',
    difficulty: 'hard',
    loId: 'LO-13',
    question: 'When clamping an asymmetric casting onto a lathe face plate, what critical procedure must be performed before starting the motor?',
    options: [
      'Bolt counterbalance lead weights opposite the heavy side to neutralize centrifugal force',
      'Increase spindle speed to maximum 2000 RPM',
      'Loosen all clamping T-bolts slightly',
      'Apply grease to the chuck face'
    ],
    answerIndex: 0,
    explanation: 'Asymmetric masses produce violent centrifugal forces (F = m * omega^2 * r) that can break the lathe unless statically counterbalanced.'
  },
  {
    id: 'q13',
    type: 'mcq',
    difficulty: 'medium',
    loId: 'LO-16',
    question: 'In a double-start screw thread having a pitch of 2.0 mm, what is the lead of the thread?',
    options: ['1.0 mm', '2.0 mm', '4.0 mm', '8.0 mm'],
    answerIndex: 2,
    explanation: 'Lead = Pitch * Number of Starts = 2.0 mm * 2 = 4.0 mm.'
  },
  {
    id: 'q14',
    type: 'mcq',
    difficulty: 'easy',
    loId: 'LO-17',
    question: 'In a standard 2-axis CNC turning centre, which axis governs the diametral movement of the tool turret?',
    options: ['X-axis', 'Z-axis', 'Y-axis', 'C-axis'],
    answerIndex: 0,
    explanation: 'In CNC turning, X represents diameter (cross movement) and Z represents the longitudinal spindle axis.'
  },
  {
    id: 'q15',
    type: 'mcq',
    difficulty: 'easy',
    loId: 'LO-18',
    question: 'What is the Fanuc G-code used for rapid non-cutting positioning motions?',
    options: ['G01', 'G02', 'G00', 'G04'],
    answerIndex: 2,
    explanation: 'G00 moves the tool turret at maximum rapid traversal speed to a safe clearance point.'
  },
  {
    id: 'q16',
    type: 'mcq',
    difficulty: 'medium',
    loId: 'LO-18',
    question: 'What is the function of G02 in CNC lathe part programming?',
    options: [
      'Linear interpolation with controlled feed rate',
      'Circular interpolation in clockwise (CW) direction',
      'Circular interpolation in counter-clockwise (CCW) direction',
      'Dwell pause for 2 seconds'
    ],
    answerIndex: 1,
    explanation: 'G02 executes clockwise circular arc interpolation.'
  },
  {
    id: 'q17',
    type: 'mcq',
    difficulty: 'medium',
    loId: 'LO-18',
    question: 'Which preparatory code sets the CNC feed rate mode to "feed per revolution" (mm/rev)?',
    options: ['G94', 'G95', 'G90', 'G21'],
    answerIndex: 1,
    explanation: 'G95 establishes feed in mm per spindle revolution (standard for turning operations).'
  },
  {
    id: 'q18',
    type: 'mcq',
    difficulty: 'easy',
    loId: 'LO-18',
    question: 'What miscellaneous code terminates the CNC program and automatically resets execution back to the first block?',
    options: ['M00', 'M02', 'M05', 'M30'],
    answerIndex: 3,
    explanation: 'M30 signifies "End of Program and Rewind" in standard Fanuc programming.'
  },
  {
    id: 'q19',
    type: 'mcq',
    difficulty: 'hard',
    loId: 'LO-19',
    question: 'Why is Tool Nose Radius Compensation (G41 / G42) required when turning tapers and radii on a CNC lathe?',
    options: [
      'To prevent spindle bearing heating',
      'Because the theoretical sharp tip does not exist; the rounded insert radius causes over-cutting or under-cutting on slopes',
      'To measure tool wear',
      'To adjust coolant pump pressure'
    ],
    answerIndex: 1,
    explanation: 'Because standard inserts have a nose radius (e.g. 0.4mm or 0.8mm), cutting tapers without G41/G42 causes geometric dimensional error.'
  },
  {
    id: 'q20',
    type: 'truefalse',
    difficulty: 'easy',
    loId: 'LO-01',
    question: 'You should always stop the lathe spindle completely before using a micrometer or vernier caliper to inspect workpiece size.',
    options: ['True', 'False'],
    answerIndex: 0,
    explanation: 'True. Measuring a rotating job is extremely dangerous and destroys the measuring faces of precision metrology instruments.'
  },
  {
    id: 'q21',
    type: 'truefalse',
    difficulty: 'medium',
    loId: 'LO-02',
    question: 'A 3-jaw self-centering chuck can hold square or asymmetrical workpieces with the same accuracy as round stock.',
    options: ['True', 'False'],
    answerIndex: 1,
    explanation: 'False. A 3-jaw scroll chuck can only grip round or regular hexagonal stock concentric to its center. Irregular or square jobs require a 4-jaw chuck.'
  }
];
