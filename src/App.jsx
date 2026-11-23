import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy-loaded pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Modules = lazy(() => import('./pages/Modules'));
const ModuleDetails = lazy(() => import('./pages/ModuleDetails'));
const Lesson = lazy(() => import('./pages/Lesson'));
const VirtualLabs = lazy(() => import('./pages/VirtualLabs'));
const Missions = lazy(() => import('./pages/Missions'));
const Assessments = lazy(() => import('./pages/Assessments'));
const Progress = lazy(() => import('./pages/Progress'));
const Glossary = lazy(() => import('./pages/Glossary'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy-loaded 3D simulation suites
const LatheSimulator = lazy(() => import('./simulations/conventional-lathe/LatheSimulator'));
const CNCSimulator = lazy(() => import('./simulations/cnc-lathe/CNCSimulator'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Default route redirect to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Dashboard..." />}>
              <Dashboard />
            </Suspense>
          }
        />

        {/* Modules & Lessons */}
        <Route
          path="modules"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Curriculum Modules..." />}>
              <Modules />
            </Suspense>
          }
        />
        <Route
          path="modules/year-1"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Year 1 Modules..." />}>
              <Modules />
            </Suspense>
          }
        />
        <Route
          path="modules/year-2"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Year 2 Modules..." />}>
              <Modules />
            </Suspense>
          }
        />
        <Route
          path="modules/:moduleId"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Module Details..." />}>
              <ModuleDetails />
            </Suspense>
          }
        />
        <Route
          path="lessons/:lessonId"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Lesson..." />}>
              <Lesson />
            </Suspense>
          }
        />

        {/* Virtual Labs Catalogue */}
        <Route
          path="virtual-labs"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Virtual Labs..." />}>
              <VirtualLabs />
            </Suspense>
          }
        />

        {/* 3D Simulations */}
        <Route
          path="virtual-labs/conventional-lathe"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Initializing 3D Lathe Environment..." />}>
              <LatheSimulator />
            </Suspense>
          }
        />
        <Route
          path="virtual-labs/cnc-lathe"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Initializing CNC Turning Simulator..." />}>
              <CNCSimulator />
            </Suspense>
          }
        />

        {/* Missions & Gamification */}
        <Route
          path="missions"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Missions..." />}>
              <Missions />
            </Suspense>
          }
        />

        {/* Assessments */}
        <Route
          path="assessments"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Assessments..." />}>
              <Assessments />
            </Suspense>
          }
        />

        {/* Progress */}
        <Route
          path="progress"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Progress Analytics..." />}>
              <Progress />
            </Suspense>
          }
        />

        {/* Glossary */}
        <Route
          path="glossary"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading Technical Glossary..." />}>
              <Glossary />
            </Suspense>
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingSpinner fullPage message="Loading..." />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
