import StatsCards from '../components/StatsCards';
import AvatarHero from '../components/AvatarHero';
import StatusBadge from '../components/StatusBadge';
import { sampleBlueprint, sampleAuditEvents } from '../data';
import { Activity, Clock } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground neon-text mb-2">
            MCP Avatar Forge
          </h1>
          <p className="text-muted-foreground">
            Manage token capsules, generate avatars, and train LoRA models
          </p>
        </div>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hero Preview */}
        <div className="lg:col-span-2">
          <AvatarHero avatar={sampleBlueprint} />
        </div>

        {/* Recent Activity */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Recent Activity
            </h2>
          </div>
          
          <div className="space-y-4">
            {sampleAuditEvents.slice(0, 5).map((evt, i) => (
              <div key={i} className="flex items-start space-x-3 pb-4 border-b border-white/5 last:border-0 last:pb-0 group">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {evt.details}
                  </p>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground font-mono">
                    <StatusBadge status={evt.action.split('.')[0]} />
                    <span className="mx-2">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(evt.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
