import React, { useState } from 'react';
import { Plus, Calendar, CheckCircle2, Circle, Edit2, X, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'open' | 'completed';
}

export default function TaskSection({ leadId, initialTasks = [] }: { leadId: string, initialTasks?: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'open' as 'open' | 'completed'
  });

  const openCreate = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '', due_date: '', status: 'open' });
    setIsFormOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({ ...task });
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    // API Call Logic here
    // const method = editingTask ? 'PATCH' : 'POST';
    // const url = editingTask ? `/api/tasks/${editingTask.id}` : '/api/tasks';
    
    // For Demo: Local Update
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...editingTask, ...formData } : t));
    } else {
      setTasks([...tasks, { ...formData, id: Date.now().toString() }]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Tasks</label>
        <button onClick={openCreate} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
          <Plus className="w-3 h-3" /> Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.length > 0 ? tasks.map((task) => (
          <div key={task.id} className="p-3 border border-slate-200 rounded-xl bg-white shadow-sm hover:border-blue-300 transition-all group">
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                {task.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4 text-slate-300" />}
                <h4 className={`text-sm font-semibold ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {task.title}
                </h4>
              </div>
              <button onClick={() => openEdit(task)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded text-slate-400">
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1 ml-6">{task.description}</p>
            <div className="mt-3 ml-6 flex items-center gap-3">
              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {new Date(task.due_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        )) : (
          <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-xs">
            No tasks assigned to this lead.
          </div>
        )}
      </div>

      {/* Slide-up Form Overlay */}
      {isFormOpen && (
        <div className="absolute inset-x-0 bottom-0 top-0 bg-white z-10 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">{editingTask ? 'Edit Task' : 'New Task'}</h3>
            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <div className="space-y-4">
            <input 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task Name"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            <textarea 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Description..."
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="date"
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                value={formData.due_date}
                onChange={e => setFormData({...formData, due_date: e.target.value})}
              />
              <select 
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="open">Open</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button 
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 mt-4"
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}