import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const RANKS = [
  { minXP: 0, title: 'Apprentice Turner', titleHi: 'प्रशिक्षु टर्नर', badge: '🔰' },
  { minXP: 250, title: 'Trainee Machinist', titleHi: 'ट्रेनी मशीनिस्ट', badge: '⚙️' },
  { minXP: 600, title: 'Skilled Turner', titleHi: 'कुशल टर्नर', badge: '🔧' },
  { minXP: 1200, title: 'Expert Machinist', titleHi: 'विशेषज्ञ मशीनिस्ट', badge: '⚡' },
  { minXP: 2000, title: 'Master Turner', titleHi: 'मास्टर टर्नर', badge: '🏆' },
];

export const calculateRank = (xp) => {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXP) {
      return RANKS[i];
    }
  }
  return RANKS[0];
};

export const useStudentStore = create(
  persist(
    (set, get) => ({
      // Student Profile
      profile: {
        name: 'Aditya Kumar',
        trade: 'Turner (CTS 2.0 / NSQF Level 4)',
        institute: 'Government ITI Varanasi',
        rollNo: 'ITI-TRN-2024-042',
        year: 1,
        avatar: null,
      },

      // Gamification
      xp: 220,
      streak: 5, // Consecutive active days
      language: 'en', // 'en' | 'hi'
      theme: 'light', // 'light' | 'dark'

      // Curriculum progress
      completedLOs: ['LO-01'],
      completedLessons: ['y1-m01-l01'],
      completedModules: [],
      moduleProgress: {
        'y1-m01': {
          completedStages: ['watch', 'read', 'practice'],
          percentage: 43,
          updatedAt: new Date().toISOString(),
        },
        'y1-m02': {
          completedStages: ['watch'],
          percentage: 14,
          updatedAt: new Date().toISOString(),
        }
      },

      // Assessments & Sim history
      assessmentResults: [
        {
          id: 'mock-eval-1',
          date: '2026-11-20',
          title: 'Workshop Safety & Metrology Basics',
          loId: 'LO-01',
          score: 85,
          totalQuestions: 10,
          correctAnswers: 8,
          timeSpentSeconds: 240,
        }
      ],
      labAttempts: [
        {
          id: 'mock-lab-1',
          date: '2026-11-22',
          simulationId: 'conventional-lathe',
          simulationTitle: 'Component Identification & Spindle Setup',
          completed: true,
          score: 100,
          xpEarned: 50,
        }
      ],
      missionProgress: {
        'mission-safety-rules': { completed: true, xpEarned: 25 },
        'mission-identify-parts': { completed: true, xpEarned: 50 },
        'mission-first-facing': { completed: false, current: 0, target: 1 }
      },
      badges: [
        {
          id: 'safety_first',
          title: 'Safety Pioneer',
          titleHi: 'सुरक्षा प्रणेता',
          description: 'Understood workshop PPE & safety rules',
          icon: 'ShieldCheck',
          unlockedAt: '2026-11-20',
        },
        {
          id: 'spindle_master',
          title: 'Spindle Ready',
          titleHi: 'स्पिंडल रेडी',
          description: 'Identified core lathe components without error',
          icon: 'Cog',
          unlockedAt: '2026-11-22',
        }
      ],
      history: [
        {
          id: 'hist-1',
          date: '2026-11-22',
          action: 'Completed Lathe Component Identification',
          xpEarned: 50,
        },
        {
          id: 'hist-2',
          date: '2026-11-20',
          action: 'Passed Workshop Safety Quiz with 85%',
          xpEarned: 70,
        }
      ],

      // Actions
      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        get().setTheme(next);
      },

      setLanguage: (language) => set({ language }),

      toggleLanguage: () => {
        const next = get().language === 'en' ? 'hi' : 'en';
        set({ language: next });
      },

      addXP: (amount, reason) => {
        const newXP = get().xp + amount;
        const newEntry = {
          id: `hist-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          action: reason || `Earned ${amount} XP`,
          xpEarned: amount,
        };
        set({
          xp: newXP,
          history: [newEntry, ...get().history],
        });
      },

      updateStageProgress: (moduleId, stageKey, isCompleted) => {
        const progress = { ...(get().moduleProgress || {}) };
        const current = progress[moduleId] || { completedStages: [], percentage: 0 };
        let stages = new Set(current.completedStages || []);

        if (isCompleted) {
          stages.add(stageKey);
        } else {
          stages.delete(stageKey);
        }

        const stagesArray = Array.from(stages);
        const percentage = Math.round((stagesArray.length / 7) * 100);

        progress[moduleId] = {
          completedStages: stagesArray,
          percentage,
          updatedAt: new Date().toISOString(),
        };

        const completedModules = new Set(get().completedModules);
        if (percentage >= 100) {
          completedModules.add(moduleId);
        } else {
          completedModules.delete(moduleId);
        }

        set({
          moduleProgress: progress,
          completedModules: Array.from(completedModules),
        });
      },

      completeLesson: (lessonId) => {
        const setLessons = new Set(get().completedLessons);
        setLessons.add(lessonId);
        set({ completedLessons: Array.from(setLessons) });
      },

      recordAssessmentResult: (result) => {
        const results = [result, ...get().assessmentResults];
        const newLOs = new Set(get().completedLOs);
        if (result.loId && result.score >= 70) {
          newLOs.add(result.loId);
        }
        set({
          assessmentResults: results,
          completedLOs: Array.from(newLOs),
        });
      },

      recordLabAttempt: (attempt) => {
        set({
          labAttempts: [attempt, ...get().labAttempts],
        });
      },

      resetProgress: () => {
        set({
          xp: 0,
          completedLOs: [],
          completedLessons: [],
          completedModules: [],
          moduleProgress: {},
          assessmentResults: [],
          labAttempts: [],
          missionProgress: {},
          history: [],
        });
      },
    }),
    {
      name: 'turner-skilllab-student-store',
      partialize: (state) => ({
        profile: state.profile,
        xp: state.xp,
        streak: state.streak,
        language: state.language,
        theme: state.theme,
        completedLOs: state.completedLOs,
        completedLessons: state.completedLessons,
        completedModules: state.completedModules,
        moduleProgress: state.moduleProgress,
        assessmentResults: state.assessmentResults,
        labAttempts: state.labAttempts,
        missionProgress: state.missionProgress,
        badges: state.badges,
        history: state.history,
      }),
    }
  )
);
