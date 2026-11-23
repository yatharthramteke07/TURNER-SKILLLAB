import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import {
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock,
  BookOpen,
  Box,
  Flame,
  FileCheck2
} from 'lucide-react';
import { useStudentStore, calculateRank } from '../store/useStudentStore';
import { YEAR_1_MODULES } from '../data/year1Modules';
import { YEAR_2_MODULES } from '../data/year2Modules';

export default function Progress() {
  const {
    profile,
    xp,
    streak,
    completedLOs,
    completedModules,
    moduleProgress,
    assessmentResults,
    labAttempts,
    history,
    language
  } = useStudentStore();

  const rank = calculateRank(xp);

  // All 21 official LOs
  const allLOs = [
    { id: 'LO-01', title: 'Basic fitting operations and dimensional accuracy', year: 1 },
    { id: 'LO-02', title: 'Conventional lathe setup, chucks and workpiece setting', year: 1 },
    { id: 'LO-03', title: 'Cutting tool preparation and turning operations', year: 1 },
    { id: 'LO-04', title: 'Lathe alignment and tool-post adjustment', year: 1 },
    { id: 'LO-05', title: 'Taper and angular turning', year: 1 },
    { id: 'LO-06', title: 'Boring operations', year: 1 },
    { id: 'LO-07', title: 'Thread cutting and threaded components', year: 1 },
    { id: 'LO-08', title: 'Lathe accessories and machining operations', year: 1 },
    { id: 'LO-09', title: 'Lathe and grinding machine maintenance', year: 1 },
    { id: 'LO-10', title: 'Engineering drawing', year: 1 },
    { id: 'LO-11', title: 'Basic mathematics and engineering science', year: 1 },
    { id: 'LO-12', title: 'Precision engineering components and advanced turning', year: 2 },
    { id: 'LO-13', title: 'Machining irregular-shaped jobs using lathe accessories', year: 2 },
    { id: 'LO-14', title: 'Utility components using lathe attachments', year: 2 },
    { id: 'LO-15', title: 'Advanced boring operations and component assembly', year: 2 },
    { id: 'LO-16', title: 'Complex threaded components and calculations', year: 2 },
    { id: 'LO-17', title: 'CNC turning centre setup and part programming', year: 2 },
    { id: 'LO-18', title: 'Manufacturing and assembly of utility items', year: 2 },
    { id: 'LO-19', title: 'Special lathe operations and precision machining', year: 2 },
    { id: 'LO-20', title: 'Engineering drawing', year: 2 },
    { id: 'LO-21', title: 'Basic mathematics and engineering science', year: 2 },
  ];

  // Recharts Chart Data: Assessment history
  const chartData = assessmentResults && assessmentResults.length > 0
    ? assessmentResults.slice().reverse().map((r, i) => ({
        name: `Test ${i + 1}`,
        score: r.score,
        date: r.date,
      }))
    : [
        { name: 'Initial Quiz', score: 85, date: 'Nov 20' },
        { name: 'Safety Eval', score: 90, date: 'Nov 22' },
        { name: 'Lathe Setup', score: 100, date: 'Nov 23' },
      ];

  // Recharts Chart Data: Curriculum completion
  const curriculumData = [
    { name: 'Year 1: Foundation', completed: 2, total: 11 },
    { name: 'Year 2: CNC Machining', completed: 0, total: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'hi' ? 'सीखने की प्रगति एवं मेट्रिक्स' : 'Student Learning Progress & Analytics'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official DGT CTS 2.0 • NSQF Level 4 Competency Mastery
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5">
            <span className="text-base">{rank.badge}</span>
            <span>{rank.title}</span>
          </span>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Total XP</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {xp}
          </div>
          <p className="text-xs text-amber-500 font-bold mt-1">🔥 {streak} Day Streak</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">LOs Mastered</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {completedLOs.length} <span className="text-sm font-normal text-slate-400">/ 21</span>
          </div>
          <p className="text-xs text-emerald-500 font-semibold mt-1">Official Outcomes</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Modules Completed</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {completedModules.length} <span className="text-sm font-normal text-slate-400">/ 21</span>
          </div>
          <p className="text-xs text-blue-500 font-semibold mt-1">Year 1 & 2</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">3D Lab Attempts</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {labAttempts.length}
          </div>
          <p className="text-xs text-indigo-500 font-semibold mt-1">Virtual Simulations</p>
        </div>
      </div>

      {/* Visual Analytics Charts with Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assessment Score Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span>Assessment Score History (%)</span>
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Exam performance trends across evaluated trade topics.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '1rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#3b82f6' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Curriculum Progress Breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Curriculum Modules Breakdown</span>
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Comparison between Year 1 Foundation and Year 2 CNC.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={curriculumData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 12]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '1rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="total" fill="#334155" radius={[8, 8, 0, 0]} name="Total Modules" />
                <Bar dataKey="completed" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Completed Modules" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Official 21 Learning Outcomes (LO) Matrix */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Official DGT Learning Outcome Competency Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Mapped against NSQF Level 4 Turner Syllabus standards.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-xl">
            {completedLOs.length} / 21 Mastered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {allLOs.map((lo) => {
            const isMastered = completedLOs.includes(lo.id);

            return (
              <div
                key={lo.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  isMastered
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-80'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isMastered
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {isMastered ? <CheckCircle2 className="w-4 h-4" /> : lo.id.replace('LO-', '')}
                </div>

                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {lo.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      (Year {lo.year})
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {lo.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
