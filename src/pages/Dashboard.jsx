import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Box,
  Target,
  FileCheck2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Play,
  Flame,
  Award,
  Lock,
  CheckCircle2,
  Compass,
  Layers,
  Wrench,
  Clock,
  Terminal,
  BookA,
  Cog
} from 'lucide-react';
import { useStudentStore, calculateRank } from '../store/useStudentStore';
import { YEAR_1_MODULES } from '../data/year1Modules';
import { YEAR_2_MODULES } from '../data/year2Modules';
import { ALL_BADGES } from '../data/badges';

export default function Dashboard() {
  const {
    profile,
    xp,
    streak,
    language,
    moduleProgress,
    completedModules,
    completedLOs,
    labAttempts,
    badges,
    history
  } = useStudentStore();

  const rank = calculateRank(xp);

  // Compute XP progress to next rank
  const rankTiers = [
    { title: 'Apprentice Turner', maxXP: 250 },
    { title: 'Trainee Machinist', maxXP: 600 },
    { title: 'Skilled Turner', maxXP: 1200 },
    { title: 'Expert Machinist', maxXP: 2000 },
    { title: 'Master Turner', maxXP: 3000 },
  ];
  const currentTier = rankTiers.find((t) => xp < t.maxXP) || rankTiers[rankTiers.length - 1];
  const nextRankTarget = currentTier.maxXP;
  const xpProgressPercent = Math.min(100, Math.round((xp / nextRankTarget) * 100));

  // Compute Year 1 & 2 progress
  const y1Count = YEAR_1_MODULES.length;
  const y2Count = YEAR_2_MODULES.length;

  const y1CompletedCount = YEAR_1_MODULES.filter((m) =>
    completedModules.includes(m.id) || (moduleProgress[m.id]?.percentage >= 100)
  ).length;

  const y2CompletedCount = YEAR_2_MODULES.filter((m) =>
    completedModules.includes(m.id) || (moduleProgress[m.id]?.percentage >= 100)
  ).length;

  const y1AvgProgress = Math.round(
    YEAR_1_MODULES.reduce((acc, m) => acc + (moduleProgress[m.id]?.percentage || 0), 0) / y1Count
  );

  const y2AvgProgress = Math.round(
    YEAR_2_MODULES.reduce((acc, m) => acc + (moduleProgress[m.id]?.percentage || 0), 0) / y2Count
  );

  // Find currently active module
  const activeModule = YEAR_1_MODULES[0];
  const activeProg = moduleProgress[activeModule.id] || { completedStages: [], percentage: 0 };
  const stagesOrder = ['watch', 'read', 'practice', 'simulate', 'quiz', 'apply', 'review'];
  const nextStage = stagesOrder.find((s) => !activeProg.completedStages?.includes(s)) || 'review';

  return (
    <div className="space-y-8">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 sm:p-8 lg:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white border border-white/20 shadow-sm">
              <span className="text-base leading-none">{rank.badge}</span>
              <span>{language === 'hi' ? rank.titleHi : rank.title}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-xs font-bold text-amber-200 border border-amber-300/30">
              <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
              <span>{streak} {language === 'hi' ? 'दिनों की स्ट्रीक' : 'Days Streak'}</span>
            </span>

            <span className="text-xs font-semibold text-blue-100 hidden sm:inline-block">
              {profile.institute} • Year {profile.year}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {language === 'hi'
              ? `नमस्ते, ${profile.name}! कार्यशाला में आपका स्वागत है`
              : `Welcome to the Workshop, ${profile.name}!`}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
            {language === 'hi'
              ? 'टर्नर ट्रेड (CTS 2.0 / NSQF लेवल 4) के अनुसार खराद सेटअप, फेसिंग, प्लेन टर्निंग, बोरिंग, चूड़ी काटना और सीएनसी जी-कोड सिमुलेशन का अभ्यास करें।'
              : 'Master conventional turning and CNC programming with interactive 3D simulations mapped to the official DGT CTS 2.0 curriculum.'}
          </p>

          {/* XP Progress towards Next Rank */}
          <div className="mt-5 max-w-md bg-black/20 backdrop-blur-sm rounded-2xl p-3.5 border border-white/15">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-blue-100">
                {language === 'hi' ? 'अगला रैंक स्तर' : 'Next Rank Milestone'}: {currentTier.title}
              </span>
              <span className="text-amber-300 font-bold">{xp} / {nextRankTarget} XP</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-500"
                style={{ width: `${xpProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to={`/modules/${activeModule.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Play className="w-4 h-4 fill-blue-700 text-blue-700" />
              <span>{language === 'hi' ? 'सीखना जारी रखें' : 'Continue Learning'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/virtual-labs/conventional-lathe"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900/50 hover:bg-blue-900/80 text-white font-semibold text-sm transition-all border border-white/20 shadow-sm"
            >
              <Box className="w-4 h-4 text-blue-300" />
              <span>{language === 'hi' ? '3D खराद सिमुलेटर' : '3D Lathe Simulator'}</span>
            </Link>

            <Link
              to="/missions"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/10"
            >
              <Target className="w-4 h-4 text-amber-300" />
              <span>{language === 'hi' ? 'व्यापार मिशन' : 'Trade Missions'}</span>
            </Link>
          </div>
        </div>

        {/* Decorative graphic background */}
        <div className="absolute -right-12 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-6 text-white/10 hidden lg:block pointer-events-none">
          <Cog className="w-48 h-48 animate-spin-slow" />
        </div>
      </div>

      {/* 2. STATS & METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* XP Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">
            <span>{language === 'hi' ? 'कुल अर्जित XP' : 'Total XP Earned'}</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-500">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{xp}</div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{history[0]?.xpEarned || 25} XP</span>
            <span>{language === 'hi' ? 'हालिया गतिविधि से' : 'from latest activity'}</span>
          </p>
        </div>

        {/* Modules Progress Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">
            <span>{language === 'hi' ? 'पूर्ण मॉड्यूल्स' : 'Modules Progress'}</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {y1CompletedCount + y2CompletedCount} <span className="text-base font-normal text-slate-400">/ 21</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {YEAR_1_MODULES.length} Foundation • {YEAR_2_MODULES.length} Advanced
          </p>
        </div>

        {/* Virtual Labs Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">
            <span>{language === 'hi' ? '3D वर्चुअल लैब्स' : 'Virtual Labs Attempted'}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Box className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {labAttempts.length} <span className="text-base font-normal text-slate-400">/ 10</span>
          </div>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            Lathe Sim: 100% Score
          </p>
        </div>

        {/* LOs Mastered Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">
            <span>{language === 'hi' ? 'सीखने के परिणाम (LO)' : 'LOs Mastered'}</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {completedLOs.length} <span className="text-base font-normal text-slate-400">/ 21</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            DGT CTS 2.0 NSQF-4
          </p>
        </div>
      </div>

      {/* 3. CONTINUE LEARNING / ACTIVE MODULE CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                {language === 'hi' ? 'वर्तमान मॉड्यूल' : 'In Progress'}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Year 1 • LO-01
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? activeModule.titleHi : activeModule.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              {language === 'hi' ? activeModule.descriptionHi : activeModule.description}
            </p>
          </div>

          <Link
            to={`/modules/${activeModule.id}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm shrink-0"
          >
            <span>{language === 'hi' ? `जारी रखें: ${nextStage.toUpperCase()}` : `Resume Stage: ${nextStage.toUpperCase()}`}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 7-Stage Tracker Visualization */}
        <div className="pt-5">
          <div className="flex items-center justify-between text-xs font-semibold mb-3">
            <span className="text-slate-600 dark:text-slate-300">
              {language === 'hi' ? '7-चरणीय सीखने का मार्ग' : '7-Stage Learning Path'}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {activeProg.percentage}% {language === 'hi' ? 'पूर्ण' : 'Completed'}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[
              { key: 'watch', label: 'Watch' },
              { key: 'read', label: 'Read' },
              { key: 'practice', label: 'Practice' },
              { key: 'simulate', label: 'Simulate' },
              { key: 'quiz', label: 'Quiz' },
              { key: 'apply', label: 'Apply' },
              { key: 'review', label: 'Review' },
            ].map((st, i) => {
              const isDone = activeProg.completedStages?.includes(st.key);
              const isCurrent = nextStage === st.key;

              return (
                <div key={st.key} className="flex flex-col items-center">
                  <div
                    className={`w-full h-2 rounded-full mb-1.5 transition-all ${
                      isDone
                        ? 'bg-emerald-500'
                        : isCurrent
                        ? 'bg-blue-600 animate-pulse'
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                  />
                  <span
                    className={`text-[10px] truncate max-w-full font-semibold ${
                      isDone
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : isCurrent
                        ? 'text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. YEAR 1 & YEAR 2 CURRICULUM OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Year 1 Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
                Year 1 • Foundation
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                11 Modules • LO-01 to LO-11
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'वर्ष 1: पारंपरिक खराद एवं फिटिंग' : 'Year 1: Conventional Turning'}
            </h3>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'कार्यशाला सुरक्षा, खराद मशीन संरचना, टूल ज्यामिति, फेसिंग, प्लेन टर्निंग, टेपर टर्निंग, बोरिंग और थ्रेड कटिंग।'
                : 'Safety fundamentals, lathe setup, cutting tools, facing, plain turning, alignment, taper turning, boring, and thread cutting.'}
            </p>

            {/* Core Operation tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Workshop Safety', 'Lathe Setup', 'Facing', 'Plain Turning', 'Taper Turning', 'Boring', 'Threading'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold mb-2 text-slate-600 dark:text-slate-300">
              <span>{language === 'hi' ? 'वर्ष 1 प्रगति' : 'Year 1 Progress'}</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">{y1AvgProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${y1AvgProgress}%` }}
              />
            </div>
            <Link
              to="/modules/year-1"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
            >
              <span>{language === 'hi' ? 'वर्ष 1 के सभी 11 मॉड्यूल्स देखें' : 'View all 11 Year 1 Modules'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Year 2 Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                Year 2 • Advanced & CNC
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                10 Modules • LO-12 to LO-21
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'वर्ष 2: उन्नत टर्निंग एवं सीएनसी मशीनिंग' : 'Year 2: Advanced Turning & CNC'}
            </h3>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'परिशुद्ध टॉलरेंस, 4-जॉ चक में अनियमित जॉब्स, सीएनसी टर्निंग केंद्र, फानुक जी-कोड प्रोग्रामिंग और टूल ऑफसेट्स।'
                : 'Precision tolerances, irregular workpiece balancing, attachments, CNC turning centre operation, Fanuc G-codes, and tool offsets.'}
            </p>

            {/* Core CNC tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Precision Turning', 'Irregular Jobs', 'Attachments', 'CNC Turning', 'Fanuc G-Code', 'Tool Offsets'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold mb-2 text-slate-600 dark:text-slate-300">
              <span>{language === 'hi' ? 'वर्ष 2 प्रगति' : 'Year 2 Progress'}</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{y2AvgProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{ width: `${y2AvgProgress}%` }}
              />
            </div>
            <Link
              to="/modules/year-2"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
            >
              <span>{language === 'hi' ? 'वर्ष 2 के सभी 10 मॉड्यूल्स देखें' : 'View all 10 Year 2 Modules'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. QUICK ACTIONS STRIP */}
      <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 px-1">
          {language === 'hi' ? 'त्वरित कार्यशाला क्रियाएं' : 'Quick Workshop Actions'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/virtual-labs/conventional-lathe"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {language === 'hi' ? 'पारंपरिक खराद' : 'Conventional Lathe'}
              </div>
              <div className="text-[10px] text-slate-500 truncate">3D Virtual Simulator</div>
            </div>
          </Link>

          <Link
            to="/virtual-labs/cnc-lathe"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {language === 'hi' ? 'सीएनसी सिम्युलेटर' : 'CNC Lathe Sim'}
              </div>
              <div className="text-[10px] text-slate-500 truncate">Fanuc G-Code Editor</div>
            </div>
          </Link>

          <Link
            to="/assessments"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {language === 'hi' ? 'व्यापार क्विज' : 'Trade Quiz'}
              </div>
              <div className="text-[10px] text-slate-500 truncate">LO Assessment Tests</div>
            </div>
          </Link>

          <Link
            to="/glossary"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 transition-all group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BookA className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {language === 'hi' ? 'तकनीकी शब्दावली' : 'Turner Glossary'}
              </div>
              <div className="text-[10px] text-slate-500 truncate">40+ Bilingual Terms</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 6. ACHIEVEMENTS & BADGES SECTION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>{language === 'hi' ? 'व्यापार उपलब्धियां और बैज' : 'Trade Badges & Achievements'}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Earn badges by mastering machine components, precision turning tolerances, and CNC codes.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg">
            {badges.length} / {ALL_BADGES.length} {language === 'hi' ? 'अनलॉक' : 'Unlocked'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {ALL_BADGES.map((badgeItem) => {
            const isUnlocked = badges.some((b) => b.id === badgeItem.id);

            return (
              <div
                key={badgeItem.id}
                className={`relative flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'border-amber-300 dark:border-amber-700/60 bg-amber-50/40 dark:bg-amber-950/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 opacity-70'
                }`}
                title={isUnlocked ? 'Unlocked!' : `Requires ${badgeItem.xpRequirement} XP`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg mb-2 shadow-sm ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-amber-500 to-amber-300 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isUnlocked ? (
                    <Award className="w-5 h-5 text-white" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400" />
                  )}
                </div>

                <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {language === 'hi' ? badgeItem.titleHi : badgeItem.title}
                </span>

                <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                  {language === 'hi' ? badgeItem.descriptionHi : badgeItem.description}
                </span>

                {isUnlocked ? (
                  <span className="mt-2 text-[9px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="mt-2 text-[9px] font-medium text-slate-400">
                    {badgeItem.xpRequirement} XP
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. RECENT ACTIVITY & LEARNING HISTORY */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <span>{language === 'hi' ? 'हालिया कार्यशाला गतिविधि' : 'Recent Learning Activity'}</span>
        </h3>

        {history && history.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {history.slice(0, 5).map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.action}
                    </p>
                    <p className="text-[11px] text-slate-400">{item.date}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-bold text-[11px]">
                  +{item.xpEarned} XP
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4 text-center">
            {language === 'hi' ? 'कोई हालिया गतिविधि नहीं।' : 'No activity logged yet. Start a lesson to earn XP!'}
          </p>
        )}
      </div>
    </div>
  );
}
