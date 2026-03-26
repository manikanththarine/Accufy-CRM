import React from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, ListFilter, Settings2, CheckSquare, Calendar, Building2, Briefcase } from 'lucide-react';

export default function Tasks() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-900">Tasks</h1>
          <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
            <button className="px-3 py-1 text-sm font-medium bg-slate-100 text-slate-900 rounded shadow-sm">
              All
            </button>
            <button className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white gap-1">
            <Plus className="w-3 h-3" />
            Create task
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 h-7 text-xs border-slate-200 bg-transparent hover:bg-slate-100 text-slate-500">
            <ListFilter className="w-3 h-3" />
            Filter
          </Button>
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 border border-slate-200">
            <span className="text-slate-400">Status</span>
            <span>is any of</span>
            <span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800">2 values</span>
          </div>
        </div>
        <Button variant="outline" className="gap-2 h-7 text-xs border-slate-200 bg-transparent hover:bg-slate-100 text-slate-500">
          <Settings2 className="w-3 h-3" />
          Display
        </Button>
      </div>

      {/* Empty State / Create Task Modal Simulation */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[600px] bg-slate-50 rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
          <div className="p-6 space-y-4">
            <input 
              type="text" 
              placeholder="Add title" 
              className="w-full bg-transparent text-xl font-semibold text-slate-900 placeholder:text-slate-400 outline-none"
            />
            <textarea 
              placeholder="Description..." 
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none resize-none h-24"
            />
            
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition-colors">
                <CheckSquare className="w-3.5 h-3.5" />
                Todo
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition-colors">
                <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[8px]">
                  AN
                </div>
                Avinash Nadh
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition-colors">
                <Building2 className="w-3.5 h-3.5" />
                Account
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition-colors">
                <Briefcase className="w-3.5 h-3.5" />
                Opportunity
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition-colors">
                <Calendar className="w-3.5 h-3.5" />
                Due date
              </button>
            </div>
          </div>
          <div className="p-4 border-t border-slate-200 bg-white flex justify-end">
            <Button className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
              Create task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
