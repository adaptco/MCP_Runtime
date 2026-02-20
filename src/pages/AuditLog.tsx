import { useState } from 'react';
import { sampleAuditEvents } from '../data';
import { Activity, Search, Clock, User, Target } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function AuditLog() {
  const [filter, setFilter] = useState('');
  
  const filtered = sampleAuditEvents.filter(e => 
    !filter || 
    e.action.toLowerCase().includes(filter.toLowerCase()) || 
    e.details.toLowerCase().includes(filter.toLowerCase()) ||
    e.target.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground neon-text mb-2">
            Audit Log
          </h1>
          <p className="text-muted-foreground">
            Immutable append-only event log
          </p>
        </div>
        
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="Search logs..."
            value={filter}
            onChange={e => setFilter(e.target.value)} 
          />
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden border-primary/20">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-muted-foreground">
            <thead className="text-xs text-foreground uppercase bg-muted/50 border-b border-white/5">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Timestamp</th>
                <th scope="col" className="px-6 py-3 font-medium">Action</th>
                <th scope="col" className="px-6 py-3 font-medium">Target</th>
                <th scope="col" className="px-6 py-3 font-medium">Details</th>
                <th scope="col" className="px-6 py-3 font-medium">Actor</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((evt) => (
                <tr key={evt.id} className="bg-transparent border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-2 text-primary opacity-50 group-hover:opacity-100" />
                      {new Date(evt.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    <StatusBadge status={evt.action} />
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-foreground">
                    <div className="flex items-center">
                      <Target className="w-3 h-3 mr-2 text-muted-foreground" />
                      {evt.target}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground font-medium">
                    {evt.details}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-2 text-muted-foreground" />
                      {evt.actor}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filtered.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No audit events found matching "{filter}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
