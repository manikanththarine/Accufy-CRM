import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, ListFilter, Settings2, Sparkles, UserPlus, FileText, CheckCircle2, CircleDashed, Circle, XCircle, TrendingUp, Briefcase, Users, LayoutGrid, ClipboardCheck, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const stages = [
  { name: 'Sourced', icon: <CircleDashed className="w-4 h-4 text-slate-400" /> },
  { name: 'Screening', icon: <Circle className="w-4 h-4 text-slate-400" /> },
  { name: 'Interview', icon: <div className="w-4 h-4 rounded-full border-2 border-slate-400 relative overflow-hidden"><div className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-400"></div></div> },
  { name: 'Offer', icon: <div className="w-4 h-4 rounded-full border-2 border-slate-400 relative overflow-hidden"><div className="absolute bottom-0 left-0 w-full h-3/4 bg-slate-400"></div></div> },
  { name: 'Onboarding', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
  { name: 'Rejected', icon: <XCircle className="w-4 h-4 text-red-600" /> },
];

const candidates = [
  { id: 1, name: 'Alice Johnson', role: 'Senior Frontend Engineer', stage: 'Interview', source: 'LinkedIn', aiScore: 92, aiInsight: 'Strong React skills, good cultural fit' },
  { id: 2, name: 'Bob Williams', role: 'Product Manager', stage: 'Screening', source: 'Referral', aiScore: 78, aiInsight: 'Needs more technical depth' },
  { id: 3, name: 'Charlie Brown', role: 'UX Designer', stage: 'Offer', source: 'Website', aiScore: 88, aiInsight: 'Excellent portfolio, ready to close' },
  { id: 4, name: 'Diana Prince', role: 'Data Scientist', stage: 'Sourced', source: 'Agency', aiScore: 95, aiInsight: 'Perfect match for requirements' },
  { id: 5, name: 'Evan Wright', role: 'DevOps Engineer', stage: 'Onboarding', source: 'Direct', aiScore: 96, aiInsight: 'Background check cleared, IT provisioning pending' },
];

const capacityPlans = [
  { dept: 'Engineering', node: 'Acme Corp Global', current: 45, required: 52, gap: 7, priority: 'High', aiInsight: 'Need 3 React devs by Q3 to meet roadmap velocity.' },
  { dept: 'Sales', node: 'Sales, Acme Corp NA', current: 20, required: 25, gap: 5, priority: 'Medium', aiInsight: 'Expand EMEA team based on recent pipeline growth.' },
  { dept: 'Marketing', node: 'Marketing, Acme Corp EMEA', current: 12, required: 12, gap: 0, priority: 'Low', aiInsight: 'Headcount optimal for current campaign load.' },
];

const jobPostings = [
  { id: 'REQ-001', title: 'Senior Frontend Engineer', dept: 'Engineering', hiringNode: 'Frontend Team, Acme Corp NA', budgetApprover: 'David Kim (BU Head)', status: 'Published', applicants: 45, aiMatch: '3 strong candidates found in ATS database', type: 'Full-time', location: 'Remote' },
  { id: 'REQ-002', title: 'Enterprise Account Executive', dept: 'Sales', hiringNode: 'Sales, Acme Corp NA', budgetApprover: 'Emily Chen (BU Head)', status: 'Draft', applicants: 0, aiMatch: 'AI generated description ready for review', type: 'Full-time', location: 'New York, NY' },
  { id: 'REQ-003', title: 'Product Marketing Manager', dept: 'Marketing', hiringNode: 'Marketing, Acme Corp EMEA', budgetApprover: 'John Smith (BU Head)', status: 'Closed', applicants: 120, aiMatch: 'Position filled', type: 'Full-time', location: 'San Francisco, CA' },
];

const onboardingTasks = [
  { id: 'ONB-001', newHire: 'Evan Wright', role: 'DevOps Engineer', startDate: 'Dec 01, 2023', itSetup: 'Pending', documents: 'Completed', orientation: 'Scheduled', status: 'In Progress', aiInsight: 'IT provisioning delayed. Follow up with IT support to ensure laptop delivery.' },
  { id: 'ONB-002', newHire: 'Charlie Brown', role: 'UX Designer', startDate: 'Dec 15, 2023', itSetup: 'Not Started', documents: 'Pending', orientation: 'Not Started', status: 'Pre-boarding', aiInsight: 'Send welcome package and background check link. Offer accepted yesterday.' },
  { id: 'ONB-003', newHire: 'Sarah Connor', role: 'Marketing Manager', startDate: 'Nov 01, 2023', itSetup: 'Completed', documents: 'Completed', orientation: 'Completed', status: 'Completed', aiInsight: '30-day check-in survey sent. Sentiment is highly positive.' },
];

export default function Recruitment() {
  const [activeTab, setActiveTab] = useState('ats');
  const { hasPermission } = useAuth();
  
  const isSelfServiceOnly = !hasPermission('view:hrm') && hasPermission('view:self_service');

  if (isSelfServiceOnly) {
    const publishedJobs = jobPostings.filter(j => j.status === 'Published');

    return (
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-900">Internal Job Board</h1>
          <Button variant="outline" className="h-8 text-xs gap-2">
            <UserPlus className="w-3 h-3" />
            Refer a Candidate
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publishedJobs.map(job => (
            <div key={job.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-normal text-[10px]">
                  {job.dept}
                </Badge>
                <span className="text-xs text-slate-400">{job.id}</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-1">{job.title}</h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.type}</span>
                <span className="flex items-center gap-1"><LayoutGrid className="w-3 h-3" /> {job.location}</span>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> High match potential
                </span>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1 px-2">
                  View Details <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
          {publishedJobs.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
              No internal job postings available at the moment.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-900">Recruitment & Onboarding</h1>
          <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
            <button 
              onClick={() => setActiveTab('capacity')}
              className={cn("px-3 py-1 text-sm font-medium rounded transition-colors", activeTab === 'capacity' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50")}
            >
              Capacity Planning
            </button>
            <button 
              onClick={() => setActiveTab('postings')}
              className={cn("px-3 py-1 text-sm font-medium rounded transition-colors", activeTab === 'postings' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50")}
            >
              Reqs & Postings
            </button>
            <button 
              onClick={() => setActiveTab('ats')}
              className={cn("px-3 py-1 text-sm font-medium rounded transition-colors", activeTab === 'ats' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50")}
            >
              ATS Pipeline
            </button>
            <button 
              onClick={() => setActiveTab('onboarding')}
              className={cn("px-3 py-1 text-sm font-medium rounded transition-colors", activeTab === 'onboarding' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50")}
            >
              Onboarding
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 h-8 text-xs border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-600">
            <Sparkles className="w-3 h-3" />
            {activeTab === 'capacity' ? 'AI Headcount Forecast' : activeTab === 'postings' ? 'AI Generate JD' : activeTab === 'onboarding' ? 'AI Onboarding Plan' : 'AI Sourcing'}
          </Button>
          <Button className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white gap-1">
            <Plus className="w-3 h-3" />
            {activeTab === 'postings' ? 'New Requisition' : activeTab === 'onboarding' ? 'New Hire Checklist' : 'Add Candidate'}
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

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'capacity' && (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {capacityPlans.map((plan, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">{plan.dept}</h3>
                      <div className="text-xs text-slate-500">{plan.node}</div>
                    </div>
                    <Badge variant={plan.gap > 0 ? 'destructive' : 'secondary'} className="bg-slate-100 text-slate-700 border-slate-300 font-normal">
                      Gap: {plan.gap}
                    </Badge>
                  </div>
                  <div className="flex items-end gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{plan.current}</div>
                      <div className="text-xs text-slate-500">Current</div>
                    </div>
                    <div className="text-slate-300 text-2xl font-light">/</div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{plan.required}</div>
                      <div className="text-xs text-slate-500">Required</div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs font-medium text-blue-800">AI Forecast</span>
                    </div>
                    <p className="text-xs text-blue-700/80">{plan.aiInsight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'postings' && (
          <div className="flex-1 overflow-auto bg-white border border-slate-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Requisition</th>
                  <th className="px-4 py-3 font-medium">Hiring Node</th>
                  <th className="px-4 py-3 font-medium">Budget Approver</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Applicants</th>
                  <th className="px-4 py-3 font-medium">AI Match Insight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {jobPostings.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{job.title}</div>
                      <div className="text-xs text-slate-400">{job.id}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-slate-700">{job.hiringNode}</div>
                      <div className="text-xs text-slate-400">{job.dept}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{job.budgetApprover}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn(
                        "font-normal text-xs",
                        job.status === 'Published' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        job.status === 'Draft' ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-100 text-slate-700 border-slate-200"
                      )}>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">{job.applicants}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-blue-600">
                        <Sparkles className="w-3.5 h-3.5" />
                        {job.aiMatch}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'ats' && (
          <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <div className="flex gap-3 h-full min-w-max pb-4">
              {stages.map((stage) => {
                const stageCandidates = candidates.filter((c) => c.stage === stage.name);
                
                return (
                  <div key={stage.name} className="w-[280px] flex flex-col h-full bg-slate-50/50 rounded-lg border border-slate-200">
                    {/* Column Header */}
                    <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-white rounded-t-lg">
                      <div className="flex items-center gap-2">
                        {stage.icon}
                        <h3 className="text-sm font-medium text-slate-700">{stage.name}</h3>
                        <span className="text-xs text-slate-400">{stageCandidates.length}</span>
                      </div>
                    </div>
                    
                    {/* Column Content */}
                    <div className="p-2 flex-1 overflow-y-auto space-y-2">
                      {stageCandidates.map((candidate) => (
                        <div key={candidate.id} className="bg-white border border-slate-200 rounded-md p-3 cursor-pointer hover:border-slate-300 transition-colors shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm text-slate-800">{candidate.name}</h4>
                            <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-medium border border-blue-100">
                              <Sparkles className="w-2.5 h-2.5" />
                              {candidate.aiScore}
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 mb-2">{candidate.role}</div>
                          <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                            <span className="text-[10px] text-slate-400">{candidate.source}</span>
                          </div>
                          <div className="mt-2 p-2 bg-slate-50 rounded text-[10px] text-slate-600 leading-tight border border-slate-100">
                            <span className="font-medium text-blue-600 mr-1">AI Note:</span>
                            {candidate.aiInsight}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'onboarding' && (
          <div className="flex-1 overflow-auto bg-white border border-slate-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">New Hire</th>
                  <th className="px-4 py-3 font-medium">Start Date</th>
                  <th className="px-4 py-3 font-medium">IT Setup</th>
                  <th className="px-4 py-3 font-medium">Documents</th>
                  <th className="px-4 py-3 font-medium">Orientation</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">AI Insight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {onboardingTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{task.newHire}</div>
                      <div className="text-xs text-slate-400">{task.role}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {task.startDate}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn(
                        "font-normal text-[10px]",
                        task.itSetup === 'Completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        task.itSetup === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-100 text-slate-700 border-slate-200"
                      )}>
                        {task.itSetup}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn(
                        "font-normal text-[10px]",
                        task.documents === 'Completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        task.documents === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-100 text-slate-700 border-slate-200"
                      )}>
                        {task.documents}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn(
                        "font-normal text-[10px]",
                        task.orientation === 'Completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        task.orientation === 'Scheduled' ? "bg-blue-50 text-blue-700 border-blue-200" :
                        "bg-slate-100 text-slate-700 border-slate-200"
                      )}>
                        {task.orientation}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn(
                        "font-normal text-xs",
                        task.status === 'Completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        task.status === 'In Progress' ? "bg-blue-50 text-blue-700 border-blue-200" :
                        "bg-slate-100 text-slate-700 border-slate-200"
                      )}>
                        {task.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`flex items-start gap-1.5 text-xs ${task.aiInsight.includes('delayed') ? 'text-amber-600' : 'text-blue-600'}`}>
                        {task.aiInsight.includes('delayed') ? <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" /> : <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
                        <span className="leading-tight">{task.aiInsight}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
