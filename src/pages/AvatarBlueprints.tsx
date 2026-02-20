import { useState } from 'react';
import { AvatarBlueprint } from '../types';
import { sampleBlueprint } from '../data';
import { Plus, Bot, Link, Palette, Sparkles, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import StatusBadge from '../components/StatusBadge';

export default function AvatarBlueprints() {
  const [avatars, setAvatars] = useState<AvatarBlueprint[]>([sampleBlueprint]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', archetype: '', artStyle: 'pixel' as const });

  const handleCreate = () => {
    if (!form.name || !form.archetype) { toast.error("Name and archetype required"); return; }
    const avatar: AvatarBlueprint = {
      id: `av-${Date.now()}`,
      name: form.name,
      archetype: form.archetype,
      artStyle: form.artStyle,
      palette: ['#0ABAB5', '#1a1a2e', '#16213e', '#0f3460', '#e94560'],
      personality: [
        { trait: 'Analytical', value: Math.floor(Math.random() * 40) + 60 },
        { trait: 'Creative', value: Math.floor(Math.random() * 40) + 60 },
        { trait: 'Leadership', value: Math.floor(Math.random() * 40) + 60 },
      ],
      linkedCapsules: [],
      status: 'idle',
      createdAt: new Date().toISOString(),
    };
    setAvatars([avatar, ...avatars]);
    setOpen(false);
    toast.success(`Avatar "${avatar.name}" created`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground neon-text mb-2">
            Avatar Blueprints
          </h1>
          <p className="text-muted-foreground">
            Design avatar archetypes linked to token capsules
          </p>
        </div>
        
        <button 
          onClick={() => setOpen(!open)}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-[0_0_15px_var(--color-primary)]"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Avatar
        </button>
      </div>

      {open && (
        <div className="glass-card p-6 rounded-xl animate-in slide-in-from-top-4 fade-in duration-300 mb-8 border-primary/20">
          <h2 className="text-lg font-bold mb-4 flex items-center text-primary">
            <Bot className="w-5 h-5 mr-2" />
            Create Avatar Blueprint
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <input 
                type="text"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. AE-101-LA"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Archetype</label>
              <input 
                type="text"
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. Lead Architect"
                value={form.archetype}
                onChange={e => setForm(p => ({ ...p, archetype: e.target.value }))} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Art Style</label>
              <select 
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={form.artStyle}
                onChange={e => setForm(p => ({ ...p, artStyle: e.target.value as any }))}
              >
                <option value="pixel">Pixel Art</option>
                <option value="3d">3D Render</option>
                <option value="anime">Anime</option>
                <option value="realistic">Realistic</option>
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
              Create Blueprint
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {avatars.map((av) => (
          <div key={av.id} className="glass-card rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(19,235,199,0.2)]">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground neon-text">{av.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono flex items-center">
                      <Sparkles className="w-3 h-3 mr-1 text-warning" />
                      {av.archetype} • {av.artStyle}
                    </p>
                  </div>
                </div>
                <StatusBadge status={av.status} />
              </div>
              
              <div className="space-y-4 mt-6">
                {/* Personality */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Personality Matrix</h4>
                  {av.personality.map(p => (
                    <div key={p.trait} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-foreground">{p.trait}</span>
                        <span className="text-primary">{p.value}%</span>
                      </div>
                      <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${p.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Linked capsules */}
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-white/5 pt-4">
                  <div className="flex items-center">
                    <Link className="w-3 h-3 mr-1" />
                    {av.linkedCapsules.length > 0 ? (
                      <span className="text-foreground">{av.linkedCapsules.length} linked capsule(s)</span>
                    ) : (
                      <span>No linked capsules</span>
                    )}
                  </div>
                </div>

                {/* Palette */}
                <div className="flex items-center space-x-1 pt-2">
                  <Palette className="w-3 h-3 mr-2 text-muted-foreground" />
                  {av.palette.map((c, j) => (
                    <div 
                      key={j}
                      className="w-4 h-4 rounded-full border border-white/10"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
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
