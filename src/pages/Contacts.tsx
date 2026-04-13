import React, { useState, useEffect } from 'react'; // Added useState & useEffect
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, ChevronDown, ListFilter, Settings2, Sparkles, Loader2 } from 'lucide-react';
import {api} from "../apicalls"; // Importing API functions
export default function Contacts() {
  // 1. Initialize state for contacts and loading status
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  // 2. Fetch data from your API
   useEffect(() => {
      const loadData = async () => {
        try {
          const data = await api.getDashboardStats();
          setContacts(data.leads || []);
        } catch (error) {
          console.error('Error fetching accounts:', error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }, []);
console.log(contacts)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-900">Contacts</h1>
          <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
            <button className="px-3 py-1 text-sm font-medium bg-white text-slate-900 rounded shadow-sm">
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
            Create contact
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

      {/* Table Section */}
      <div className="flex-1 overflow-auto border border-slate-200 rounded-md bg-white relative">
        {loading ? (
          // Loading State
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50 sticky top-0 z-10">
              <TableRow className="border-slate-200 hover:bg-transparent">
                <TableHead className="text-xs font-medium text-slate-400 h-9">Name</TableHead>
                <TableHead className="text-xs font-medium text-slate-400 h-9">Account</TableHead>
                <TableHead className="text-xs font-medium text-slate-400 h-9">Score</TableHead>
                <TableHead className="text-xs font-medium text-slate-400 h-9">Status</TableHead>
                <TableHead className="text-xs font-medium text-slate-400 h-9">Job title</TableHead>
                <TableHead className="text-xs font-medium text-slate-400 h-9">Email addresses</TableHead>
                <TableHead className="text-xs font-medium text-blue-600 h-9 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Next Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.length > 0 ? (
                contacts.map((contact:any) => (
                  <TableRow key={contact.id} className="border-slate-200 hover:bg-slate-100 cursor-pointer">
                    <TableCell className="py-2 font-medium text-sm text-slate-800">{contact.name}</TableCell>
                    <TableCell className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-700 border border-slate-300">
                          {contact.company?.[0] }
                        </div>
                        <span className="text-sm text-slate-700">{contact.company}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <div className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${contact.score >= 80 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : contact.score >= 60 ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                        {contact.score}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 text-sm text-slate-500">{contact.status}</TableCell>
                    <TableCell className="py-2 text-sm text-slate-500">{contact.job_title}</TableCell>
                    <TableCell className="py-2 text-sm text-slate-500">{contact.email}</TableCell>
                    <TableCell className="py-2 text-xs text-blue-600/80 italic">{contact.ai_next_action}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-slate-500">
                    No contacts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      
      {/* Footer */}
      <div className="py-3 text-xs text-slate-400">
        {contacts.length} contacts
      </div>
    </div>
  );
}