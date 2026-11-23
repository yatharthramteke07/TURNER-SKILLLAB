export const YEAR_2_MODULES = [
  {
    id: 'y2-m12',
    year: 2,
    number: 12,
    title: 'Precision Turning and Advanced Tooling',
    titleHi: 'परिशुद्ध टर्निंग एवं उन्नत टूलिंग',
    description: 'High-precision turning, ISO tolerance grades (IT6, IT7, IT8), limit gauges (plug, snap gauges), slip gauges, dial indicators, coated carbide insert grades (P, M, K), chip breaker geometry, and surface roughness (Ra value).',
    descriptionHi: 'उच्च परिशुद्धता टर्निंग, आईएसओ टॉलरेंस ग्रेड (IT6, IT7), लिमिट गेज, स्लिप गेज, डायल इंडिकेटर, कोटेड कार्बाइड इंसर्ट्स और सतह खुरदरापन (Ra मान)।',
    learningOutcomes: ['LO-12'],
    simulations: ['conventional-lathe'],
    isPlaceholder: false,
    lessons: [
      {
        id: 'y2-m12-l01',
        title: 'Precision Fits, Tolerance Grades & Indexable Carbide Tooling',
        titleHi: 'परिशुद्ध फिट्स, टॉलरेंस ग्रेड एवं इंडेक्सिबल कार्बाइड टूलिंग',
        stages: {
          watch: {
            title: 'Precision Turning & Carbide Inserts in Action',
            videoEmbedUrl: 'https://www.youtube.com/embed/placeholder-precision-tooling',
            duration: '14 min',
            summary: 'Practical guide to machining within ±0.01mm tolerance, ISO insert designations (CNMG, TNMG), nose radius effects, and measuring with slip gauges.'
          },
          read: {
            title: 'Tolerancing Systems, ISO Inserts & Surface Integrity',
            sections: [
              {
                heading: '1. ISO Tolerance Grades & Limits of Size',
                content: 'Precision engineering components require controlled tolerances. ISO 286 defines 18 standard tolerance grades from IT01 to IT16. Machinists typically work with IT6 to IT8 for bearing seats and hydraulic shafts. The upper and lower limits define the permissible tolerance band. For example, a 50h7 shaft has limits of 50.000 mm and 49.075 mm (tolerance 0.025 mm).'
              },
              {
                heading: '2. Coated Carbide Inserts (ISO P, M, K Classification)',
                content: 'Modern CNC and conventional turning relies on indexable carbide inserts coated with TiN, TiCN, or Al2O3. The ISO classification categorizes workpiece materials: P (Blue) for carbon & alloy steels; M (Yellow) for stainless steels; K (Red) for cast irons; N (Green) for non-ferrous metals; S (Orange) for heat-resistant superalloys; H (Grey) for hardened steels.'
              },
              {
                heading: '3. Surface Finish & Nose Radius Selection',
                content: 'Theoretical peak-to-valley surface roughness is determined by the formula: h = f^2 / (8 * R), where f is the feed per revolution and R is the tool nose radius. A larger tool nose radius (0.8 mm vs 0.4 mm) improves surface finish at the same feed rate but increases radial cutting forces.'
              }
            ]
          },
          practice: {
            title: 'Carbide Selection & Tolerance Verification Drill',
            type: 'quiz_interactive',
            items: [
              {
                question: 'Which ISO color code and letter represents cutting tools designed specifically for steels?',
                options: ['P - Blue', 'M - Yellow', 'K - Red', 'N - Green'],
                answerIndex: 0,
                explanation: 'ISO P (Blue) designates tools for ferritic and pearlitic carbon and alloy steels.'
              },
              {
                question: 'How does increasing the tool nose radius affect the theoretical surface roughness (Ra) at a constant feed rate?',
                options: [
                  'It decreases surface roughness (produces a smoother finish)',
                  'It increases surface roughness (makes it rougher)',
                  'It has no effect on surface roughness',
                  'It causes immediate tool breakage'
                ],
                answerIndex: 0,
                explanation: 'According to h = f^2 / (8 * R), a larger nose radius R reduces peak-to-valley roughness h.'
              }
            ]
          },
          simulate: {
            simulationId: 'conventional-lathe',
            title: 'Precision Finish Turning Simulation',
            description: 'Apply finishing cuts with carbide inserts to achieve 0.02mm tolerance and inspect workpiece profile.'
          },
          quiz: {
            quizId: 'quiz-y2-m12',
            title: 'Module 12 Assessment: Precision Turning',
            questionCount: 5
          },
          apply: {
            missionId: 'mission-precision-bearing',
            title: 'Machine Bearing Journal Seat to IT7 Tolerance',
            task: 'Turn a 40mm shaft diameter to 40.000 mm (+0.000 / -0.025 mm) tolerance.'
          },
          review: {
            learningOutcome: 'LO-12: Precision engineering components and advanced turning',
            keyTakeaways: [
              'IT6 to IT8 grades apply to precision bearing journals and sliding fits.',
              'ISO P = Steels (Blue), M = Stainless (Yellow), K = Cast Iron (Red).',
              'Theoretical roughness h = f^2 / (8*R); larger nose radius improves finish.',
              'Use micrometers calibrated with Grade 0 slip gauges for precision verification.'
            ]
          }
        }
      }
    ],
    questions: [
      {
        id: 'q-y2m12-1',
        type: 'mcq',
        difficulty: 'medium',
        loId: 'LO-12',
        question: 'Under ISO insert designations, what does a "CNMG 120408" tool insert shape letter "C" designate?',
        options: ['80° Rhombic shape', 'Triangular shape', 'Square shape', 'Round shape'],
        answerIndex: 0,
        explanation: 'In the ISO insert code, "C" denotes an 80-degree rhombic (diamond) shape insert, offering high tip strength and versatile profiling.'
      },
      {
        id: 'q-y2m12-2',
        type: 'mcq',
        difficulty: 'hard',
        loId: 'LO-12',
        question: 'What is the primary purpose of chip breaker grooves on indexable carbide inserts?',
        options: [
          'To curl and break continuous ductile chips into manageable C-shaped or 6-shaped pieces',
          'To reduce the total weight of the insert',
          'To increase the cutting temperature',
          'To decorate the tool insert'
        ],
        answerIndex: 0,
        explanation: 'Chip breakers mechanically curl hot ribbons of swarf against the workpiece or tool flank, snapping them safely into small chips.'
      },
      {
        id: 'q-y2m12-3',
        type: 'truefalse',
        difficulty: 'medium',
        loId: 'LO-12',
        question: 'A 50 H7 hole has a lower deviation of zero (it will never be smaller than 50.000 mm).',
        options: ['True', 'False'],
        answerIndex: 0,
        explanation: 'True. In the ISO fit system, the fundamental deviation letter "H" specifies that the lower limit equals the basic size (EI = 0).'
      }
    ]
  },
  {
    id: 'y2-m13',
    year: 2,
    number: 13,
    title: 'Irregular Job Machining',
    titleHi: 'अनियमित आकृतियों की मशीनिंग',
    description: 'Workpiece mounting on 4-jaw independent chuck and faceplate, coordinate layout, counterbalancing asymmetric rotating masses, machining eccentric journals, and checking runout with dial test indicators.',
    descriptionHi: '4-जॉ इंडिपेंडेंट चक एवं फेसप्लेट पर वर्कपीस माउंटिंग, लेआउट मार्किंग, असममित घूर्णन भारों का संतुलन (काउंटरबैलेंसिंग), उत्केन्द्रित जर्नल मशीनिंग और डायल इंडिकेटर द्वारा रनआउट परीक्षण।',
    learningOutcomes: ['LO-13'],
    simulations: ['workpiece-setting'],
    isPlaceholder: false,
    lessons: [
      {
        id: 'y2-m13-l01',
        title: '4-Jaw Chuck Setting, Face Plate Clamping & Counterbalancing',
        titleHi: '4-जॉ चक सेटिंग, फेस प्लेट क्लैम्पिंग एवं काउंटरबैलेंसिंग',
        stages: {
          watch: {
            title: 'Mounting Irregular Castings on Face Plates',
            videoEmbedUrl: 'https://www.youtube.com/embed/placeholder-irregular-machining',
            duration: '15 min',
            summary: 'Techniques for securing asymmetric components with T-bolts, angle plates, step blocks, and attaching lead counterweights to prevent dangerous centrifugal vibrations.'
          },
          read: {
            title: 'Face Plate Fixturing & Dynamic Balancing Principles',
            sections: [
              {
                heading: '1. Face Plate & Angle Plate Work Holding',
                content: 'Components with irregular flanges, offset holes, or non-cylindrical casting profiles cannot be gripped in chucks. They are clamped to a lathe face plate using T-bolts, clamping dogs, and packing blocks. When a surface must be machined perpendicular to a flat datum, an angle plate is bolted to the face plate.'
              },
              {
                heading: '2. Counterbalancing Rotating Asymmetric Masses',
                content: 'When an asymmetric workpiece rotates at speed, the off-center center of gravity creates huge centrifugal forces (F = m * omega^2 * r). This causes severe vibration, spindle bearing wear, and poor geometric accuracy. Counterbalance weights must be bolted to the opposite side of the face plate until the assembly is statically balanced.'
              },
              {
                heading: '3. Truing with Dial Test Indicator (DTI)',
                content: 'To true a marked center or bore, rotate the face plate by hand while holding the stylus of a sensitive DTI against the reference diameter. Adjust clamping screws until the pointer deflection (runout) is within 0.01 mm.'
              }
            ]
          },
          practice: {
            title: 'Balancing Calculations & Dial Indicator Verification',
            type: 'quiz_interactive',
            items: [
              {
                question: 'What is the primary danger of running an unbalanced irregular casting at high RPM on a face plate?',
                options: [
                  'Violent centrifugal vibrations causing machine chatter, bearing damage, or workpiece ejection',
                  'The workpiece will melt from heat',
                  'The spindle motor will reverse direction',
                  'The tool post will rotate automatically'
                ],
                answerIndex: 0,
                explanation: 'Centrifugal force escalates with the square of spindle speed, creating dangerous vibrations that can destroy bearings or fling heavy castings.'
              },
              {
                question: 'How do you check if an off-center job on a face plate is statically balanced before powering on the spindle?',
                options: [
                  'Disengage the headstock drive gears; the face plate should remain stationary at any angular position without self-rotating',
                  'Start the motor at maximum RPM and listen for noise',
                  'Weigh the machine bed on a scale',
                  'Measure the length of the tool post'
                ],
                answerIndex: 0,
                explanation: 'With spindle gears free (neutral), a balanced face plate will not swing down under gravity from any position.'
              }
            ]
          },
          simulate: {
            simulationId: 'workpiece-setting',
            title: 'Workpiece & Chuck Setting Challenge',
            description: 'True an off-center cylindrical shaft using 4-jaw independent screws and Dial Test Indicator (DTI).'
          },
          quiz: {
            quizId: 'quiz-y2-m13',
            title: 'Module 13 Assessment: Irregular Machining',
            questionCount: 5
          },
          apply: {
            missionId: 'mission-faceplate-setup',
            title: 'Mount and Balance Pump Casing',
            task: 'Clamp irregular pump housing to face plate and mount counterweights.'
          },
          review: {
            learningOutcome: 'LO-13: Machining irregular-shaped jobs using lathe accessories',
            keyTakeaways: [
              'Irregular castings use face plates and angle plates with T-bolts.',
              'Always counterbalance off-center mass to prevent centrifugal vibration.',
              'Check static balance with spindle in neutral before turning.',
              'Use DTI for truing concentricity to within 0.01 mm.'
            ]
          }
        }
      }
    ],
    questions: [
      {
        id: 'q-y2m13-1',
        type: 'mcq',
        difficulty: 'medium',
        loId: 'LO-13',
        question: 'Which accessory is used on a lathe face plate to machine a surface precisely 90° to a flat datum base?',
        options: ['Angle plate', 'Fixed steady rest', 'Lathe dog', 'Morse taper drill sleeve'],
        answerIndex: 0,
        explanation: 'An angle plate has two machined surfaces at exactly 90 degrees; one bolts to the face plate, and the workpiece mounts on the other.'
      },
      {
        id: 'q-y2m13-2',
        type: 'mcq',
        difficulty: 'hard',
        loId: 'LO-13',
        question: 'When machining an eccentric crankshaft pin on a lathe, how is the eccentricity established between centers?',
        options: [
          'By drilling offset center holes on both ends of the shaft by the exact eccentric throw distance',
          'By bending the shaft in a hydraulic press',
          'By swivelling the compound rest to 45 degrees',
          'By running the spindle in reverse'
        ],
        answerIndex: 0,
        explanation: 'Dual center holes are drilled in each end face separated by distance "e" (the required throw). The workpiece is mounted on these offset centers.'
      },
      {
        id: 'q-y2m13-3',
        type: 'truefalse',
        difficulty: 'easy',
        loId: 'LO-13',
        question: 'Heavy irregular castings should always be rotated at the highest available spindle RPM to ensure smooth cutting.',
        options: ['True', 'False'],
        answerIndex: 1,
        explanation: 'False. Heavy irregular jobs must be run at low speeds to keep centrifugal forces within safe limits and prevent catastrophe.'
      }
    ]
  },
  {
    id: 'y2-m14',
    year: 2,
    number: 14,
    title: 'Lathe Attachments and Utility Components',
    titleHi: 'खराद अटैचमेंट्स एवं उपयोगी घटक',
    description: 'Taper turning attachments, spherical and ball turning attachments, tool-post milling attachment for keyways, tool-post grinding attachment for hardened shafts, and manufacturing utility components.',
    descriptionHi: 'टेपर टर्निंग अटैचमेंट, स्फेरिकल टर्निंग, की-वे के लिए मिलिंग अटैचमेंट और टूल-पोस्ट ग्राइंडिंग अटैचमेंट।',
    learningOutcomes: ['LO-14'],
    simulations: [],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y2-m14-l01',
        title: 'Special Attachments: Taper, Milling & Tool Post Grinding',
        titleHi: 'विशेष अटैचमेंट्स: टेपर, मिलिंग एवं टूल-पोस्ट ग्राइंडिंग',
        stages: {
          watch: { title: 'Lathe Attachments Demonstration' },
          read: { title: 'Taper Guide Bar & Tool Post Grinding Safety' },
          practice: { title: 'Attachment Setup Drill' },
          simulate: { title: 'Virtual Attachment Operations' },
          quiz: { title: 'Attachments Quiz' },
          apply: { title: 'Milling a Keyway on Lathe' },
          review: { title: 'Attachments Summary' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y2-m15',
    year: 2,
    number: 15,
    title: 'Advanced Boring and Eccentric Machining',
    titleHi: 'उन्नत बोरिंग एवं उत्केन्द्रित टर्निंग',
    description: 'Deep-hole boring operations, blind hole stepped boring, internal recessing/undercutting, internal circlip grooving, and machining eccentric bores in 4-jaw chuck.',
    descriptionHi: 'डीप-होल बोरिंग, ब्लाइंड होल स्टेप्ड बोरिंग, आंतरिक रीसेसिंग, सिर्क्लिप ग्रूविंग और उत्केन्द्रित बोर मशीनिंग।',
    learningOutcomes: ['LO-15'],
    simulations: ['drilling-boring'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y2-m15-l01',
        title: 'Internal Relief Grooving & Eccentric Bore Setup',
        titleHi: 'आंतरिक रिलीफ ग्रूविंग एवं उत्केन्द्रित बोर सेटअप',
        stages: {
          watch: { title: 'Advanced Internal Turning' },
          read: { title: 'Internal Undercuts & Circlip Tolerances' },
          practice: { title: 'Internal Grooving Calculations' },
          simulate: { simulationId: 'drilling-boring', title: 'Machine Internal Undercut' },
          quiz: { title: 'Advanced Boring Quiz' },
          apply: { title: 'Bore Bearing Housing with Retaining Groove' },
          review: { title: 'Internal Metrology Check' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y2-m16',
    year: 2,
    number: 16,
    title: 'Multi-start Threading',
    titleHi: 'मल्टी-स्टार्ट थ्रेडिंग एवं विशेष चूड़ियां',
    description: 'Multi-start screw threads (double-start, triple-start), pitch vs lead relationship (Lead = Pitch * Number of Starts), indexing methods for multi-start threads, ACME threads, Square threads, and Buttress threads.',
    descriptionHi: 'मल्टी-स्टार्ट स्क्रू थ्रेड्स, पिच बनाम लीड संबंध (लीड = पिच × स्टार्ट संख्या), इंडेक्सिंग विधियां, एक्मे, स्क्वायर और बट्रेस थ्रेड्स।',
    learningOutcomes: ['LO-16'],
    simulations: ['thread-cutting'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y2-m16-l01',
        title: 'Lead Calculations & Compound Rest Indexing for Multi-Start Threads',
        titleHi: 'लीड गणना एवं मल्टी-स्टार्ट थ्रेड्स के लिए इंडेक्सिंग',
        stages: {
          watch: { title: 'Multi-Start Thread Cutting on Lathe' },
          read: { title: 'Lead vs Pitch & Indexing by Compound Rest' },
          practice: { title: 'Calculate Multi-Start Gearing & Index' },
          simulate: { simulationId: 'thread-cutting', title: 'Cut Double-Start 29° ACME Thread' },
          quiz: { title: 'Multi-Start Thread Quiz' },
          apply: { title: 'Machine Lead Screw Nut Component' },
          review: { title: 'Thread Flank Inspection' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y2-m17',
    year: 2,
    number: 17,
    title: 'CNC Turning Fundamentals',
    titleHi: 'सीएनसी टर्निंग के मूल सिद्धांत',
    description: 'Introduction to Computer Numerical Control (CNC) turning centres, axes designation (X-axis for diameter, Z-axis for longitudinal spindle axis), machine zero (M), workpiece zero (W / G54), tool reference point, and CNC safety interlocks.',
    descriptionHi: 'सीएनसी टर्निंग सेंटर का परिचय, अक्ष पदनाम (X व्यास, Z अनुदैर्ध्य), मशीन जीरो, वर्क जीरो (G54), और सीएनसी सुरक्षा इंटरलॉक्स।',
    learningOutcomes: ['LO-17'],
    simulations: ['cnc-lathe'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y2-m17-l01',
        title: 'CNC Turning Axes, Coordinate Reference & Machine Datums',
        titleHi: 'सीएनसी टर्निंग अक्ष, निर्देशांक संदर्भ एवं मशीन डेटम',
        stages: {
          watch: { title: 'Inside an Industrial CNC Lathe' },
          read: { title: 'Cartesian Coordinate System for Turning (X & Z)' },
          practice: { title: 'Identify Absolute vs Incremental Points' },
          simulate: { simulationId: 'cnc-lathe', title: 'Jog CNC Turret in X and Z' },
          quiz: { title: 'CNC Fundamentals Quiz' },
          apply: { title: 'Set G54 Work Zero on Virtual CNC' },
          review: { title: 'CNC Coordinate Check' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y2-m18',
    year: 2,
    number: 18,
    title: 'CNC Programming',
    titleHi: 'सीएनसी प्रोग्रामिंग',
    description: 'ISO standard Fanuc G-codes and M-codes, program structure (% O-number), preparatory codes (G00 rapid, G01 linear, G02/G03 circular), units (G20/G21), spindle control (G96 CSS / G97 RPM), feed modes (G94/G95), and tool calls (T0101).',
    descriptionHi: 'फानुक जी एवं एम कोड्स, प्रोग्राम संरचना (% O0001), G00 रैपिड, G01 लीनियर, G02/G03 सर्कुलर, G96/G97 स्पिंडल कंट्रोल और T0101 टूल कॉल।',
    learningOutcomes: ['LO-18'],
    simulations: ['cnc-lathe', 'cnc-programming'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y2-m18-l01',
        title: 'Writing Fanuc Turning Programs: Facing, Turning & Arcs',
        titleHi: 'फैनुक टर्निंग प्रोग्राम लेखन: फेसिंग, टर्निंग एवं आर्क',
        stages: {
          watch: { title: 'CNC Code Structure & Simulation' },
          read: { title: 'G00, G01, G02, G03 Syntax & Arc Radius R' },
          practice: { title: 'Write Facing Block Exercise' },
          simulate: { simulationId: 'cnc-programming', title: 'Monaco G-Code Editor & Run' },
          quiz: { title: 'G-Code Programming Quiz' },
          apply: { title: 'Program Stepped Shaft with 5mm Fillet' },
          review: { title: 'Code Diagnostics Review' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y2-m19',
    year: 2,
    number: 19,
    title: 'CNC Tool Setup and Offsets',
    titleHi: 'सीएनसी टूल सेटअप एवं ऑफसेट्स',
    description: 'CNC tool turret loading, tool geometry offsets (X & Z touch-off procedure), wear offsets, tool nose radius compensation (G40, G41, G42), and virtual tool tip orientation codes (1 to 9).',
    descriptionHi: 'टूल बुर्ज लोडिंग, टूल ज्योमेट्री ऑफसेट (X एवं Z टच-ऑफ), वियर ऑफसेट, टूल नोज रेडियस कम्पेन्सेशन (G40, G41, G42) और टूल टिप ओरिएंटेशन।',
    learningOutcomes: ['LO-19'],
    simulations: ['cnc-lathe'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y2-m19-l01',
        title: 'Setting Work & Tool Offsets on Fanuc Controller',
        titleHi: 'फैनुक कंट्रोलर पर वर्क एवं टूल ऑफसेट सेट करना',
        stages: {
          watch: { title: 'CNC Tool Offsets Touch-off Procedure' },
          read: { title: 'Geometry Offsets vs Wear Offsets & TNRC' },
          practice: { title: 'Calculate Tool Nose Radius Error' },
          simulate: { simulationId: 'cnc-lathe', title: 'Set Tool Offsets in Virtual Turret' },
          quiz: { title: 'Tool Offsets Quiz' },
          apply: { title: 'Touch-off Facing & Turning Tools' },
          review: { title: 'Offset Table Verification' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y2-m20',
    year: 2,
    number: 20,
    title: 'CNC Machining and Component Manufacturing',
    titleHi: 'सीएनसी मशीनिंग एवं उत्पादन',
    description: 'Dry run execution without workpiece, single block verification mode, feed rate override, emergency stop procedures, cycle time optimization, and precision measurement of finished components.',
    descriptionHi: 'ड्राई रन, सिंगल ब्लॉक मोड, फीड ओवरराइड, इमरजेंसी स्टॉप, साइकिल टाइम ऑप्टिमाइज़ेशन और अंतिम कंपोनेंट का निरीक्षण।',
    learningOutcomes: ['LO-20'],
    simulations: ['cnc-lathe', 'cnc-toolpath'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y2-m20-l01',
        title: 'CNC Component Execution, Dry Run & Final Inspection',
        titleHi: 'सीएनसी कंपोनेंट निर्माण, ड्राई रन एवं अंतिम निरीक्षण',
        stages: {
          watch: { title: 'CNC Part Production from Bar Stock' },
          read: { title: 'Dry Run Safety & Machine Interlocks' },
          practice: { title: 'Inspect CNC Turned Test Part' },
          simulate: { simulationId: 'cnc-toolpath', title: '3D Toolpath Execution' },
          quiz: { title: 'Component Manufacturing Quiz' },
          apply: { title: 'Manufacture Utility Spindle Pin' },
          review: { title: 'Quality Control Summary' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y2-m21',
    year: 2,
    number: 21,
    title: 'Engineering Drawing and Engineering Science',
    titleHi: 'इंजीनियरिंग ड्राइंग एवं विज्ञान (उन्नत)',
    description: 'Advanced assembly drawings, Bill of Materials (BOM), tolerance stack-up analysis, limits and fits (hole basis vs shaft basis system), cutting power requirement formulas (kW = MRR * Specific Energy), and thermal expansion in machining.',
    descriptionHi: 'उन्नत असेंबली ड्राइंग, बिल ऑफ मैटेरियल्स (BOM), टॉलरेंस स्टैक-अप, लिमिट्स और फिट्स, कटिंग पावर आवश्यकता (kW) और थर्मल विस्तार।',
    learningOutcomes: ['LO-21'],
    simulations: [],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y2-m21-l01',
        title: 'Assembly Blueprints, Power Calculations & Limits & Fits',
        titleHi: 'असेंबली ब्लूप्रिंट्स, पावर गणना एवं लिमिट्स और फिट्स',
        stages: {
          watch: { title: 'Reading Assembly Drawings & Calculating Power' },
          read: { title: 'Hole Basis System (H7/g6, H7/p6) & Cutting Force Formulas' },
          practice: { title: 'Calculate Motor Power for Turning Pass' },
          simulate: { title: 'Interactive Fits & Limits Calculator' },
          quiz: { title: 'Advanced Drawing & Science Quiz' },
          apply: { title: 'Determine Fit Class for Bushing Assembly' },
          review: { title: 'Design Formulas Reference' }
        }
      }
    ],
    questions: []
  }
];
