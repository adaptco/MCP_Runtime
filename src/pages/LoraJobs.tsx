import { useState } from 'react';
import { LoraJob } from '../types';
import { sampleLoraJobs, sampleDatasets } from '../data';
import { Plus, Cpu, Activity, Play, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import StatusBadge from '../components/StatusBadge';

export default function LoraJobs() {
  const [jobs, setJobs] = useState<LoraJob[]>(sampleLoraJobs);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', baseModel: 'SDXL 1.0', rank: '128', alpha: '128', steps: '2000', lr: '0.0001', datasetId: '' });

  const handleCreate = () => {
    if (!form.name) { toast.error("Job name required"); return; }
    const job: LoraJob = {
      id: `lora-${Date.now()}`,
      name: form.name,
      baseModel: form.baseModel,
      rank: parseInt(form.rank),
      alpha: parseInt(form.alpha),
      steps: parseInt(form.steps),
      lr: parseFloat(form.lr),
      status: 'pending',
      progress: 0,
      createdAt: new Date().toISOString(),
      datasetId: form.datasetId || 'ds-001',
    };
    setJobs([job, ...jobs]);
    setOpen(false);
    toast.success(`LoRA job "${job.name}" queued`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground neon-text mb-2">
            LoRA Jobs
          </h1>
          <p className="text-muted-foreground">
            Configure and monitor LoRA training jobs
          </p>
        </div>
        
        <button 
          onClick={() => setOpen(!open)}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-[0_0_15px_var(--color-primary)]"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Job
        </button>
      </div>

      {open && (
        <div className="glass-card p-6 rounded-xl animate-in slide-in-from-top-4 fade-in duration-300 mb-8 border-primary/20">
          <h2 className="text-lg font-bold mb-4 flex items-center text-primary">
            <Cpu className="w-5 h-5 mr-2" />
            Create LoRA Job
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Job Name</label>
              <input 
                type="text"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. Neon Noir Style"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Base Model</label>
              <input 
                type="text"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. SDXL 1.0"
                value={form.baseModel}
                onChange={e => setForm(p => ({ ...p, baseModel: e.target.value }))} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Rank</label>
                <input 
                  type="number"
                  className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={form.rank}
                  onChange={e => setForm(p => ({ ...p, rank: e.target.value }))} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Alpha</label>
                <input 
                  type="number"
                  className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={form.alpha}
                  onChange={e => setForm(p => ({ ...p, alpha: e.target.value }))} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Steps</label>
                <input 
                  type="number"
                  className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={form.steps}
                  onChange={e => setForm(p => ({ ...p, steps: e.target.value }))} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Learning Rate</label>
                <input 
                  type="number"
                  step="0.0001"
                  className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={form.lr}
                  onChange={e => setForm(p => ({ ...p, lr: e.target.value }))} 
                />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Dataset</label>
              <select 
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={form.datasetId}
                onChange={e => setForm(p => ({ ...p, datasetId: e.target.value }))}
              >
                <option value="">Select Dataset</option>
                {sampleDatasets.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
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
              Queue Job
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="glass-card p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-primary/30 transition-all">
            <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-1/3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xl shadow-inner relative overflow-hidden">
                <Cpu className="w-6 h-6 text-primary relative z-10" />
                {job.status === 'running' && (
                  <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-foreground">{job.name}</h3>
                <p className="text-xs text-muted-foreground font-mono">{job.baseModel}</p>
              </div>
            </div>

            <div className="flex-1 w-full md:w-auto md:px-8 mb-4 md:mb-0">
              <div className="flex items-center justify-between mb-2">
                <StatusBadge status={job.status} />
                {job.status === 'succeeded' && (
                  <span className="text-xs text-success flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </span>
                )}
              </div>
              
              {(job.status === 'running' || job.status === 'succeeded') && (
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000 ease-out",
                      job.status === 'succeeded' ? "bg-success" : "bg-primary animate-pulse-glow"
                    )}
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
              )}
              
              {(job.status === 'running' || job.status === 'succeeded') && (
                <div className="flex justify-between mt-1 text-[10px] font-mono text-muted-foreground">
                  <span>Progress</span>
                  <span>{job.progress}%</span>
                </div>
              )}
            </div>

            <div className="w-full md:w-auto flex items-center justify-between md:justify-end space-x-6 text-xs font-mono text-muted-foreground">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span>rank: {job.rank}</span>
                <span>α: {job.alpha}</span>
                <span>steps: {job.steps}</span>
                <span>lr: {job.lr}</span>
              </div>
              
              <div className="flex space-x-2">
                {job.status === 'pending' && (
                  <button className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-lg transition-colors">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
