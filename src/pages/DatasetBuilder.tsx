import { useState } from 'react';
import { DatasetPlan } from '../types';
import { sampleDatasets } from '../data';
import { Plus, Database, Image, FileText, Layers, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import StatusBadge from '../components/StatusBadge';

export default function DatasetBuilder() {
  const [datasets, setDatasets] = useState<DatasetPlan[]>(sampleDatasets);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', classToken: '', caption: '', resolution: '512', count: '50' });

  const handleCreate = () => {
    if (!form.name || !form.classToken) { toast.error("Name and class token required"); return; }
    const ds: DatasetPlan = {
      id: `ds-${Date.now()}`,
      name: form.name,
      classToken: form.classToken,
      captionTemplate: form.caption || `a photo of ${form.classToken}, {pose}, {background}`,
      resolution: parseInt(form.resolution),
      imageCount: parseInt(form.count),
      status: 'draft',
      createdAt: new Date().toISOString(),
    };
    setDatasets([ds, ...datasets]);
    setOpen(false);
    toast.success(`Dataset "${ds.name}" created`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground neon-text mb-2">
            Dataset Builder
          </h1>
          <p className="text-muted-foreground">
            Create dataset plans for LoRA training
          </p>
        </div>
        
        <button 
          onClick={() => setOpen(!open)}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-[0_0_15px_var(--color-primary)]"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Dataset
        </button>
      </div>

      {open && (
        <div className="glass-card p-6 rounded-xl animate-in slide-in-from-top-4 fade-in duration-300 mb-8 border-primary/20">
          <h2 className="text-lg font-bold mb-4 flex items-center text-primary">
            <Database className="w-5 h-5 mr-2" />
            Create Dataset Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Dataset Name</label>
              <input 
                type="text"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. Cyberpunk Cityscapes"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Class Token</label>
              <input 
                type="text"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. cbrpnk"
                value={form.classToken}
                onChange={e => setForm(p => ({ ...p, classToken: e.target.value }))} 
              />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Caption Template</label>
              <input 
                type="text"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="a photo of {token}, {pose}, {background}"
                value={form.caption}
                onChange={e => setForm(p => ({ ...p, caption: e.target.value }))} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Resolution</label>
              <select 
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={form.resolution}
                onChange={e => setForm(p => ({ ...p, resolution: e.target.value }))}
              >
                <option value="512">512x512</option>
                <option value="768">768x768</option>
                <option value="1024">1024x1024</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Target Count</label>
              <input 
                type="number"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="50"
                value={form.count}
                onChange={e => setForm(p => ({ ...p, count: e.target.value }))} 
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-3">
            <button 
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreate}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-[0_0_10px_var(--color-primary)]"
            >
              Create Plan
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {datasets.map((ds) => (
          <div key={ds.id} className="glass-card rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shadow-inner">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground neon-text">{ds.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">token: {ds.classToken}</p>
                  </div>
                </div>
                <StatusBadge status={ds.status} />
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center">
                    <FileText className="w-3 h-3 mr-1" />
                    Caption Template
                  </h4>
                  <p className="text-sm text-foreground bg-black/20 p-2 rounded border border-white/5 font-mono break-all">
                    {ds.captionTemplate}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-white/5 pt-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Layers className="w-3 h-3 mr-1" />
                      {ds.imageCount} images
                    </span>
                    <span className="flex items-center">
                      <Image className="w-3 h-3 mr-1" />
                      {ds.resolution}px
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/20 p-3 flex justify-end space-x-2 border-t border-white/5">
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
