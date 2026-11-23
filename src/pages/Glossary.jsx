import React, { useState, useMemo } from 'react';
import { Search, BookA, Tag, Sparkles, X, Globe, Bookmark } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { useStudentStore } from '../store/useStudentStore';
import EmptyState from '../components/common/EmptyState';

export default function Glossary() {
  const language = useStudentStore((state) => state.language);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all', label: language === 'hi' ? 'सभी श्रेणियां' : 'All Categories' },
    { key: 'Lathe Machine', label: language === 'hi' ? 'खराद मशीन' : 'Lathe Machine' },
    { key: 'Operations', label: language === 'hi' ? 'ऑपरेशन्स' : 'Operations' },
    { key: 'Cutting Tools', label: language === 'hi' ? 'कटिंग टूल्स' : 'Cutting Tools' },
    { key: 'Metrology', label: language === 'hi' ? 'मापन एवं मेट्रोलॉजी' : 'Metrology' },
    { key: 'CNC Programming', label: language === 'hi' ? 'सीएनसी प्रोग्रामिंग' : 'CNC Programming' },
    { key: 'Threads', label: language === 'hi' ? 'थ्रेड्स' : 'Threads' },
    { key: 'Attachments', label: language === 'hi' ? 'अटैचमेंट्स' : 'Attachments' },
  ];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      // Search filter
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        (item.termHi && item.termHi.toLowerCase().includes(q)) ||
        item.definition.toLowerCase().includes(q) ||
        (item.definitionHi && item.definitionHi.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'hi' ? 'टर्नर तकनीकी शब्दावली' : 'Turner Technical Glossary'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Bilingual English & Hindi definitions of core turning, tooling, metrology, and CNC terms (CTS 2.0).
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5">
          <BookA className="w-4 h-4" />
          <span>{GLOSSARY_TERMS.length} Terms Documented</span>
        </span>
      </div>

      {/* Search Bar & Categories */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={
              language === 'hi'
                ? 'तकनीकी शब्द या परिभाषा खोजें (उदा. Headstock, Chuck, Feed, G01)...'
                : 'Search terms or definitions (e.g. Headstock, Chuck, Feed, Rake, G01)...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
                    {item.category}
                  </span>

                  {item.unit && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.unit}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{item.term}</span>
                </h3>

                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {item.termHi}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {language === 'hi' ? (item.definitionHi || item.definition) : item.definition}
                </p>
              </div>

              {/* Hindi Translation Sub-box if English is primary */}
              {language === 'en' && item.definitionHi && (
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-500">हिन्दी: </span>
                  <span>{item.definitionHi}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title={language === 'hi' ? 'कोई शब्द नहीं मिला' : 'No Glossary Terms Found'}
          description="No terms matched your search query. Try clearing the search or changing categories."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory('all');
          }}
        />
      )}
    </div>
  );
}
