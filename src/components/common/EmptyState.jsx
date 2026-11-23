import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  title = 'No records found',
  description = 'There is currently no data to display in this section.',
  actionLabel,
  actionLink,
  onAction,
  icon: Icon = AlertCircle
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 my-4">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">{description}</p>
      {actionLabel && (
        actionLink ? (
          <Link
            to={actionLink}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : onAction ? (
          <button
            onClick={onAction}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : null
      )}
    </div>
  );
}
