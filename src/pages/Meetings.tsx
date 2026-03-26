import React from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, ListFilter, Settings2, VideoOff, MoreHorizontal } from 'lucide-react';

const meetings = [
  {
    date: 'Fri, Dec 12',
    items: [
      { id: 1, time: '11:00 - 11:15 PM', title: 'Avinash Nadh Basuvu - Interview with Product Owner - 15mins', account: 'Kollx', accountIcon: 'K' }
    ]
  },
  {
    date: 'Mon, Dec 22',
    items: [
      { id: 2, time: '11:00 - 11:15 AM', title: 'Product Manager (Remote) Interview - Web conference', account: 'Freshteam', accountIcon: 'F' }
    ]
  },
  {
    date: 'Mon, Feb 2',
    items: []
  },
  {
    date: 'Tue, Feb 17',
    items: []
  },
  {
    date: 'Today',
    items: []
  }
];

export default function Meetings() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-900">Meetings</h1>
          <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
            <button className="px-3 py-1 text-sm font-medium bg-slate-100 text-slate-900 rounded shadow-sm">
              All
            </button>
            <button className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded">
              <Plus className="w-4 h-4" />
            </button>
          </div>
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

      {/* Meetings List */}
      <div className="flex-1 overflow-auto space-y-6 pt-4">
        {meetings.map((group) => (
          <div key={group.date} className="space-y-3">
            <h3 className="text-sm font-medium text-slate-500 sticky top-0 bg-slate-50 py-1 z-10">
              {group.date}
            </h3>
            
            {group.items.length === 0 ? (
              <div className="text-sm text-slate-400 italic pl-4">No meetings</div>
            ) : (
              <div className="space-y-2">
                {group.items.map((meeting) => (
                  <div key={meeting.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors group">
                    <div className="w-32 text-xs font-medium text-slate-500 flex-shrink-0">
                      {meeting.time}
                    </div>
                    
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <h4 className="text-sm font-medium text-slate-800 truncate">
                        {meeting.title}
                      </h4>
                      <VideoOff className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-700 border border-slate-300">
                        {meeting.accountIcon}
                      </div>
                      <span className="text-xs text-slate-500">{meeting.account}</span>
                    </div>
                    
                    <button className="p-1 text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
