import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus, ChevronDown, ListFilter, Settings2, Building2 } from 'lucide-react';

const accounts = [
  { id: 1, name: 'Phenom', icon: 'P', industry: 'Human Resources', lastInteraction: '4d ago', revenue: '$100M to $500M', headcount: '1001-5000', lastFunding: 'Undisclosed', linkedin: 'phenom', website: 'phenom.com', owner: 'Avinash Nadh' },
  { id: 2, name: 'HCA Healthcare', icon: 'H', industry: 'Hospitals and Health Care', lastInteraction: '6d ago', revenue: '$10B+', headcount: '10001+', lastFunding: 'Undisclosed', linkedin: 'hca', website: 'hcahealthcare.com', owner: 'Avinash Nadh' },
  { id: 3, name: 'Kollx', icon: 'K', industry: 'Technology, Information and Internet', lastInteraction: '6d ago', revenue: 'Unknown', headcount: '11-50', lastFunding: 'Undisclosed', linkedin: 'kollx', website: 'kollx.com', owner: 'Avinash Nadh' },
  { id: 4, name: 'Freshteam', icon: 'F', industry: 'Software Development', lastInteraction: '10d ago', revenue: '$100M to $500M', headcount: '1001-5000', lastFunding: 'Series B', linkedin: 'freshteam', website: 'freshteam.com', owner: 'Avinash Nadh' },
  { id: 5, name: 'Recruit CRM', icon: 'R', industry: 'Software Development', lastInteraction: '10d ago', revenue: '$10M to $50M', headcount: '51-200', lastFunding: 'Undisclosed', linkedin: 'recruit-crm', website: 'recruitcrm.io', owner: 'Avinash Nadh' },
  { id: 6, name: 'Ceipal', icon: 'C', industry: 'Software Development', lastInteraction: '10d ago', revenue: '$10M to $50M', headcount: '201-500', lastFunding: 'Series B', linkedin: 'ceipal', website: 'ceipal.com', owner: 'Avinash Nadh' },
  { id: 7, name: 'Sense', icon: 'S', industry: 'Software Development', lastInteraction: '10d ago', revenue: '$10M to $50M', headcount: '201-500', lastFunding: 'Series D', linkedin: 'sense', website: 'sensehq.com', owner: 'Avinash Nadh' },
];

export default function Accounts() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-900">Accounts</h1>
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
            Create account
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

      {/* Table */}
      <div className="flex-1 overflow-auto border border-slate-200 rounded-md bg-white">
        <Table>
          <TableHeader className="bg-slate-50 sticky top-0 z-10">
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="text-xs font-medium text-slate-400 h-9">Account</TableHead>
              <TableHead className="text-xs font-medium text-slate-400 h-9">Industry</TableHead>
              <TableHead className="text-xs font-medium text-slate-400 h-9">Last interaction</TableHead>
              <TableHead className="text-xs font-medium text-slate-400 h-9">Revenue</TableHead>
              <TableHead className="text-xs font-medium text-slate-400 h-9">Headcount</TableHead>
              <TableHead className="text-xs font-medium text-slate-400 h-9">Last funding</TableHead>
              <TableHead className="text-xs font-medium text-slate-400 h-9">@ LinkedIn</TableHead>
              <TableHead className="text-xs font-medium text-slate-400 h-9">Website</TableHead>
              <TableHead className="text-xs font-medium text-slate-400 h-9">Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id} className="border-slate-200 hover:bg-slate-100 cursor-pointer">
                <TableCell className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-700 border border-slate-300">
                      {account.icon}
                    </div>
                    <span className="font-medium text-sm text-slate-800">{account.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-normal text-xs border-slate-300">
                    {account.industry}
                  </Badge>
                </TableCell>
                <TableCell className="py-2 text-sm text-slate-500">{account.lastInteraction}</TableCell>
                <TableCell className="py-2 text-sm text-slate-500">{account.revenue}</TableCell>
                <TableCell className="py-2 text-sm text-slate-500">{account.headcount}</TableCell>
                <TableCell className="py-2 text-sm text-slate-500">{account.lastFunding}</TableCell>
                <TableCell className="py-2 text-sm text-slate-500">{account.linkedin}</TableCell>
                <TableCell className="py-2 text-sm text-slate-500">{account.website}</TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
                      AN
                    </div>
                    <span className="text-sm text-slate-700">{account.owner}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Footer */}
      <div className="py-3 text-xs text-slate-400">
        {accounts.length} accounts
      </div>
    </div>
  );
}
