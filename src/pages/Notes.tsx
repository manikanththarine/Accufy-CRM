import React from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, ListFilter, Settings2, Search } from 'lucide-react';

export default function Notes() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-900">Notes</h1>
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
            Create note
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
        </div>
        <Button variant="outline" className="gap-2 h-7 text-xs border-slate-200 bg-transparent hover:bg-slate-100 text-slate-500">
          <Settings2 className="w-3 h-3" />
          Display
        </Button>
      </div>

      {/* Empty State / Create Note Modal Simulation */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[480px] bg-slate-50 rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-sm font-medium text-slate-800">Select an account for this note</h2>
          </div>
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Account name" 
                className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-slate-300"
              />
            </div>
            
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {[
                { name: 'Phenom', icon: 'P' },
                { name: 'HCA Healthcare', icon: 'H' },
                { name: 'Kollx', icon: 'K' },
                { name: 'Freshteam', icon: 'F' },
                { name: 'Recruit CRM', icon: 'R' },
              ].map((account) => (
                <button key={account.name} className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 transition-colors text-left">
                  <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-700 border border-slate-300">
                    {account.icon}
                  </div>
                  <span className="text-sm text-slate-700">{account.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
