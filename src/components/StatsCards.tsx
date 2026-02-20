import { Key, User, Database, Cpu } from 'lucide-react';
import { sampleCapsules, sampleDatasets, sampleLoraJobs } from '../data';

const stats = [
  {
    label: "Active Capsules",
    value: sampleCapsules.filter(c => c.status === 'active').length,
    icon: Key,
    detail: `${sampleCapsules.filter(c => c.status === 'active').length} active`,
  },
  {
    label: "Avatars",
    value: 1,
    icon: User,
    detail: "1 blueprint",
  },
  {
    label: "Datasets",
    value: sampleDatasets.length,
    detail: `${sampleDatasets.filter(d => d.status === 'ready').length} ready`,
    icon: Database,
  },
  {
    label: "LoRA Jobs",
    value: sampleLoraJobs.length,
    icon: Cpu,
    detail: `${sampleLoraJobs.filter(j => j.status === 'running').length} running`,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((s, i) => (
        <div key={i} className="glass-card p-6 rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <s.icon className="w-16 h-16 text-primary" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {s.label}
            </h3>
            <div className="text-3xl font-bold text-foreground neon-text mb-1">
              {s.value}
            </div>
            <p className="text-xs text-primary font-mono">
              {s.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
