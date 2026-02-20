import { cn } from '../lib/utils';

const STATUS_STYLES: Record<string, string> = {
  active: "bg-success/15 text-success border-success/30",
  idle: "bg-primary/15 text-primary border-primary/30",
  walk: "bg-warning/15 text-warning border-warning/30",
  interact: "bg-neon-purple/15 text-neon-purple border-neon-purple/30",
  expired: "bg-muted text-muted-foreground border-border",
  revoked: "bg-destructive/15 text-destructive border-destructive/30",
  rotating: "bg-warning/15 text-warning border-warning/30 animate-pulse-glow",
  pending: "bg-muted text-muted-foreground border-border",
  running: "bg-primary/15 text-primary border-primary/30 animate-pulse-glow",
  succeeded: "bg-success/15 text-success border-success/30",
  failed: "bg-destructive/15 text-destructive border-destructive/30",
  draft: "bg-muted text-muted-foreground border-border",
  processing: "bg-primary/15 text-primary border-primary/30 animate-pulse-glow",
  ready: "bg-success/15 text-success border-success/30",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-sm",
        STATUS_STYLES[status.toLowerCase()] || "bg-muted text-muted-foreground"
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {status}
    </span>
  );
}
