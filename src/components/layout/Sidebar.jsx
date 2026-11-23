import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Box,
  Target,
  FileCheck2,
  BarChart3,
  BookA,
  ChevronLeft,
  ChevronRight,
  X,
  Disc3,
  Sparkles
} from 'lucide-react';
import { useStudentStore, calculateRank } from '../../store/useStudentStore';

export default function Sidebar({ isOpenMobile, onCloseMobile, isCollapsed, onToggleCollapse }) {
  const location = useLocation();
  const language = useStudentStore((state) => state.language);
  const xp = useStudentStore((state) => state.xp);
  const rank = calculateRank(xp);

  const navItems = [
    {
      to: '/dashboard',
      labelEn: 'Dashboard',
      labelHi: 'डैशबोर्ड',
      icon: LayoutDashboard,
    },
    {
      to: '/modules',
      labelEn: 'Modules',
      labelHi: 'मॉड्यूल्स',
      icon: BookOpen,
      matchPrefix: true,
    },
    {
      to: '/virtual-labs',
      labelEn: 'Virtual Labs',
      labelHi: 'वर्चुअल लैब्स',
      icon: Box,
      badge: '3D',
      matchPrefix: true,
    },
    {
      to: '/missions',
      labelEn: 'Missions',
      labelHi: 'मिशन',
      icon: Target,
    },
    {
      to: '/assessments',
      labelEn: 'Assessments',
      labelHi: 'मूल्यांकन',
      icon: FileCheck2,
    },
    {
      to: '/progress',
      labelEn: 'Progress',
      labelHi: 'प्रगति',
      icon: BarChart3,
    },
    {
      to: '/glossary',
      labelEn: 'Glossary',
      labelHi: 'शब्दावली',
      icon: BookA,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          onClick={onCloseMobile}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <Disc3 className="w-5 h-5 animate-spin-slow" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
                Turner <span className="text-blue-600 dark:text-blue-400">SkillLab</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                DGT CTS 2.0 • NSQF-4
              </span>
            </div>
          )}
        </NavLink>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-1 text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
          {!isCollapsed && (language === 'hi' ? 'मुख्य मेनू' : 'Main Menu')}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.matchPrefix
            ? location.pathname.startsWith(item.to)
            : location.pathname === item.to;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              title={isCollapsed ? (language === 'hi' ? item.labelHi : item.labelEn) : undefined}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform duration-150 group-hover:scale-110 ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                }`}
              />

              {!isCollapsed && (
                <span className="flex-1 truncate">
                  {language === 'hi' ? item.labelHi : item.labelEn}
                </span>
              )}

              {!isCollapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom status & collapse trigger */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        {!isCollapsed ? (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 mb-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>{language === 'hi' ? 'रैंक' : 'Trade Rank'}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'hi' ? rank.titleHi : rank.title}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {xp} XP
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Level 4</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-2" title={`${xp} XP • ${rank.title}`}>
            <span className="text-xl">{rank.badge}</span>
          </div>
        )}

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-full py-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <span className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'hi' ? 'छोटा करें' : 'Collapse Sidebar'}</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden md:block sticky top-0 h-screen z-30 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Slide-out drawer */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
