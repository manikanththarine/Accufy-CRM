import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, ChevronDown, ListFilter, Settings2, CircleDashed, Circle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// --- NEW IMPORT ---
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import TaskSection from './TaskSection';
import { api } from '@/apicalls';
import { toast } from 'sonner'; // or your preferred toast library

const stages = [
  { name: 'Lead', icon: <CircleDashed className="w-4 h-4 text-slate-400" /> },
  { name: 'Qualification', icon: <Circle className="w-4 h-4 text-slate-400" /> },
  { name: 'Demo', icon: <div className="w-4 h-4 rounded-full border-2 border-slate-400 relative overflow-hidden"><div className="absolute bottom-0 left-0 w-full h-1/4 bg-slate-400"></div></div> },
  { name: 'Trial', icon: <div className="w-4 h-4 rounded-full border-2 border-slate-400 relative overflow-hidden"><div className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-400"></div></div> },
  { name: 'Proposal', icon: <div className="w-4 h-4 rounded-full border-2 border-slate-400 relative overflow-hidden"><div className="absolute bottom-0 left-0 w-full h-3/4 bg-slate-400"></div></div> },
  { name: 'Won', icon: <CheckCircle2 className="w-4 h-4 text-blue-600" /> },
  { name: 'Lost', icon: <XCircle className="w-4 h-4 text-red-600" /> },
];

export default function Opportunities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiAccounts, setApiAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    jobTitle: '',
    email: '',
    source: 'Manual',
    description: ''
  });
  const [selectedOpp, setSelectedOpp] = useState<any | null>(null);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getDashboardStats();
        setApiAccounts(data.leads || []);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // --- NEW DRAG END FUNCTION ---
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a list or in the same spot, do nothing
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const newStage = destination.droppableId;
    const leadId = draggableId;

    // 1. Optimistic UI Update (Change local state immediately)
    const updatedAccounts = apiAccounts.map(lead => {
      if (lead.id.toString() === leadId) {
        return { ...lead, stage: newStage };
      }
      return lead;
    });
    setApiAccounts(updatedAccounts);

    // 2. Update Backend
    try {
     const result = await api.updateLeadStage(draggableId, destination.droppableId);
console.log("Stage update result:", result);
    } catch (error) {
      console.error("Failed to update stage:", error);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- 1. VALIDATION LOGIC ---
    const { name, email, description } = formData;

    if (!name.trim() || !email.trim() || !description.trim()) {
      // Show error toast
      toast.error("Required Fields Missing", {
        description: "Please provide a Name, Email, and Description to continue."
      });
      return; // STOP the function here; API will not be called
    }

    setIsSubmitting(true);
    try {
      const response = await api.createLead(formData);

      if (response) {
        toast.success("Lead created successfully!");
        setIsModalOpen(false);

        setTimeout(() => {
          window.location.href = '/opportunities';
        }, 1500);
      }
    } catch (error: any) {
      console.error("Network error:", error);
      toast.error(error.message || "Failed to create lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header & Filter Bar (Unchanged) */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-900">Opportunities</h1>
          <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
            <button className="px-3 py-1 text-sm font-medium bg-slate-100 text-slate-900 rounded shadow-sm">All</button>
            <button className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"><Plus className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 h-8 text-xs border-slate-200 bg-transparent hover:bg-slate-100">
            Import / Export <ChevronDown className="w-3 h-3" />
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white gap-1" >
            <Plus className="w-3 h-3" /> Create opportunity
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 h-7 text-xs border-slate-200 bg-transparent hover:bg-slate-100 text-slate-500">
            <ListFilter className="w-3 h-3" /> Filter
          </Button>
        </div>
        <Button variant="outline" className="gap-2 h-7 text-xs border-slate-200 bg-transparent hover:bg-slate-100 text-slate-500">
          <Settings2 className="w-3 h-3" /> Display
        </Button>
      </div>

      {/* --- WRAP BOARD IN DRAGDROPCONTEXT --- */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-3 h-full min-w-max pb-4">
            {stages.map((stage) => {
              const stageOpps = apiAccounts.filter((o) => (o.stage || 'Lead') === stage.name);
              const totalAmount = stageOpps.reduce((sum, opp) => sum + parseInt(opp?.amount?.replace(/[^0-9]/g, '') || '0'), 0);

              return (
                <div key={stage.name} className="w-[280px] flex flex-col h-full bg-white rounded-lg border border-slate-200">
                  <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-lg">
                    <div className="flex items-center gap-2">
                      {stage.icon}
                      <h3 className="text-sm font-medium text-slate-700">{stage.name}</h3>
                      <span className="text-xs text-slate-400">{stageOpps.length}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500">${totalAmount.toLocaleString()}</span>
                  </div>

                  {/* --- DROPPABLE COLUMN CONTENT --- */}
                  <Droppable droppableId={stage.name}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="p-2 flex-1 overflow-y-auto space-y-2 min-h-[150px]"
                      >
                        <button onClick={() => setIsModalOpen(true)} className="w-full py-1.5 flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
                          <Plus className="w-3.5 h-3.5" /> Create opportunity
                        </button>

                        {stageOpps.map((opp, index) => (
                          <Draggable key={opp.id.toString()} draggableId={opp.id.toString()} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ ...provided.draggableProps.style, transitionDuration: '0.001s' }}
                              >
                                <motion.div
                                  onClick={() => setSelectedOpp(opp)} // Open side panel
                                  layoutId={opp.id.toString()}
                                  transition={{
                                    type: "spring",
                                    stiffness: 550,
                                    damping: 35,
                                    mass: 0.8
                                  }}
                                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"

                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-semibold text-sm text-slate-900 leading-tight">{opp.displayTitle || opp.name}</h4>
                                    <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${opp.score >= 60 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-600'}`}>
                                      {opp.score}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-blue-600 border border-slate-200">
                                      {opp.displayIcon || (opp.company ? opp.company[0] : '?')}
                                    </div>
                                    <span className="text-xs font-medium text-slate-600">{opp.company}</span>
                                  </div>

                                  <div className="mb-4 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
                                    <div className="flex items-center gap-1.5 mb-1">
                                      <Sparkles className="w-3 h-3 text-blue-600" />
                                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-tight">AI Next Action</span>
                                    </div>
                                    <p className="text-xs text-slate-600 line-clamp-2 italic">"{opp.ai_next_action || opp.next_action}"</p>
                                  </div>

                                  <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                    <span className="text-sm font-bold text-slate-900">{opp.displayAmount || '$0'}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-medium text-slate-400">
                                        {new Date(opp.updated_at).toLocaleDateString()}
                                      </span>
                                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                                        {opp?.name?.charAt(0) || opp?.company?.charAt(0) || '?'}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </div>
      </DragDropContext>

      {/* Modal (Unchanged) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg font-semibold text-slate-800">New Opportunity</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 uppercase">Name</label>
                    <input name="name" required onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 uppercase">Company</label>
                    <input name="company" required onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Acme Corp" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 uppercase">Job Title</label>
                    <input name="jobTitle" onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Manager" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 uppercase">Email</label>
                    <input name="email" type="email" required onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@company.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500 uppercase">Description / Prompt</label>
                  <textarea name="description" rows={3} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Add some context..."></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
                    {isSubmitting ? "Creating..." : "Create"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* --- SIDE PANEL (DRAWER) --- */}
      <AnimatePresence>
        {selectedOpp && (
          <>
            <motion.div
              onClick={() => setSelectedOpp(null)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
            />

            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-[70] border-l border-slate-200 flex flex-col"
            >
              {/* Panel Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedOpp.displayTitle || selectedOpp.name}</h2>
                  <p className="text-sm text-slate-500">{selectedOpp.company}</p>
                </div>
                <button onClick={() => setSelectedOpp(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <XCircle className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* AI Insights Section */}
                <section className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-blue-700 uppercase">AI Recommendations</span>
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    {selectedOpp.next_action || "Analyzing lead data..."}
                  </p>
                </section>

                {/* --- INTEGRATED TASK SECTION --- */}
                <TaskSection
                  leadId={selectedOpp.id}
                  initialTasks={selectedOpp.tasks || []}
                />

                {/* Contact Info */}
                <section className="pt-6 border-t border-slate-100">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Info</label>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Email</p>
                      <p className="text-sm text-slate-700 truncate">{selectedOpp.email || 'N/A'}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Job Title</p>
                      <p className="text-sm text-slate-700 truncate">{selectedOpp.jobTitle || 'N/A'}</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Panel Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-11">Edit Opportunity</Button>
                <Button variant="outline" className="flex-1 font-bold h-11">Close Deal</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}