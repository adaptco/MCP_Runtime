import { AvatarBlueprint } from '../types';
import { cn } from '../lib/utils';
import { Bot, Sparkles, Activity } from 'lucide-react';

export default function AvatarHero({ avatar }: { avatar: AvatarBlueprint }) {
  return (
    <div className="relative glass-card rounded-xl p-8 overflow-hidden group hover:border-primary/50 transition-all duration-500">
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center space-x-6">
          {/* Avatar Preview */}
          <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(19,235,199,0.2)] group-hover:shadow-[0_0_50px_rgba(19,235,199,0.4)] transition-all">
            <Bot className="w-16 h-16 text-primary animate-pulse-glow" />
            <div className="absolute inset-0 border border-primary/20 rounded-2xl animate-ping opacity-20" />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground neon-text">
              {avatar.name}
            </h2>
            <p className="text-muted-foreground font-mono text-sm mt-1 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-warning" />
              {avatar.archetype}
            </p>
            <div className="flex items-center mt-4 space-x-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20 font-mono">
                {avatar.artStyle}
              </span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded border border-secondary/50 font-mono">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center justify-end text-success text-sm font-mono mb-1">
            <Activity className="w-4 h-4 mr-2 animate-pulse" />
            ONLINE
          </div>
          <p className="text-muted-foreground text-xs">Last active: Just now</p>
        </div>
      </div>

      {/* Personality Sliders */}
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Personality Matrix</h3>
          {avatar.personality.map((p) => (
            <div key={p.trait} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-foreground">{p.trait}</span>
                <span className="text-primary">{p.value}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                  style={{ width: `${p.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Palette */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Color Palette</h3>
          <div className="flex space-x-2">
            {avatar.palette.map((c, i) => (
              <div 
                key={i}
                className="w-12 h-12 rounded-lg border border-white/10 shadow-lg transform hover:scale-110 transition-transform cursor-pointer"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
