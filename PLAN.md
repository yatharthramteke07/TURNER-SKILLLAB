# Turner SkillLab - Implementation Plan

Turner SkillLab is a browser-based learning and 3D virtual simulation platform for ITI Turner Trade students (DGT CTS 2.0, NSQF Level 4).

## Tech Stack
- **Framework**: React 18 + Vite (JavaScript JSX, strictly no TypeScript)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **3D Engine**: Three.js, @react-three/fiber, @react-three/drei (lazy loaded with Suspense)
- **State Management**: Zustand (with `persist` middleware for student store)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Code Editor**: @monaco-editor/react
- **Charts**: Recharts

---

## Assumptions
1. Single-page frontend application with no backend; all data stored locally with Zustand + `localStorage`.
2. Responsive layout: Desktop/laptop/tablet get full 3D interactive environments; mobile gets learning content and simplified simulation messages or reduced viewports.
3. Language toggle switches UI labels and glossary entries between English and Hindi. Lesson body content begins primarily in English with Hindi title/summary fields where applicable.
4. Lathe 3D models are generated with procedural Three.js primitives (Bed, Headstock, Chuck, Tailstock, Carriage, Cross slide, Compound rest, Tool post, Lead screw) with support for external GLB loading if placed in `/public/models/`.

---

## Phased Build Checklist

### Phase 1: Foundation & Project Setup
- [x] Vite + React 18 + Tailwind CSS setup
- [x] Project folder structure according to Section 4
- [x] Zustand stores skeleton (`useStudentStore.js` with persistence, `useSimulationStore.js`)
- [x] React Router DOM v6 setup with all required routes and lazy-loaded placeholders
- [x] Loading, empty, and error states for pages
- [x] `npm run dev` and `npm run build` validation

### Phase 2: Core Layout & Navigation
- [x] Responsive `Sidebar.jsx` (Dashboard, Modules, Virtual Labs, Missions, Assessments, Progress, Glossary)
- [x] Expand/collapse behavior on desktop + slide-over drawer on mobile
- [x] Active route highlighting (`blue-50` background, `blue-600` text)
- [x] `Topbar.jsx` with mobile toggle, XP indicator badge, Language selector (EN / HI), Dark/Light theme toggle, Student Profile
- [x] Global theme switcher (Tailwind dark class + store sync)
- [x] Global language state (EN / HI)
- [x] `MainLayout.jsx` wrapper with proper container padding and accessibility focus rings

### Phase 3: Dashboard Page
- [x] Student welcome banner with rank, XP, and streak
- [x] Quick actions (Continue Learning, Open Virtual Labs, Take Quiz)
- [x] Stats overview cards (Completed Modules, Virtual Labs done, Rank, Total XP)
- [x] Year 1 & Year 2 progress bars and breakdown
- [x] Recent learning history / recommended next step
- [x] Achievement badges showcase

### Phase 4: Curriculum Data & Modules Page
- [x] Seed official Year 1 curriculum data (11 LOs, modules 1-11)
- [x] Seed official Year 2 curriculum data (10 LOs, modules 12-21)
- [x] Fully seed content for first 2 modules of each year
- [x] Modules catalog page with Year 1 / Year 2 tab switching
- [x] Module cards showing number, title, description, LO tags, 7-stage indicators, and status

### Phase 5: Module Details & 7-Stage Lesson Experience
- [x] Module detail view (`/modules/:moduleId`) with 7-stage interactive stepper:
  - [x] Watch (video embed / placeholder)
  - [x] Read (rich theory content with headings & diagrams)
  - [x] Practice (guided interactive exercises: matching & fill-in)
  - [x] Simulate (direct jump to associated Virtual Lab)
  - [x] Quiz (module quiz with feedback)
  - [x] Apply (practical challenge / mission link)
  - [x] Review (score summary & feedback)
- [x] Lesson view (`/lessons/:lessonId`)
- [x] Stage progress tracking connected to `useStudentStore` (persisting %)

### Phase 6: Virtual Labs Catalogue & Lazy-Loading Setup
- [x] Virtual Labs catalogue (`/virtual-labs`) with 10 simulation cards
- [x] Filter by Year, Difficulty, Type (Conventional vs CNC)
- [x] "Coming Soon" states for stubs (Workpiece setting, Step/taper turning, Threading, etc.)
- [x] Active routes for Conventional Lathe & CNC Lathe with `React.lazy` and `Suspense` fallback

### Phase 7: Shared 3D Simulation Workspace
- [x] Dark industrial viewport (`slate-900`/`zinc-900`)
- [x] Shared R3F Canvas viewport with OrbitControls (pan, zoom, orbit, camera reset)
- [x] Left panel: Machine component tree / inspection & step-by-step guidance
- [x] Right panel: Parameter controls (spindle speed, feed, depth of cut, stock dimensions)
- [x] Bottom playback toolbar: Start, Pause, Resume, Reset, Speed slider, Step button
- [x] "Simplified graphics" toggle (lower pixel ratio, disabled shadows)
- [x] WebGL unavailable fallback

### Phase 8: Conventional Lathe Simulator (MVP)
- [x] Procedural 3D Lathe: Bed, Headstock, Spindle, Chuck, Tailstock, Carriage, Cross Slide, Compound Rest, Tool Post, Lead Screw
- [x] Component identification mode (hover/click inspection + quiz mode for XP)
- [x] Workpiece configuration (material, diameter, length) & 3-jaw / 4-jaw chuck mounting
- [x] Spindle rotation animation with visual RPM scaling
- [x] Tool carriage longitudinal & cross-slide controls
- [x] Facing and plain turning operations with dynamic workpiece profile mesh update
- [x] Real-time operation validation and safety warnings

### Phase 9: CNC Lathe Scene & Controller Panel
- [x] 3D CNC turning machine enclosure & coordinate axis representation
- [x] CNC industrial controller panel (status, mode, G54 coordinates readout, spindle RPM)
- [x] Chuck, stock, and turret positioning

### Phase 10: CNC G-Code Interpreter, Editor & Toolpath
- [x] Pure JS `GCodeInterpreter.js` (Fanuc-style turning subset: G00, G01, G02, G03, G20/G21, G28, G90/G91, G94/G95, G96/G97, M03, M04, M05, M06, M08, M09, M30)
- [x] Absolute vs incremental coordinate handling
- [x] Diameter (X) vs Length (Z) convention
- [x] Monaco G-code editor with line numbering and error markers
- [x] Toolpath generator & 3D visualizer (rapid dashed, feed solid)
- [x] Playback engine: Step-by-step execution, cycle time estimation
- [x] 3 Preloaded sample programs (facing, step turning, taper + radius)

### Phase 11: Missions & Assessment Engine
- [x] Missions page (`/missions`): Daily, weekly, and practical challenges with XP rewards
- [x] Assessment engine (`/assessments`):
  - [x] Difficulty filter (Easy, Medium, Hard)
  - [x] One-at-a-time question card with timer and question navigator
  - [x] 20+ seed questions across LOs
  - [x] Score summary, LO breakdown, revision recommendations, answer review
  - [x] XP awarding and badge unlocking

### Phase 12: Progress Analytics & Bilingual Glossary
- [x] Progress page (`/progress`):
  - [x] LO mastery trackers
  - [x] Recharts performance charts (quiz history, skill matrix)
  - [x] Rank & XP timeline
- [x] Glossary page (`/glossary`):
  - [x] 40+ Turner trade technical terms
  - [x] English & Hindi translations
  - [x] Category filters & search
  - [x] Formulas and units

### Phase 13: Testing, Optimization & Final Polish
- [x] Cross-browser validation and mobile responsiveness verification
- [x] Unit tests for G-code interpreter (12/12 passing)
- [x] Performance profiling & simplified graphics verification
- [x] Persistence verification across page reloads
- [x] WebGL-unavailable fallback testing
