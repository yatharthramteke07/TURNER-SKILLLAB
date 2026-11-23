export const YEAR_1_MODULES = [
  {
    id: 'y1-m01',
    year: 1,
    number: 1,
    title: 'Workshop Safety and Basic Fitting',
    titleHi: 'कार्यशाला सुरक्षा एवं बेसिक फिटिंग',
    description: 'General workshop safety precautions, Personal Protective Equipment (PPE), basic bench fitting, marking tools, hacksawing, filing, and precision measurement using vernier calipers and micrometers.',
    descriptionHi: 'कार्यशाला सुरक्षा नियम, व्यक्तिगत सुरक्षा उपकरण (PPE), बेसिक बेंच फिटिंग, मार्किंग उपकरण, फाइलिंग और वर्नियर कैलिपर द्वारा परिशुद्ध मापन।',
    learningOutcomes: ['LO-01'],
    simulations: ['component-id'],
    isPlaceholder: false,
    lessons: [
      {
        id: 'y1-m01-l01',
        title: 'Safety Precautions, PPE & Dimensional Accuracy',
        titleHi: 'सुरक्षा सावधानियां, पीपीई एवं आयामी सटीकता',
        stages: {
          watch: {
            title: 'Essential Machinist Workshop Safety & Fitting',
            videoEmbedUrl: 'https://www.youtube.com/embed/placeholder-safety',
            duration: '10 min',
            summary: 'Comprehensive orientation on machine shop hazards, rotating spindle dangers, chip entanglement prevention, and correct PPE usage.'
          },
          read: {
            title: 'Industrial Safety Standards & Precision Measurement',
            sections: [
              {
                heading: '1. Machine Shop Hazards & Personal Protective Equipment (PPE)',
                content: 'Working around machine tools like lathes involves high-speed revolving components. Mandatory PPE includes safety goggles (impact-resistant polycarbonate), safety shoes with steel toe caps, and snug-fitting cotton boiler suits. Loose sleeves, ties, necklaces, and wristwatches are strictly forbidden as they can get caught in revolving chucks or lead screws.'
              },
              {
                heading: '2. The Danger of Revolving Spindles & Swarf Management',
                content: 'Never touch revolving workpieces or chucks with hands. Always use a swarf hook or chip scraper to remove continuous chips—never bare hands, as hot sharp metal ribbons cause severe lacerations. Never leave the chuck key inside the chuck socket; removing the key before turning away from the machine must be an instinctive habit.'
              },
              {
                heading: '3. Dimensional Metrology: Vernier Caliper & Outside Micrometer',
                content: 'The standard metric vernier caliper has a least count of 0.02 mm (1/50 mm). The outside micrometer features a pitch of 0.5 mm on the spindle screw and 50 graduations on the thimble, providing a precision least count of 0.01 mm. Always check for zero error before taking critical readings.'
              }
            ]
          },
          practice: {
            title: 'Safety Check & Metrology Drill',
            type: 'quiz_interactive',
            items: [
              {
                question: 'What is the standard least count of a metric vernier caliper with 49 main scale divisions divided into 50 vernier divisions?',
                options: ['0.1 mm', '0.05 mm', '0.02 mm', '0.001 mm'],
                answerIndex: 2,
                explanation: 'Least count = 1 MSD - 1 VSD = 1 mm - (49/50) mm = 1/50 mm = 0.02 mm.'
              },
              {
                question: 'Which action presents the gravest hazard when operating a centre lathe?',
                options: [
                  'Using cutting fluid while turning',
                  'Leaving the chuck key inserted in the chuck socket',
                  'Measuring the workpiece after stopping the spindle',
                  'Wearing safety spectacles'
                ],
                answerIndex: 1,
                explanation: 'A chuck key left in the chuck turns into a deadly projectile if the spindle is started.'
              }
            ]
          },
          simulate: {
            simulationId: 'component-id',
            title: 'Component Inspection & Safety Check',
            description: 'Inspect the 3D lathe to verify guard positions, chuck key removal, and emergency stop button accessibility.'
          },
          quiz: {
            quizId: 'quiz-y1-m01',
            title: 'Module 01 Assessment: Safety & Metrology',
            questionCount: 5
          },
          apply: {
            missionId: 'mission-safety-rules',
            title: 'Perform Pre-Start Workshop Inspection',
            task: 'Conduct a virtual inspection of the workshop environment, clear hazards, and equip PPE.'
          },
          review: {
            learningOutcome: 'LO-01: Basic fitting operations and dimensional accuracy',
            keyTakeaways: [
              'Always wear approved PPE (safety goggles, boots, tight overalls).',
              'Never leave the chuck key inside the chuck.',
              'Clean swarf only with a hook or brush, never bare hands.',
              'Standard vernier least count is 0.02 mm; micrometer least count is 0.01 mm.'
            ]
          }
        }
      }
    ],
    questions: [
      {
        id: 'q-y1m01-1',
        type: 'mcq',
        difficulty: 'easy',
        loId: 'LO-01',
        question: 'What is the least count of a standard metric outside micrometer?',
        options: ['0.1 mm', '0.05 mm', '0.02 mm', '0.01 mm'],
        answerIndex: 3,
        explanation: 'A standard metric outside micrometer has a pitch of 0.5 mm and 50 thimble divisions, giving a least count of 0.5 / 50 = 0.01 mm.'
      },
      {
        id: 'q-y1m01-2',
        type: 'mcq',
        difficulty: 'easy',
        loId: 'LO-01',
        question: 'What should never be worn while operating a lathe machine?',
        options: ['Safety shoes', 'Safety spectacles', 'Loose clothing or necktie', 'Short hair or hair net'],
        answerIndex: 2,
        explanation: 'Loose clothing, neckties, and scarves can become entangled in rotating spindles and chucks, resulting in fatal injury.'
      },
      {
        id: 'q-y1m01-3',
        type: 'truefalse',
        difficulty: 'medium',
        loId: 'LO-01',
        question: 'It is safe to remove long stringy metal swarf using your bare hand if the spindle is running at low RPM.',
        options: ['True', 'False'],
        answerIndex: 1,
        explanation: 'False. Revolving or stationary continuous swarf possesses razor-sharp edges and can slice tendons. Always use a swarf hook.'
      }
    ]
  },
  {
    id: 'y1-m02',
    year: 1,
    number: 2,
    title: 'Lathe Machine Fundamentals',
    titleHi: 'खराद मशीन के मूल सिद्धांत',
    description: 'Working principles of conventional centre lathe, constructional features (bed, headstock, spindle, tailstock, carriage, apron, compound rest, tool post), and workpiece holding in 3-jaw self-centering and 4-jaw independent chucks.',
    descriptionHi: 'सेंटर खराद के कार्य सिद्धांत, मुख्य घटक (बेड, हेडस्टॉक, स्पिंडल, टेलस्टॉक, कैरिज, एप्रन), और 3-जॉ एवं 4-जॉ चक में वर्कपीस माउंटिंग।',
    learningOutcomes: ['LO-02'],
    simulations: ['conventional-lathe', 'component-id'],
    isPlaceholder: false,
    lessons: [
      {
        id: 'y1-m02-l01',
        title: 'Lathe Construction, Spindle Drives & Chuck Systems',
        titleHi: 'खराद संरचना, स्पिंडल ड्राइव एवं चक प्रणालियां',
        stages: {
          watch: {
            title: 'Centre Lathe Construction & Chuck Mechanisms',
            videoEmbedUrl: 'https://www.youtube.com/embed/placeholder-lathe-parts',
            duration: '12 min',
            summary: 'Detailed tour of bed guideways, headstock gearing, carriage handwheels, compound rest swivelling, and 3-jaw vs 4-jaw chuck mechanics.'
          },
          read: {
            title: 'Core Lathe Mechanisms & Work Holding Principles',
            sections: [
              {
                heading: '1. The Lathe Bed & Guideways',
                content: 'The lathe bed is the foundation of the machine, cast from high-grade grey cast iron (often alloyed with nickel and chromium) to provide vibration dampening and rigidity. Bed ways are induction-hardened and ground to prevent premature wear. Common guideway profiles include inverted V-ways and flat ways.'
              },
              {
                heading: '2. Headstock, Spindle & Speed Transmission',
                content: 'Mounted on the left side of the bed, the headstock houses the hollow spindle and gear trains. The spindle nose carries external threads or camlock tapers to mount chucks and face plates. Modern all-geared headstocks allow instant selection of spindle RPM through lever combinations.'
              },
              {
                heading: '3. Carriage Assembly & Feed Mechanisms',
                content: 'The carriage moves longitudinally along the bed ways. It consists of the saddle (H-shaped casting bridging the ways), cross-slide (moves perpendicular to the bed axis for facing/depth of cut), compound rest (swivels 360 degrees for cutting tapers), tool post (holds cutting tools), and apron (contains gears and clutches for automatic longitudinal and cross feeds).'
              },
              {
                heading: '4. Work Holding: 3-Jaw Self-Centering vs 4-Jaw Independent Chuck',
                content: 'The 3-jaw scroll chuck automatically centers round or hexagonal stock simultaneously via a scroll plate. It is fast but cannot hold irregular shapes and loses concentricity over time. The 4-jaw independent chuck features four reversible jaws moved independently by separate screws, enabling exact truing to within 0.01 mm using a dial test indicator.'
              }
            ]
          },
          practice: {
            title: 'Identify Lathe Components & Chuck Types',
            type: 'quiz_interactive',
            items: [
              {
                question: 'Which lathe part is used to support the free end of a long workpiece or hold drill bits?',
                options: ['Headstock', 'Tailstock', 'Cross slide', 'Lead screw'],
                answerIndex: 1,
                explanation: 'The tailstock quill supports long shafts via dead/live centers and holds taper shank drills and reamers.'
              },
              {
                question: 'Why is a 4-jaw chuck preferred over a 3-jaw chuck for high-precision or square/irregular work?',
                options: [
                  'Because each jaw is independently adjustable for true concentricity and non-cylindrical work',
                  'Because it is lighter and rotates faster',
                  'Because it does not require a chuck key',
                  'Because it operates automatically with air pressure'
                ],
                answerIndex: 0,
                explanation: 'Each jaw of a 4-jaw chuck moves independently, allowing irregular work mounting and dial-indicator truing to zero run-out.'
              }
            ]
          },
          simulate: {
            simulationId: 'conventional-lathe',
            title: 'Mount Workpiece & Test Spindle Rotation',
            description: 'Select stock diameter, choose 3-jaw chuck, clamp workpiece, and verify clockwise/counter-clockwise spindle rotation.'
          },
          quiz: {
            quizId: 'quiz-y1-m02',
            title: 'Module 02 Assessment: Lathe Fundamentals',
            questionCount: 5
          },
          apply: {
            missionId: 'mission-identify-parts',
            title: '3D Component Identification Challenge',
            task: 'Identify all major lathe components in the virtual 3D lathe without error.'
          },
          review: {
            learningOutcome: 'LO-02: Conventional lathe setup, chucks and workpiece setting',
            keyTakeaways: [
              'The bed is made of chilled cast iron for vibration damping.',
              'Headstock houses the spindle; tailstock supports work and holds drills.',
              'Carriage contains saddle, cross-slide, compound rest, tool post, and apron.',
              '3-jaw chuck is self-centering; 4-jaw chuck is independent and high precision.'
            ]
          }
        }
      }
    ],
    questions: [
      {
        id: 'q-y1m02-1',
        type: 'mcq',
        difficulty: 'easy',
        loId: 'LO-02',
        question: 'Which component of the lathe is used for swivelling to cut steep tapers manually?',
        options: ['Cross slide', 'Compound rest', 'Apron handwheel', 'Lead screw'],
        answerIndex: 1,
        explanation: 'The compound rest is mounted on top of the cross slide and can be swivelled to any desired angle to cut short, steep tapers.'
      },
      {
        id: 'q-y1m02-2',
        type: 'mcq',
        difficulty: 'medium',
        loId: 'LO-02',
        question: 'What is the standard internal taper provided in the lathe spindle bore and tailstock quill?',
        options: ['Morse Taper (MT)', 'Jarno Taper', 'Brown & Sharpe Taper', 'Metric 1:20 Taper'],
        answerIndex: 0,
        explanation: 'Lathe spindle bores and tailstock quills universally utilize self-holding Morse Taper (MT2, MT3, MT4 or MT5).'
      },
      {
        id: 'q-y1m02-3',
        type: 'mcq',
        difficulty: 'medium',
        loId: 'LO-02',
        question: 'What material is primarily used to cast the lathe bed due to its compressive strength and vibration absorption?',
        options: ['Aluminium Alloy', 'Mild Steel', 'Grey Cast Iron', 'High Speed Steel'],
        answerIndex: 2,
        explanation: 'Grey cast iron possesses excellent damping capacity to absorb machining chatter, high compressive strength, and natural graphite lubrication.'
      }
    ]
  },
  {
    id: 'y1-m03',
    year: 1,
    number: 3,
    title: 'Cutting Tools and Turning Operations',
    titleHi: 'कटिंग टूल्स एवं टर्निंग ऑपरेशन',
    description: 'Single-point cutting tool geometry (rake angles, clearance angles, cutting edge angles), HSS vs carbide, facing, plain turning, shoulder turning, grooving, and parting off.',
    descriptionHi: 'सिंगल पॉइंट कटिंग टूल ज्यामिति (रेक कोण, क्लीयरेंस कोण), HSS बनाम कार्बाइड, फेसिंग, प्लेन टर्निंग, शोल्डर टर्निंग और पार्टिंग ऑपरेशन।',
    learningOutcomes: ['LO-03'],
    simulations: ['conventional-lathe', 'facing-turning'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y1-m03-l01',
        title: 'Single-Point Tool Angles and Basic Turning Operations',
        titleHi: 'सिंगल-पॉइंट टूल कोण एवं प्राथमिक टर्निंग',
        stages: {
          watch: { title: 'Tool Geometry & Turning Operations', duration: '10 min' },
          read: { title: 'Cutting Tool Angles, Speeds, and Turning Steps' },
          practice: { title: 'Identify Tool Angles & Cutting Parameters' },
          simulate: { simulationId: 'conventional-lathe', title: 'Perform Facing & Turning' },
          quiz: { title: 'Turning Operations Quiz' },
          apply: { title: 'Turn 50mm Workpiece to 45mm' },
          review: { title: 'Cutting Parameter Review' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y1-m04',
    year: 1,
    number: 4,
    title: 'Lathe Alignment and Accuracy',
    titleHi: 'खराद एलाइनमेंट और सटीकता परीक्षण',
    description: 'Testing lathe alignment between headstock and tailstock centers using test mandrels, dial test indicator (DTI), bed leveling with precision spirit levels, and tool height setting on center.',
    descriptionHi: 'हेडस्टॉक और टेलस्टॉक केंद्रों के बीच एलाइनमेंट परीक्षण, डायल टेस्ट इंडिकेटर, स्पिरिट लेवल द्वारा बेड लेवलिंग और टूल ऊंचाई सेटिंग।',
    learningOutcomes: ['LO-04'],
    simulations: ['conventional-lathe'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y1-m04-l01',
        title: 'Alignment Tests & Geometric Verification',
        titleHi: 'एलाइनमेंट टेस्ट एवं ज्यामितीय सत्यापन',
        stages: {
          watch: { title: 'Lathe Geometric Alignment Tests' },
          read: { title: 'Test Mandrels, DTI, and Spirit Levels' },
          practice: { title: 'Evaluate Alignment Deflection' },
          simulate: { simulationId: 'conventional-lathe', title: 'Verify Lathe Axis' },
          quiz: { title: 'Alignment Quiz' },
          apply: { title: 'Correct Tailstock Center Misalignment' },
          review: { title: 'Test Summary' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y1-m05',
    year: 1,
    number: 5,
    title: 'Taper and Angular Turning',
    titleHi: 'टेपर एवं कोणीय टर्निंग',
    description: 'Principles of taper turning, calculation of half-included taper angle, compound rest swivelling method, tailstock set-over method, and taper turning attachment operation.',
    descriptionHi: 'टेपर टर्निंग के सिद्धांत, हाफ-इन्क्लूडेड कोण गणना, कंपाउंड रेस्ट स्विवेलिंग, टेलस्टॉक सेट-ओवर और टेपर टर्निंग अटैचमेंट।',
    learningOutcomes: ['LO-05'],
    simulations: ['step-taper'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y1-m05-l01',
        title: 'Taper Calculations & Compound Rest Swivelling',
        titleHi: 'टेपर गणना एवं कंपाउंड रेस्ट स्विवेलिंग',
        stages: {
          watch: { title: 'Taper Turning Methods' },
          read: { title: 'Formulas for Taper Angle & Set-Over' },
          practice: { title: 'Calculate Compound Rest Angle' },
          simulate: { simulationId: 'step-taper', title: 'Turn Conical Taper' },
          quiz: { title: 'Taper Turning Quiz' },
          apply: { title: 'Machine MT3 External Taper Plug' },
          review: { title: 'Taper Dimension Review' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y1-m06',
    year: 1,
    number: 6,
    title: 'Boring Operations',
    titleHi: 'बोरिंग ऑपरेशन',
    description: 'Drilling on lathe using tailstock, counter-boring, countersinking, single-point boring bar mounting, chatter elimination, and measuring internal diameters with telescopic gauges and inside micrometers.',
    descriptionHi: 'टेलस्टॉक से ड्रिलिंग, काउंटर-बोरिंग, सिंगल-पॉइंट बोरिंग बार माउंटिंग, चैटर निवारण और आंतरिक व्यास मापन।',
    learningOutcomes: ['LO-06'],
    simulations: ['drilling-boring'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y1-m06-l01',
        title: 'Hole Making & Precision Boring Techniques',
        titleHi: 'ड्रिलिंग एवं परिशुद्ध बोरिंग तकनीक',
        stages: {
          watch: { title: 'Drilling & Boring on Centre Lathe' },
          read: { title: 'Boring Bar Rigidity & Tool Overhang' },
          practice: { title: 'Select Boring Bar & RPM' },
          simulate: { simulationId: 'drilling-boring', title: 'Bore Hole to 30mm' },
          quiz: { title: 'Boring Quiz' },
          apply: { title: 'Internal Stepped Bore Machining' },
          review: { title: 'Bore Inspection Review' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y1-m07',
    year: 1,
    number: 7,
    title: 'Thread Cutting',
    titleHi: 'थ्रेड कटिंग (चूड़ी काटना)',
    description: 'Principles of screw thread cutting on lathe, lead screw pitch, change gear calculations for metric and imperial threads, half-nut engagement, thread chaser usage, and thread measurement using thread pitch gauges and 3-wire method.',
    descriptionHi: 'खराद पर स्क्रू थ्रेड काटना, लीड स्क्रू पिच, चेंज गियर गणना, हाफ-नट जोड़ना और 3-वायर विधि द्वारा थ्रेड मापन।',
    learningOutcomes: ['LO-07'],
    simulations: ['thread-cutting'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y1-m07-l01',
        title: 'Metric V-Thread Cutting & Gearing Calculation',
        titleHi: 'मीट्रिक वी-थ्रेड कटिंग एवं गियरिंग गणना',
        stages: {
          watch: { title: 'Thread Cutting on Lathe' },
          read: { title: 'Change Gear Ratio Formula: Driver/Driven' },
          practice: { title: 'Calculate Gear Train for M16x2.0' },
          simulate: { simulationId: 'thread-cutting', title: 'Cut M20 Metric Thread' },
          quiz: { title: 'Threading Quiz' },
          apply: { title: 'Cut External V-Thread Job' },
          review: { title: 'Thread Tolerance Review' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y1-m08',
    year: 1,
    number: 8,
    title: 'Lathe Accessories and Applications',
    titleHi: 'खराद के सहायक उपकरण एवं अनुप्रयोग',
    description: 'Lathe accessories: face plate, angle plate, driving plate, lathe dogs/carriers, fixed steady rest, follower steady rest, and mandrels for machining concentric components.',
    descriptionHi: 'खराद के सहायक उपकरण: फेस प्लेट, एंगल प्लेट, ड्राइविंग डॉग, फिक्स्ड स्टडी रेस्ट, फॉलोअर स्टडी रेस्ट और मेंड्रेल।',
    learningOutcomes: ['LO-08'],
    simulations: ['workpiece-setting'],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y1-m08-l01',
        title: 'Steady Rests, Face Plates & Mandrels',
        titleHi: 'स्टडी रेस्ट, फेस प्लेट एवं मेंड्रेल',
        stages: {
          watch: { title: 'Lathe Accessories Overview' },
          read: { title: 'Supporting Slender Shafts with Rests' },
          practice: { title: 'Select Correct Work Holding Setup' },
          simulate: { simulationId: 'workpiece-setting', title: 'Mount Job on Face Plate' },
          quiz: { title: 'Accessories Quiz' },
          apply: { title: 'Turn Long Slender Shaft with Steady Rest' },
          review: { title: 'Setup Summary' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y1-m09',
    year: 1,
    number: 9,
    title: 'Machine Maintenance',
    titleHi: 'मशीन अनुरक्षण एवं निवारक रखरखाव',
    description: 'Preventive maintenance, lubrication systems, grease points, oil levels, gib strip adjustment for cross slide and saddle, belt tensioning, and daily/weekly maintenance checklists.',
    descriptionHi: 'निवारक रखरखाव, स्नेहन प्रणालियां, ऑयल स्तर, गिब स्ट्रिप समायोजन, बेल्ट तनाव और दैनिक चेकलिस्ट।',
    learningOutcomes: ['LO-09'],
    simulations: [],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y1-m09-l01',
        title: 'Machine Lubrication & Gib Strip Adjustment',
        titleHi: 'मशीन स्नेहन एवं गिब स्ट्रिप समायोजन',
        stages: {
          watch: { title: 'Preventive Lathe Maintenance' },
          read: { title: 'Lubrication Schedules & Gib Strip Play' },
          practice: { title: 'Identify Lubrication Points' },
          simulate: { title: 'Interactive Maintenance Checklist' },
          quiz: { title: 'Maintenance Quiz' },
          apply: { title: 'Perform Weekly Lathe Service' },
          review: { title: 'Maintenance Record' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y1-m10',
    year: 1,
    number: 10,
    title: 'Engineering Drawing',
    titleHi: 'इंजीनियरिंग ड्राइंग',
    description: 'Orthographic projections (First angle and Third angle), sectional views, dimensioning rules, limits, fits, tolerances symbols, and reading component manufacturing blueprints for turning.',
    descriptionHi: 'ऑर्थोग्राफिक प्रक्षेप (प्रथम एवं तृतीय कोण), सेक्शनल व्यूज, डायमेंशनिंग नियम और टर्निंग ब्लूप्रिंट्स।',
    learningOutcomes: ['LO-10'],
    simulations: [],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y1-m10-l01',
        title: 'Reading Blueprints & Sectional Projections',
        titleHi: 'ब्लूप्रिंट पठन एवं सेक्शनल प्रक्षेप',
        stages: {
          watch: { title: 'Blueprint Reading for Turners' },
          read: { title: 'Geometric Symbols & Surface Roughness Marks' },
          practice: { title: 'Decode Dimension Tolerances' },
          simulate: { title: 'Interactive 3D Drawing Explorer' },
          quiz: { title: 'Drawing Quiz' },
          apply: { title: 'Extract Machining Dimensions from Drawing' },
          review: { title: 'Blueprint Interpretation' }
        }
      }
    ],
    questions: []
  },
  {
    id: 'y1-m11',
    year: 1,
    number: 11,
    title: 'Workshop Mathematics and Engineering Science',
    titleHi: 'कार्यशाला गणित एवं विज्ञान',
    description: 'Formulas for cutting speed (V = pi * D * N / 1000), spindle RPM calculation, feed rate, machining time calculation for facing and turning, material removal rate (MRR), and taper angle trigonometry.',
    descriptionHi: 'कटिंग स्पीड सूत्र, स्पिंडल RPM गणना, फीड दर, मशीनिंग समय गणना, मैटेरियल रिमूवल रेट (MRR) और त्रिकोणमिति।',
    learningOutcomes: ['LO-11'],
    simulations: [],
    isPlaceholder: true,
    lessons: [
      {
        id: 'y1-m11-l01',
        title: 'Cutting Speed, Feed & Machining Time Calculations',
        titleHi: 'कटिंग स्पीड, फीड एवं मशीनिंग समय गणना',
        stages: {
          watch: { title: 'Turner Workshop Calculations' },
          read: { title: 'Formulas for RPM, Cutting Speed & Time' },
          practice: { title: 'Solve RPM & Cutting Time Exercises' },
          simulate: { title: 'Interactive Cutting Parameter Calculator' },
          quiz: { title: 'Machining Calculations Quiz' },
          apply: { title: 'Calculate Cycle Time for Shaft' },
          review: { title: 'Formulas Cheatsheet' }
        }
      }
    ],
    questions: []
  }
];
