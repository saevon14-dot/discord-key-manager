import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Key, TrendingUp, Users, Activity } from "lucide-react";
import { DashboardStats, ActivityLog } from "@shared/schema";

export default function DashboardTab() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: logs } = useQuery<ActivityLog[]>({
    queryKey: ["/api/logs"],
    select: (data: ActivityLog[]) => data.slice(0, 3), // Get latest 3 logs
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="galaxy-card rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-galaxy-cosmic rounded mb-2"></div>
              <div className="h-8 bg-galaxy-cosmic rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Keys",
      value: stats?.totalKeys || 0,
      icon: Key,
      iconBg: "bg-galaxy-purple bg-opacity-20",
      iconColor: "text-galaxy-purple",
    },
    {
      title: "Keys Generated Today",
      value: stats?.todayGenerated || 0,
      icon: TrendingUp,
      iconBg: "bg-galaxy-star bg-opacity-20",
      iconColor: "text-galaxy-star",
    },
    {
      title: "Active Roles",
      value: stats?.activeRoles || 0,
      icon: Users,
      iconBg: "bg-galaxy-blue bg-opacity-20",
      iconColor: "text-galaxy-blue",
    },
    {
      title: "Bot Uptime",
      value: stats?.uptime || "Offline",
      icon: Activity,
      iconBg: "bg-green-500 bg-opacity-20",
      iconColor: "text-green-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-discord-darker border-discord-dark">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-discord-muted text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Key Pool Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-discord-darker border-discord-dark">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {logs && logs.length > 0 ? (
                logs.map((log: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-discord-dark rounded-lg">
                    <div className="w-10 h-10 bg-discord-green bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Key className="w-4 h-4 text-discord-green" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{log.message}</p>
                      <p className="text-discord-muted text-sm">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-discord-muted text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Key Pool Status */}
        <Card className="bg-discord-darker border-discord-dark">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Pool Status</h3>
            <div className="space-y-4">
              {stats?.keyPools ? (
                Object.entries(stats.keyPools).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between p-3 bg-discord-dark rounded-lg">
                    <span className="text-discord-text capitalize">
                      {type === "3month" ? "3 Month Keys" : type === "6month" ? "6 Month Keys" : `${type} Keys`}
                    </span>
                    <span className="text-white font-semibold">{count}</span>
                  </div>
                ))
              ) : (
                <p className="text-discord-muted text-center py-4">No key data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
