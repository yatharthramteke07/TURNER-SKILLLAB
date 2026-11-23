import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Terminal,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  X
} from 'lucide-react';
import { SIMULATION_CATALOGUE } from '../data/simulations';
import { useStudentStore } from '../store/useStudentStore';
import EmptyState from '../components/common/EmptyState';

export default function VirtualLabs() {
  const language = useStudentStore((state) => state.language);
  const labAttempts = useStudentStore((state) => state.labAttempts || []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'Conventional' | 'CNC'
  const [selectedYear, setSelectedYear] = useState('all'); // 'all' | 1 | 2
  const [activeStubModal, setActiveStubModal] = useState(null);

  const filteredLabs = useMemo(() => {
    return SIMULATION_CATALOGUE.filter((lab) => {
      // 1. Text search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lab.title.toLowerCase().includes(q) ||
        (lab.titleHi && lab.titleHi.toLowerCase().includes(q)) ||
        lab.description.toLowerCase().includes(q) ||
        lab.learningOutcomes.some((lo) => lo.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // 2. Type filter
      if (selectedType !== 'all' && lab.type !== selectedType) return false;

      // 3. Year filter
      if (selectedYear !== 'all' && lab.year !== Number(selectedYear)) return false;

      return true;
    });
  }, [searchQuery, selectedType, selectedYear]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'hi' ? '3D वर्चुअल लैब्स कैटलॉग' : '3D Virtual Labs Catalogue'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Hands-on machine operations with real-time 3D simulation, parameter controls, and safety diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5">
            <Box className="w-4 h-4" />
            <span>10 Simulation Labs</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={
              language === 'hi'
                ? 'सिम्युलेटर नाम या LO (उदा. Lathe, CNC, Facing) खोजें...'
                : 'Search simulators or LO (e.g. Lathe, CNC, Facing, Boring)...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Machine Type Filter */}
        <div className="inline-flex rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 text-xs font-semibold">
          {[
            { key: 'all', label: language === 'hi' ? 'सभी प्रकार' : 'All Types' },
            { key: 'Conventional', label: language === 'hi' ? 'पारंपरिक खराद' : 'Conventional' },
            { key: 'CNC', label: language === 'hi' ? 'सीएनसी टर्निंग' : 'CNC' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedType(item.key)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedType === item.key
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Year Filter */}
        <div className="inline-flex rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 text-xs font-semibold">
          {[
            { key: 'all', label: language === 'hi' ? 'सभी वर्ष' : 'All Years' },
            { key: '1', label: 'Year 1' },
            { key: '2', label: 'Year 2' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedYear(item.key)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedYear === item.key
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalogue Cards Grid */}
      {filteredLabs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLabs.map((lab) => {
            const isCNC = lab.type === 'CNC';
            const hasAttempted = labAttempts.some((a) => a.simulationId === lab.id);

            return (
              <div
                key={lab.id}
                className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        isCNC
                          ? 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300'
                          : 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      Year {lab.year} • {lab.type}
                    </span>

                    {lab.learningOutcomes?.map((lo) => (
                      <span
                        key={lo}
                        className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {lo}
                      </span>
                    ))}
                  </div>

                  <span className="text-[11px] font-medium text-slate-400">
                    {lab.difficulty}
                  </span>
                </div>

                {/* Lab Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {language === 'hi' ? lab.titleHi : lab.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                  {language === 'hi' ? lab.descriptionHi : lab.description}
                </p>

                {/* Footer Controls */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs">
                    {lab.isStub ? (
                      <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                        Modular Activity
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Fully Interactive
                      </span>
                    )}
                  </div>

                  {lab.isStub ? (
                    <button
                      onClick={() => setActiveStubModal(lab)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Link
                      to={lab.route}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                    >
                      <span>Launch 3D Lab</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={language === 'hi' ? 'कोई सिमुलेशन नहीं मिला' : 'No Virtual Labs Found'}
          description="No simulators matched your current filters. Try resetting search or type filter."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedType('all');
            setSelectedYear('all');
          }}
        />
      )}

      {/* Modal for Stub Simulations */}
      {activeStubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveStubModal(null)}
              className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                Year {activeStubModal.year} • {activeStubModal.type}
              </span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {activeStubModal.badge}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {activeStubModal.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              {activeStubModal.description}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-2 mb-6">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Curriculum Integration:
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                This operation is integrated into our master Conventional Lathe Simulator workspace. You can practice workpiece mounting, spindle controls, facing, and plain turning directly inside the full 3D environment.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveStubModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>

              <Link
                to="/virtual-labs/conventional-lathe"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                <span>Open in Lathe Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
