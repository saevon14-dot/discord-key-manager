import { useQuery } from "@tanstack/react-query";
import { BotStatus } from "@shared/schema";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { data: botStatus } = useQuery<BotStatus>({
    queryKey: ["/api/bot/status"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m uptime`;
  };

  const navItems = [
    { id: "dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
    { id: "keys", icon: "fas fa-key", label: "Key Management" },
    { id: "roles", icon: "fas fa-users", label: "Role Settings" },
    { id: "bot", icon: "fas fa-robot", label: "Bot Configuration" },
    { id: "logs", icon: "fas fa-history", label: "Activity Logs" },
  ];

  return (
    <div className="w-64 galaxy-card border-r border-galaxy-border flex flex-col">
      {/* Logo/Title */}
      <div className="p-6 border-b border-galaxy-border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-galaxy-purple to-galaxy-blue rounded-xl flex items-center justify-center shadow-lg animate-pulse-galaxy relative overflow-hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-galaxy-star rounded-full flex items-center justify-center font-bold text-galaxy-deep-space text-sm">
              S
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-float"></div>
          </div>
          <div>
            <h1 className="font-bold text-lg text-galaxy-text">Straves</h1>
            <p className="text-galaxy-muted text-sm">Key Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id
                ? "bg-gradient-to-r from-galaxy-purple to-galaxy-blue text-white shadow-lg galaxy-shimmer"
                : "text-galaxy-text hover:bg-galaxy-cosmic hover:shadow-md"
            }`}
          >
            <i className={item.icon}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bot Status */}
      <div className="p-4 border-t border-galaxy-border">
        <div className="flex items-center space-x-3 galaxy-card rounded-xl p-4">
          <div
            className={`w-3 h-3 rounded-full ${
              botStatus?.online ? "bg-galaxy-star animate-pulse-galaxy" : "bg-red-500"
            }`}
          ></div>
          <div>
            <p className="text-galaxy-text font-medium">
              {botStatus?.online ? "Bot Online" : "Bot Offline"}
            </p>
            <p className="text-galaxy-muted text-sm">
              {botStatus?.online ? formatUptime(botStatus.uptime) : "Not running"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
