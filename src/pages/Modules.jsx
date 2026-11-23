import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Box,
  Layers,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useStudentStore } from '../store/useStudentStore';
import { YEAR_1_MODULES } from '../data/year1Modules';
import { YEAR_2_MODULES } from '../data/year2Modules';
import ModuleCard from '../components/modules/ModuleCard';
import EmptyState from '../components/common/EmptyState';

export default function Modules() {
  const location = useLocation();
  const navigate = useNavigate();
  const language = useStudentStore((state) => state.language);
  const moduleProgress = useStudentStore((state) => state.moduleProgress || {});
  const completedModules = useStudentStore((state) => state.completedModules || []);

  // Determine active year tab: default to 1 unless URL says year-2
  const activeYear = location.pathname.includes('year-2') ? 2 : 1;

  const handleTabChange = (year) => {
    navigate(year === 2 ? '/modules/year-2' : '/modules/year-1');
  };

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'in-progress' | 'completed' | 'not-started'
  const [simOnlyFilter, setSimOnlyFilter] = useState(false);

  const currentYearModules = activeYear === 1 ? YEAR_1_MODULES : YEAR_2_MODULES;

  // Filter modules
  const filteredModules = useMemo(() => {
    return currentYearModules.filter((mod) => {
      // 1. Text search
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        mod.title.toLowerCase().includes(q) ||
        (mod.titleHi && mod.titleHi.toLowerCase().includes(q)) ||
        mod.description.toLowerCase().includes(q) ||
        mod.learningOutcomes.some((lo) => lo.toLowerCase().includes(q)) ||
        `module ${mod.number}`.includes(q) ||
        `m${mod.number}`.includes(q);

      if (!matchesSearch) return false;

      // 2. Status filter
      const prog = moduleProgress[mod.id]?.percentage || 0;
      const isCompleted = completedModules.includes(mod.id) || prog >= 100;
      const isInProgress = prog > 0 && !isCompleted;
      const isNotStarted = prog === 0 && !isCompleted;

      if (statusFilter === 'completed' && !isCompleted) return false;
      if (statusFilter === 'in-progress' && !isInProgress) return false;
      if (statusFilter === 'not-started' && !isNotStarted) return false;

      // 3. Sim filter
      if (simOnlyFilter && (!mod.simulations || mod.simulations.length === 0)) {
        return false;
      }

      return true;
    });
  }, [currentYearModules, searchTerm, statusFilter, simOnlyFilter, moduleProgress, completedModules]);

  // Compute Year Stats
  const totalCount = currentYearModules.length;
  const completedCount = currentYearModules.filter(
    (m) => completedModules.includes(m.id) || (moduleProgress[m.id]?.percentage >= 100)
  ).length;
  const inProgressCount = currentYearModules.filter((m) => {
    const p = moduleProgress[m.id]?.percentage || 0;
    return p > 0 && p < 100;
  }).length;
  const avgProgress = Math.round(
    currentYearModules.reduce((acc, m) => acc + (moduleProgress[m.id]?.percentage || 0), 0) / totalCount
  );

  return (
    <div className="space-y-6">
      {/* 1. Header & Year Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'hi' ? 'पाठ्यक्रम मॉड्यूल्स' : 'Turner Trade Modules'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official DGT CTS 2.0 • NSQF Level 4 • 21 Total Learning Outcomes
          </p>
        </div>

        {/* Year Tab Selector */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-inner">
          <button
            onClick={() => handleTabChange(1)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeYear === 1
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>{language === 'hi' ? 'वर्ष 1 (11 मॉड्यूल्स)' : 'Year 1: Foundation'}</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              11
            </span>
          </button>

          <button
            onClick={() => handleTabChange(2)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeYear === 2
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>{language === 'hi' ? 'वर्ष 2 (10 मॉड्यूल्स)' : 'Year 2: CNC Machining'}</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              10
            </span>
          </button>
        </div>
      </div>

      {/* 2. Year Summary Banner */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                  activeYear === 1
                    ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300'
                    : 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300'
                }`}
              >
                {activeYear === 1 ? 'Year 1 • LO-01 to LO-11' : 'Year 2 • LO-12 to LO-21'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {activeYear === 1 ? 'Conventional Turning & Fitting' : 'Precision Turning & CNC Turning Centres'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {activeYear === 1
                ? (language === 'hi' ? 'पारंपरिक खराद एवं फिटिंग मूल सिद्धांत' : 'Foundation: Conventional Lathe & Fitting')
                : (language === 'hi' ? 'उन्नत टर्निंग, अनियमित जॉब्स एवं सीएनसी मशीनिंग' : 'Advanced: Precision Machining & CNC Programming')}
            </h2>
          </div>

          <div className="flex items-center gap-5 sm:text-right">
            <div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {completedCount} <span className="text-sm font-medium text-slate-400">/ {totalCount}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {language === 'hi' ? 'मॉड्यूल्स पूर्ण' : 'Modules Completed'}
              </div>
            </div>

            <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 border-4 border-blue-500 flex items-center justify-center font-bold text-sm text-slate-900 dark:text-white shrink-0">
              {avgProgress}%
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={
              language === 'hi'
                ? 'मॉड्यूल नाम, विवरण या LO (उदा. LO-01, Chuck, Thread) खोजें...'
                : 'Search by module title, description, or LO (e.g. LO-02, Chuck, Thread)...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow"
          />
        </div>

        {/* Status Filter */}
        <div className="inline-flex rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 text-xs font-semibold">
          {[
            { key: 'all', label: language === 'hi' ? 'सभी' : 'All' },
            { key: 'in-progress', label: language === 'hi' ? 'प्रगति पर' : 'In Progress' },
            { key: 'completed', label: language === 'hi' ? 'पूर्ण' : 'Completed' },
            { key: 'not-started', label: language === 'hi' ? 'शुरू नहीं' : 'Not Started' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                statusFilter === item.key
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 3D Simulation Toggle */}
        <button
          onClick={() => setSimOnlyFilter(!simOnlyFilter)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
            simOnlyFilter
              ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-400 text-emerald-700 dark:text-emerald-300'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>{language === 'hi' ? 'केवल 3D सिमुलेशन' : 'Has 3D Lab'}</span>
        </button>
      </div>

      {/* 4. Modules Grid */}
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={language === 'hi' ? 'कोई मॉड्यूल नहीं मिला' : 'No Modules Found'}
          description={
            language === 'hi'
              ? 'आपके खोज या फ़िल्टर मानदंडों से मेल खाने वाला कोई मॉड्यूल नहीं है। कृपया फ़िल्टर रीसेट करें।'
              : 'No modules matched your search query or filter selection. Try clearing your filters.'
          }
          actionLabel={language === 'hi' ? 'फ़िल्टर साफ़ करें' : 'Clear Filters'}
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('all');
            setSimOnlyFilter(false);
          }}
        />
      )}
    </div>
  );
}
