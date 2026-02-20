import { useState, ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Key, 
  Users, 
  Database, 
  Cpu, 
  Settings, 
  Activity, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Token Capsules", icon: Key, path: "/capsules" },
  { label: "Avatar Blueprints", icon: Users, path: "/avatars" },
  { label: "Dataset Builder", icon: Database, path: "/datasets" },
  { label: "LoRA Jobs", icon: Cpu, path: "/lora" },
  { label: "MCP Settings", icon: Settings, path: "/settings" },
  { label: "Audit Log", icon: Activity, path: "/audit" },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <div 
        className={cn(
          "flex flex-col border-r border-border bg-card/50 backdrop-blur-xl transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-border">
          <div className="w-8 h-8 bg-primary rounded-lg shadow-[0_0_15px_var(--color-primary)] flex items-center justify-center">
            <Cpu className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="ml-3 font-mono font-bold tracking-tighter">
              <span className="text-primary">MCP Avatar</span>
              <span className="block text-xs text-muted-foreground">FORGE v1.0</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 mx-2 rounded-lg transition-all group relative overflow-hidden",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(19,235,199,0.1)]" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_var(--color-primary)]" />
                )}
                <item.icon className={cn("w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && (
                  <span className="font-medium text-sm tracking-wide">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-border">
          <NavLink
            to="/auth"
            className={cn(
              "flex items-center justify-center h-12 text-muted-foreground hover:text-destructive transition-colors",
              collapsed ? "px-0" : "px-4 justify-start"
            )}
          >
            <LogOut className={cn("w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
            {!collapsed && <span className="font-medium text-sm tracking-wide">Sign Out</span>}
          </NavLink>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center h-12 border-t border-border text-muted-foreground hover:text-foreground transition-colors w-full"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
        <div className="relative z-10 p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
