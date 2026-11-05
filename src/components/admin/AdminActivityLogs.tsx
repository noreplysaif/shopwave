import React from 'react';
import { History, Clock, ShieldCheck, User } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminActivityLogs: React.FC = () => {
  const { activityLogs } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          System Activity & Audit Logs
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Immutable trail of administrative operations, catalog alterations, and inventory adjustments.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {activityLogs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No activity logs recorded.
            </div>
          ) : (
            activityLogs.map((log) => (
              <div key={log.id} className="p-4 sm:p-5 flex items-start justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{log.action}</span>
                    <span className="text-[11px] text-[#168DE2] font-semibold">· {log.adminName}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    {log.details}
                  </p>
                </div>

                <div className="text-right text-[11px] text-slate-400 whitespace-nowrap shrink-0">
                  <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                  <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
