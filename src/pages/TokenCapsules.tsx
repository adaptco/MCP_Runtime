import { useState } from 'react';
import { Capsule } from '../types';
import { sampleCapsules, PROVIDERS } from '../data';
import { Plus, Key, Shield, Tag, Copy, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import StatusBadge from '../components/StatusBadge';

export default function TokenCapsules() {
  const [capsules, setCapsules] = useState<Capsule[]>(sampleCapsules);
  const [open, setOpen] = useState(false);
  const [newCapsule, setNewCapsule] = useState({ provider: '', label: '', tags: '', scopes: '', uploadSecret: false });

  const handleCreate = () => {
    if (!newCapsule.provider || !newCapsule.label) {
      toast.error("Provider and label are required");
      return;
    }
    const fingerprint = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0')).join('');
    
    const capsule: Capsule = {
      id: `cap-${Date.now()}`,
      provider: newCapsule.provider,
      label: newCapsule.label,
      tags: newCapsule.tags.split(',').map(t => t.trim()).filter(Boolean),
      scopes: newCapsule.scopes.split(',').map(s => s.trim()).filter(Boolean),
      fingerprint,
      status: 'active',
      hasSecret: newCapsule.uploadSecret,
      createdAt: new Date().toISOString(),
      expiresAt: null,
      allowedOrigins: ['*'],
    };
    setCapsules([capsule, ...capsules]);
    setOpen(false);
    setNewCapsule({ provider: '', label: '', tags: '', scopes: '', uploadSecret: false });
    toast.success(`Token capsule "${capsule.label}" created`, {
      description: `Fingerprint: ${fingerprint.slice(0, 16)}...`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground neon-text mb-2">
            Token Capsules
          </h1>
          <p className="text-muted-foreground">
            Manage encrypted API credentials as non-reversible capsules
          </p>
        </div>
        
        <button 
          onClick={() => setOpen(!open)}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-[0_0_15px_var(--color-primary)]"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Capsule
        </button>
      </div>

      {open && (
        <div className="glass-card p-6 rounded-xl animate-in slide-in-from-top-4 fade-in duration-300 mb-8 border-primary/20">
          <h2 className="text-lg font-bold mb-4 flex items-center text-primary">
            <Shield className="w-5 h-5 mr-2" />
            Create Token Capsule
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Provider</label>
              <select 
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={newCapsule.provider}
                onChange={e => setNewCapsule(p => ({ ...p, provider: e.target.value }))}
              >
                <option value="">Select Provider</option>
                {PROVIDERS.map(p => (
                  <option key={p.name} value={p.name}>{p.icon} {p.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Label</label>
              <input 
                type="text"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. Production GPT-4"
                value={newCapsule.label}
                onChange={e => setNewCapsule(p => ({ ...p, label: e.target.value }))} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Tags (comma separated)</label>
              <input 
                type="text"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="prod, chatbot"
                value={newCapsule.tags}
                onChange={e => setNewCapsule(p => ({ ...p, tags: e.target.value }))} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Scopes (comma separated)</label>
              <input 
                type="text"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="completion, embedding"
                value={newCapsule.scopes}
                onChange={e => setNewCapsule(p => ({ ...p, scopes: e.target.value }))} 
              />
            </div>
            
            <div className="md:col-span-2 flex items-center space-x-3 p-4 bg-muted/20 rounded-lg border border-border/50">
              <input 
                type="checkbox"
                id="uploadSecret"
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                checked={newCapsule.uploadSecret}
                onChange={e => setNewCapsule(p => ({ ...p, uploadSecret: e.target.checked }))} 
              />
              <div className="flex-1">
                <label htmlFor="uploadSecret" className="text-sm font-medium text-foreground block">Upload Secret</label>
                <p className="text-xs text-muted-foreground">Store encrypted secret server-side. Otherwise metadata + fingerprint only.</p>
              </div>
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
              Create Capsule
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {capsules.map((cap) => (
          <div key={cap.id} className="glass-card p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-primary/30 transition-all">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shadow-inner">
                {PROVIDERS.find(p => p.name === cap.provider)?.icon || '🔑'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-foreground">{cap.label}</h3>
                  <StatusBadge status={cap.status} />
                </div>
                <p className="text-sm text-muted-foreground font-mono">{cap.provider}</p>
              </div>
            </div>

            <div className="flex-1 md:mx-8 w-full md:w-auto space-y-2 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-8 text-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">SHA-256 Fingerprint</span>
                  <div className="flex items-center font-mono text-xs bg-black/20 px-2 py-1 rounded border border-white/5">
                    <span className="truncate max-w-[150px] text-primary/80">{cap.fingerprint}</span>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(cap.fingerprint); toast.success("Copied!"); }}
                      className="ml-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {cap.tags.map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-secondary text-secondary-foreground text-[10px] rounded border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Meta</span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {cap.hasSecret ? <span className="text-success flex items-center"><Shield className="w-3 h-3 mr-1" /> Secret stored</span> : <span className="text-warning flex items-center"><Tag className="w-3 h-3 mr-1" /> Metadata only</span>}
                    <span className="mx-2">•</span>
                    <span>{cap.scopes.length} scopes</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0 w-full md:w-auto justify-end">
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
