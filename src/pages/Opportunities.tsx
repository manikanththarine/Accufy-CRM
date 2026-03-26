import React from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, ChevronDown, ListFilter, Settings2, CircleDashed, Circle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

const stages = [
  { name: 'Lead', icon: <CircleDashed className="w-4 h-4 text-slate-400" /> },
  { name: 'Qualification', icon: <Circle className="w-4 h-4 text-slate-400" /> },
  { name: 'Demo', icon: <div className="w-4 h-4 rounded-full border-2 border-slate-400 relative overflow-hidden"><div className="absolute bottom-0 left-0 w-full h-1/4 bg-slate-400"></div></div> },
  { name: 'Trial', icon: <div className="w-4 h-4 rounded-full border-2 border-slate-400 relative overflow-hidden"><div className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-400"></div></div> },
  { name: 'Proposal', icon: <div className="w-4 h-4 rounded-full border-2 border-slate-400 relative overflow-hidden"><div className="absolute bottom-0 left-0 w-full h-3/4 bg-slate-400"></div></div> },
  { name: 'Won', icon: <CheckCircle2 className="w-4 h-4 text-blue-600" /> },
  { name: 'Lost', icon: <XCircle className="w-4 h-4 text-red-600" /> },
];

const opportunities = [
  { id: 1, title: 'Phenom - New Business', amount: '$10,000', stage: 'Lead', account: 'Phenom', accountIcon: 'P', owner: 'AN', lastInteraction: '11d ago', leadScore: 65, status: 'Warm', aiNextAction: 'Send follow-up email regarding pricing' },
  { id: 2, title: 'HCA Healthcare - Expansion', amount: '$25,000', stage: 'Qualification', account: 'HCA Healthcare', accountIcon: 'H', owner: 'AN', lastInteraction: '6d ago', leadScore: 92, status: 'Hot', aiNextAction: 'Schedule technical deep-dive call' },
  { id: 3, title: 'Kollx - Renewal', amount: '$5,000', stage: 'Demo', account: 'Kollx', accountIcon: 'K', owner: 'AN', lastInteraction: '2d ago', leadScore: 88, status: 'Hot', aiNextAction: 'Prepare custom demo environment' },
];

export default function Opportunities() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-900">Opportunities</h1>
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
          <Button variant="outline" className="gap-2 h-8 text-xs border-slate-200 bg-transparent hover:bg-slate-100">
            Import / Export
            <ChevronDown className="w-3 h-3" />
          </Button>
          <Button className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white gap-1">
            <Plus className="w-3 h-3" />
            Create opportunity
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

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-3 h-full min-w-max pb-4">
          {stages.map((stage) => {
            const stageOpps = opportunities.filter((o) => o.stage === stage.name);
            const totalAmount = stageOpps.reduce((sum, opp) => sum + parseInt(opp.amount.replace(/[^0-9]/g, '')), 0);
            
            return (
              <div key={stage.name} className="w-[280px] flex flex-col h-full bg-white rounded-lg border border-slate-200">
                {/* Column Header */}
                <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-lg">
                  <div className="flex items-center gap-2">
                    {stage.icon}
                    <h3 className="text-sm font-medium text-slate-700">{stage.name}</h3>
                    <span className="text-xs text-slate-400">{stageOpps.length}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
                
                {/* Column Content */}
                <div className="p-2 flex-1 overflow-y-auto space-y-2">
                  <button className="w-full py-1.5 flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    Create opportunity
                  </button>
                  
                  {stageOpps.map((opp) => (
                    <div key={opp.id} className="bg-white border border-slate-200 rounded-md p-3 cursor-pointer hover:border-slate-300 transition-colors shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm text-slate-800">{opp.title}</h4>
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${opp.leadScore >= 80 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : opp.leadScore >= 60 ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                          Score: {opp.leadScore}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[9px] font-medium text-slate-700 border border-slate-300">
                          {opp.accountIcon}
                        </div>
                        <span className="text-xs text-slate-500">{opp.account}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 ml-auto">{opp.status}</span>
                      </div>
                      
                      {/* AI Next Action */}
                      <div className="mb-3 p-2 rounded bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          <span className="text-[10px] font-medium text-blue-600 uppercase tracking-wider">AI Next Action</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-tight">{opp.aiNextAction}</p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-200">
                        <span className="text-xs font-medium text-slate-700">{opp.amount}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">{opp.lastInteraction}</span>
                          <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[8px]">
                            {opp.owner}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
