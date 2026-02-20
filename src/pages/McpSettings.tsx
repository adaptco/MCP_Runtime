import { useState } from 'react';
import { toast } from 'sonner';
import { Server, Copy, ShieldCheck, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

const mcpEndpoints = [
  { method: 'GET', path: '/v1/capsules', description: 'List all active token capsules', auth: 'Bearer' },
  { method: 'POST', path: '/v1/capsules', description: 'Create a new token capsule', auth: 'Bearer' },
  { method: 'GET', path: '/v1/avatars', description: 'List avatar blueprints', auth: 'Bearer' },
  { method: 'POST', path: '/v1/avatars/:id/generate', description: 'Generate avatar assets', auth: 'Bearer' },
  { method: 'POST', path: '/v1/lora/train', description: 'Queue a LoRA training job', auth: 'Bearer' },
];

export default function McpSettings() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground neon-text mb-2">
            MCP Settings
          </h1>
          <p className="text-muted-foreground">
            Model Context Protocol endpoint documentation
          </p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl border-primary/20">
        <div className="flex items-center mb-6">
          <Server className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-xl font-bold text-foreground">MCP Server API</h2>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Base URL</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-primary">
                https://api.avatarforge.dev/mcp
              </div>
              <button 
                onClick={() => { navigator.clipboard.writeText('https://api.avatarforge.dev/mcp'); toast.success("Copied!"); }}
                className="p-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-foreground mb-1">Security Note</h3>
              <p className="text-xs text-muted-foreground">
                All endpoints require Bearer token auth. Raw secrets are never returned — only ephemeral proxy references.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center">
          <Globe className="w-5 h-5 mr-2 text-primary" />
          Endpoints
        </h2>
        
        <div className="grid gap-4">
          {mcpEndpoints.map((ep, i) => (
            <div key={i} className="glass-card p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-primary/30 transition-all">
              <div className="flex items-center space-x-4 mb-2 md:mb-0 w-full md:w-auto">
                <span className={cn(
                  "px-2 py-1 rounded text-xs font-bold font-mono uppercase w-16 text-center",
                  ep.method === 'GET' ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-green-500/20 text-green-400 border border-green-500/30"
                )}>
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-foreground bg-black/20 px-2 py-1 rounded">{ep.path}</code>
              </div>
              
              <div className="flex-1 md:mx-8 text-sm text-muted-foreground">
                {ep.description}
              </div>
              
              <div className="flex items-center space-x-4 text-xs font-mono text-muted-foreground w-full md:w-auto justify-end mt-2 md:mt-0">
                <span className="flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Auth: {ep.auth}
                </span>
                <button 
                  onClick={() => { navigator.clipboard.writeText(ep.path); toast.success("Copied!"); }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
