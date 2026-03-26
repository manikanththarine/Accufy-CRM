import React, { useState } from 'react';
import { useCRMStore, LeadStatus } from '@/store/crmStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { format } from 'date-fns';
import { Plus, Search, Filter, Sparkles } from 'lucide-react';

const statusColors: Record<LeadStatus, 'default' | 'secondary' | 'success' | 'warning'> = {
  'New': 'default',
  'Contacted': 'warning',
  'Qualified': 'success',
  'Lost': 'secondary',
};

export default function Leads() {
  const { leads, addLead } = useCRMStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Leads</h1>
          <p className="text-sm text-slate-500">Manage your contacts and potential customers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            AI Import
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Lead
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search leads..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeader className="bg-slate-50 sticky top-0 z-10">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">{lead.name}</span>
                      <span className="text-xs text-slate-500">{lead.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell className="text-slate-600">{lead.role}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[lead.status]}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    No leads found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
