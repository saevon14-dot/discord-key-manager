import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { Play, Pause, Eye, EyeOff } from "lucide-react";
import { BotStatus, Setting } from "@shared/schema";

export default function BotTab() {
  const [botToken, setBotToken] = useState("");
  const [commandPrefix, setCommandPrefix] = useState("!");
  const [showToken, setShowToken] = useState(false);
  const { toast } = useToast();

  const { data: botStatus } = useQuery<BotStatus>({
    queryKey: ["/api/bot/status"],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const { data: settings } = useQuery<Setting[], Error, Record<string, string>>({
    queryKey: ["/api/settings"],
    select: (data: Setting[]) => {
      const settingsMap: Record<string, string> = {};
      data.forEach((setting) => {
        settingsMap[setting.key] = setting.value;
      });
      return settingsMap;
    },
  });

  useEffect(() => {
    if (settings) {
      if (settings.discord_bot_token) {
        setBotToken(settings.discord_bot_token);
      }
      if (settings.command_prefix) {
        setCommandPrefix(settings.command_prefix);
      }
    }
  }, [settings]);

  const startBotMutation = useMutation({
    mutationFn: async (token: string) => {
      return apiRequest("POST", "/api/bot/start", { token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bot/status"] });
      toast({
        title: "Success",
        description: "Bot started successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to start bot",
        variant: "destructive",
      });
    },
  });

  const stopBotMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/bot/stop");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bot/status"] });
      toast({
        title: "Success",
        description: "Bot stopped successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to stop bot",
        variant: "destructive",
      });
    },
  });

  const handleStartBot = () => {
    if (!botToken.trim()) {
      toast({
        title: "Error",
        description: "Please enter a bot token",
        variant: "destructive",
      });
      return;
    }

    startBotMutation.mutate(botToken);
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const commands = [
    {
      command: "!generatekey [type]",
      description: "Generate a key of specified type (day, week, month, etc.)",
    },
    {
      command: "!keycount [type]",
      description: "Check available keys of specified type",
    },
    {
      command: "!botstats",
      description: "Display bot statistics and uptime",
    },
    {
      command: "!help",
      description: "Show all available commands",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bot Configuration */}
        <Card className="bg-discord-darker border-discord-dark">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Bot Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-discord-text text-sm font-medium mb-2">
                  Discord Bot Token
                </label>
                <div className="relative">
                  <Input
                    type={showToken ? "text" : "password"}
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    placeholder="Your bot token here..."
                    className="bg-discord-dark border-discord-dark text-white pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-discord-muted hover:text-white h-8 w-8 p-0"
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-discord-text text-sm font-medium mb-2">
                  Command Prefix
                </label>
                <Input
                  value={commandPrefix}
                  onChange={(e) => setCommandPrefix(e.target.value)}
                  placeholder="!"
                  className="bg-discord-dark border-discord-dark text-white"
                />
              </div>

              <Button
                onClick={handleStartBot}
                disabled={startBotMutation.isPending || botStatus?.online}
                className="w-full bg-discord-primary hover:bg-blue-600 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                {startBotMutation.isPending ? "Starting..." : "Start Bot"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bot Status */}
        <Card className="bg-discord-darker border-discord-dark">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Bot Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-discord-dark rounded-lg">
                <span className="text-discord-text">Status</span>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      botStatus?.online ? "bg-discord-green animate-pulse-discord" : "bg-discord-red"
                    }`}
                  ></div>
                  <span
                    className={`font-medium ${
                      botStatus?.online ? "text-discord-green" : "text-discord-red"
                    }`}
                  >
                    {botStatus?.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-discord-dark rounded-lg">
                <span className="text-discord-text">Uptime</span>
                <span className="text-white font-medium">
                  {botStatus?.online ? formatUptime(botStatus.uptime) : "0h 0m 0s"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-discord-dark rounded-lg">
                <span className="text-discord-text">Server Count</span>
                <span className="text-white font-medium">{botStatus?.serverCount || 0}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-discord-dark rounded-lg">
                <span className="text-discord-text">Latency</span>
                <span className="text-white font-medium">{botStatus?.latency || 0}ms</span>
              </div>

              <Button
                onClick={() => stopBotMutation.mutate()}
                disabled={stopBotMutation.isPending || !botStatus?.online}
                className="w-full bg-discord-red hover:bg-red-600 text-white"
              >
                <Pause className="w-4 h-4 mr-2" />
                {stopBotMutation.isPending ? "Stopping..." : "Pause Bot"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bot Commands */}
      <Card className="bg-discord-darker border-discord-dark">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Available Commands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commands.map((cmd, index) => (
              <div key={index} className="bg-discord-dark rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">
                  <code className="text-discord-green">{cmd.command}</code>
                </h4>
                <p className="text-discord-muted text-sm">{cmd.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
