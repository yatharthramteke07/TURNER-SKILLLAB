import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Sun,
  Moon,
  Flame,
  Award,
  ChevronDown,
  User,
  RotateCcw,
  BookOpen,
  GraduationCap,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useStudentStore, calculateRank } from '../../store/useStudentStore';

export default function Topbar({ onToggleMobileSidebar }) {
  const {
    profile,
    xp,
    streak,
    language,
    theme,
    toggleTheme,
    setLanguage,
    resetProgress
  } = useStudentStore();

  const rank = calculateRank(xp);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile hamburger & Context title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {language === 'hi' ? 'आईटीआई टर्नर प्रशिक्षण मंच' : 'ITI Turner Virtual Workshop'}
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Indicator */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 text-xs font-bold"
          title={`${streak} Day Learning Streak`}
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
          <span>{streak}d</span>
        </div>

        {/* XP & Rank pill */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-bold"
          title={`${rank.title} (${xp} Total XP)`}
        >
          <span className="text-sm">{rank.badge}</span>
          <span className="tracking-tight">{xp} XP</span>
        </div>

        {/* Language selector toggle */}
        <div className="inline-flex rounded-lg p-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
              language === 'en'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="English"
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
              language === 'hi'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="हिन्दी (Hindi)"
          >
            हिन्दी
          </button>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Profile Menu Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              AK
            </div>
            <span className="hidden lg:block text-xs font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
              {profile.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{profile.institute}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-1 rounded-lg">
                  <span>{rank.badge} {language === 'hi' ? rank.titleHi : rank.title}</span>
                  <span>Year {profile.year}</span>
                </div>
              </div>

              <div className="px-2 py-1.5 space-y-0.5 text-xs">
                <div className="px-3 py-2 text-slate-600 dark:text-slate-400 flex items-center justify-between">
                  <span>Roll No:</span>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{profile.rollNo}</span>
                </div>
                <div className="px-3 py-2 text-slate-600 dark:text-slate-400 flex items-center justify-between">
                  <span>Curriculum:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">DGT CTS 2.0</span>
                </div>
              </div>

              <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800 px-2">
                <button
                  onClick={() => {
                    if (window.confirm('Reset all course progress and XP back to initial state?')) {
                      resetProgress();
                      setProfileOpen(false);
                    }
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'प्रगति रीसेट करें' : 'Reset Progress & XP'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
