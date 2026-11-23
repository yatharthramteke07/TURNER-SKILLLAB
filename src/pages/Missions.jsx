import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  Zap,
  Flame
} from 'lucide-react';
import { TRADE_MISSIONS } from '../data/missions';
import { useStudentStore } from '../store/useStudentStore';

export default function Missions() {
  const language = useStudentStore((state) => state.language);
  const xp = useStudentStore((state) => state.xp);
  const addXP = useStudentStore((state) => state.addXP);

  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'daily' | 'weekly' | 'practical'
  const [missionList, setMissionList] = useState(TRADE_MISSIONS);

  const handleClaimReward = (missionId, xpReward) => {
    addXP(xpReward, `Claimed mission reward`);
    setMissionList((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, claimed: true } : m))
    );
  };

  const filteredMissions = missionList.filter((m) =>
    activeCategory === 'all' ? true : m.category === activeCategory
  );

  const completedCount = missionList.filter((m) => m.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'hi' ? 'व्यापार मिशन एवं चुनौतियां' : 'Trade Missions & Challenges'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Complete daily workshop drills and practical 3D milestones to earn XP and level up your trade rank.
          </p>
        </div>

        {/* Missions Completed Counter */}
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{completedCount} of {missionList.length} Finished</span>
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { key: 'all', label: language === 'hi' ? 'सभी मिशन' : 'All Missions' },
          { key: 'daily', label: language === 'hi' ? 'दैनिक मिशन' : 'Daily' },
          { key: 'weekly', label: language === 'hi' ? 'साप्ताहिक' : 'Weekly' },
          { key: 'practical', label: language === 'hi' ? 'व्यावहारिक' : 'Practical' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeCategory === tab.key
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.map((mission) => {
          const isDone = mission.completed;

          return (
            <div
              key={mission.id}
              className={`flex flex-col justify-between p-6 rounded-3xl border transition-all ${
                isDone
                  ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800/80 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      mission.category === 'daily'
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                        : mission.category === 'weekly'
                        ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                        : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {mission.category}
                  </span>

                  <span className="flex items-center gap-1 text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/50">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+{mission.xpReward} XP</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {isDone && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  <span>{language === 'hi' ? mission.titleHi : mission.title}</span>
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {language === 'hi' ? mission.descriptionHi : mission.description}
                </p>
              </div>

              {/* Mission Action / Status Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">
                    Progress: {mission.current} / {mission.target}
                  </span>
                </div>

                {isDone ? (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed</span>
                  </span>
                ) : (
                  <Link
                    to={mission.route}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                  >
                    <span>Start Mission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
