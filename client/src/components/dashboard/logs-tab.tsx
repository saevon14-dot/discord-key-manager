import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Key, UserPlus, Trash2, Bot } from "lucide-react";
import { ActivityLog } from "@shared/schema";

export default function LogsTab() {
  const [filter, setFilter] = useState("all");

  const { data: logs, isLoading, refetch } = useQuery<ActivityLog[]>({
    queryKey: ["/api/logs"],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "key_generated":
        return <Key className="w-4 h-4 text-discord-green" />;
      case "role_added":
      case "role_updated":
        return <UserPlus className="w-4 h-4 text-discord-primary" />;
      case "key_removed":
      case "keys_cleanup":
        return <Trash2 className="w-4 h-4 text-discord-yellow" />;
      case "bot_started":
      case "bot_stopped":
        return <Bot className="w-4 h-4 text-discord-green" />;
      default:
        return <Key className="w-4 h-4 text-discord-green" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "key_generated":
        return "bg-discord-green bg-opacity-20";
      case "role_added":
      case "role_updated":
        return "bg-discord-primary bg-opacity-20";
      case "key_removed":
      case "keys_cleanup":
        return "bg-discord-yellow bg-opacity-20";
      case "bot_started":
      case "bot_stopped":
        return "bg-discord-green bg-opacity-20";
      default:
        return "bg-discord-green bg-opacity-20";
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const getActivityTitle = (type: string) => {
    switch (type) {
      case "key_generated":
        return "Key Generated";
      case "role_added":
        return "Role Added";
      case "role_updated":
        return "Role Updated";
      case "role_removed":
        return "Role Removed";
      case "key_removed":
        return "Key Removed";
      case "keys_cleanup":
        return "Keys Cleaned Up";
      case "keys_added":
        return "Keys Added";
      case "bot_started":
        return "Bot Started";
      case "bot_stopped":
        return "Bot Stopped";
      default:
        return "Activity";
    }
  };

  const filteredLogs = logs?.filter((log) => {
    if (filter === "all") return true;
    if (filter === "keys") return log.type.includes("key");
    if (filter === "roles") return log.type.includes("role");
    if (filter === "bot") return log.type.includes("bot");
    return true;
  }) || [];

  return (
    <Card className="bg-discord-darker border-discord-dark">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Activity Logs</h3>
          <div className="flex items-center space-x-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="bg-discord-dark border-discord-dark text-white w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-discord-dark border-discord-dark">
                <SelectItem value="all" className="text-white">All Activities</SelectItem>
                <SelectItem value="keys" className="text-white">Key Events</SelectItem>
                <SelectItem value="roles" className="text-white">Role Changes</SelectItem>
                <SelectItem value="bot" className="text-white">Bot Events</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              className="text-discord-text hover:bg-discord-dark"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-8 text-discord-muted">Loading activity logs...</div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-discord-muted">No activity logs found</div>
          ) : (
            filteredLogs.map((log: any) => (
              <div
                key={log.id}
                className="flex items-start space-x-3 p-3 bg-discord-dark rounded-lg hover:bg-discord-darkest transition-colors"
              >
                <div className={`w-8 h-8 ${getActivityColor(log.type)} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                  {getActivityIcon(log.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{getActivityTitle(log.type)}</p>
                    <span className="text-discord-muted text-xs">{formatTimeAgo(log.createdAt)}</span>
                  </div>
                  <p className="text-discord-muted text-sm">{log.message}</p>
                  {log.details && (
                    <div className="text-discord-muted text-xs mt-1">
                      {log.serverId && `Server: ${log.serverId}`}
                      {log.channelId && ` • Channel: ${log.channelId}`}
                      {log.details.keyType && ` • Type: ${log.details.keyType}`}
                      {log.details.count && ` • Count: ${log.details.count}`}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
