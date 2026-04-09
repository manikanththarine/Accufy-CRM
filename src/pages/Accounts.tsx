import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus, ChevronDown, ListFilter, Settings2, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';

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
const [apiAccounts, setApiAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:1000/api/dashboard-stats')
      .then(response => response.json())
      .then(data => {
        console.log(data)

        // 2. Set the response data to state
        setApiAccounts(data.leads);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching accounts:', error);
        setLoading(false);
      });
  }, []);
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
      <TableHead className="text-xs font-medium text-slate-400 h-9">Account / Company</TableHead>
      <TableHead className="text-xs font-medium text-slate-400 h-9">Status</TableHead>
      <TableHead className="text-xs font-medium text-slate-400 h-9">Priority</TableHead>
      <TableHead className="text-xs font-medium text-slate-400 h-9">Score</TableHead>
      <TableHead className="text-xs font-medium text-slate-400 h-9">Intent</TableHead>
      <TableHead className="text-xs font-medium text-slate-400 h-9">Email</TableHead>
      <TableHead className="text-xs font-medium text-slate-400 h-9">Source</TableHead>
      <TableHead className="text-xs font-medium text-slate-400 h-9">Lead Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {apiAccounts.map((account: any) => (
      <TableRow key={account.id} className="border-slate-200 hover:bg-slate-100 cursor-pointer">
        {/* Company Name */}
        <TableCell className="py-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-slate-800">
              {account.company || "Unknown Company"}
            </span>
          </div>
        </TableCell>

        {/* Status Badge */}
        <TableCell className="py-2">
          <Badge 
            variant="secondary" 
            className={`font-normal text-xs border-slate-300 ${
              account.status === 'Hot' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {account.status}
          </Badge>
        </TableCell>

        {/* Priority Badge */}
        <TableCell className="py-2">
          <span className={`text-xs font-medium uppercase ${
            account.priority === 'high' ? 'text-red-600' : 'text-slate-500'
          }`}>
            {account.priority}
          </span>
        </TableCell>

        {/* AI Score */}
        <TableCell className="py-2 text-sm text-slate-500">
          <span className={account.score > 70 ? "text-green-600 font-bold" : ""}>
            {account.score}/100
          </span>
        </TableCell>

        {/* Intent */}
        <TableCell className="py-2 text-sm text-slate-500 italic">
          "{account.intent}"
        </TableCell>

        {/* Email */}
        <TableCell className="py-2 text-sm text-blue-600 underline">
          {account.email}
        </TableCell>

        {/* Source */}
        <TableCell className="py-2 text-sm text-slate-500">
          {account.source}
        </TableCell>

        {/* Lead Name / Owner */}
        <TableCell className="py-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
              {account.name ? account.name.substring(0, 2).toUpperCase() : "NA"}
            </div>
            <span className="text-sm text-slate-700">{account.name}</span>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
      </div>
      
      {/* Footer */}
      {/* <div className="py-3 text-xs text-slate-400">
        {accounts.length} accounts
      </div> */}
    </div>
  );
}
