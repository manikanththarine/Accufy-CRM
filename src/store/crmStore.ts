import { create } from 'zustand';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type DealStage = 'Lead' | 'Meeting' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: LeadStatus;
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: DealStage;
  expectedCloseDate: string;
  leadId?: string;
}

export interface Activity {
  id: string;
  type: 'Email' | 'Call' | 'Meeting' | 'Note';
  description: string;
  date: string;
  relatedTo: string; // Lead or Deal name
}

interface CRMState {
  leads: Lead[];
  deals: Deal[];
  activities: Activity[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  updateDealStage: (id: string, stage: DealStage) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'date'>) => void;
}

// Initial mock data
const initialLeads: Lead[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@techcorp.com', company: 'TechCorp', role: 'CTO', status: 'Qualified', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: '2', name: 'Bob Smith', email: 'bob@innovate.io', company: 'Innovate.io', role: 'CEO', status: 'Contacted', createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: '3', name: 'Charlie Davis', email: 'charlie@designco.net', company: 'DesignCo', role: 'Design Lead', status: 'New', createdAt: new Date().toISOString() },
];

const initialDeals: Deal[] = [
  { id: '1', title: 'TechCorp Enterprise License', company: 'TechCorp', value: 50000, stage: 'Proposal', expectedCloseDate: new Date(Date.now() + 86400000 * 15).toISOString(), leadId: '1' },
  { id: '2', title: 'Innovate.io Team Plan', company: 'Innovate.io', value: 12000, stage: 'Meeting', expectedCloseDate: new Date(Date.now() + 86400000 * 30).toISOString(), leadId: '2' },
  { id: '3', title: 'DesignCo Custom Integration', company: 'DesignCo', value: 25000, stage: 'Lead', expectedCloseDate: new Date(Date.now() + 86400000 * 45).toISOString(), leadId: '3' },
];

const initialActivities: Activity[] = [
  { id: '1', type: 'Call', description: 'Initial discovery call with Alice. Very interested in enterprise features.', date: new Date(Date.now() - 86400000 * 1).toISOString(), relatedTo: 'Alice Johnson' },
  { id: '2', type: 'Email', description: 'Sent proposal to TechCorp.', date: new Date(Date.now() - 86400000 * 0.5).toISOString(), relatedTo: 'TechCorp Enterprise License' },
];

export const useCRMStore = create<CRMState>((set) => ({
  leads: initialLeads,
  deals: initialDeals,
  activities: initialActivities,
  
  addLead: (lead) => set((state) => ({
    leads: [{ ...lead, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() }, ...state.leads]
  })),
  
  updateLeadStatus: (id, status) => set((state) => ({
    leads: state.leads.map(l => l.id === id ? { ...l, status } : l)
  })),
  
  addDeal: (deal) => set((state) => ({
    deals: [{ ...deal, id: Math.random().toString(36).substr(2, 9) }, ...state.deals]
  })),
  
  updateDealStage: (id, stage) => set((state) => ({
    deals: state.deals.map(d => d.id === id ? { ...d, stage } : d)
  })),
  
  addActivity: (activity) => set((state) => ({
    activities: [{ ...activity, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() }, ...state.activities]
  })),
}));
