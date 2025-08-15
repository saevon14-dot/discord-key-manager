// GitHub Pages WebSocket Hook - Uses local storage events for real-time updates
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

const IS_GITHUB_PAGES = window.location.hostname.includes('github.io');

export function useWebSocketPages() {
  const queryClient = useQueryClient();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!IS_GITHUB_PAGES) {
      // Use normal WebSocket when not on GitHub Pages
      const ws = new WebSocket(
        `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}`
      );

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("WebSocket message:", message);

        // Invalidate relevant queries based on message type
        if (message.type === "bot_status") {
          queryClient.invalidateQueries({ queryKey: ["/bot/status"] });
        } else if (message.type === "key_added" || message.type === "key_removed") {
          queryClient.invalidateQueries({ queryKey: ["/keys"] });
          queryClient.invalidateQueries({ queryKey: ["/dashboard/stats"] });
        } else if (message.type === "role_added" || message.type === "role_removed") {
          queryClient.invalidateQueries({ queryKey: ["/roles"] });
        } else if (message.type === "setting_updated") {
          queryClient.invalidateQueries({ queryKey: ["/settings"] });
        } else if (message.type.includes("log")) {
          queryClient.invalidateQueries({ queryKey: ["/logs"] });
        }
      };

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };

      return () => {
        ws.close();
      };
    } else {
      // GitHub Pages mode - simulate real-time updates with periodic refresh
      intervalRef.current = setInterval(() => {
        // Simulate bot status updates
        const botStatus = JSON.parse(localStorage.getItem('discord-keys-botStatus') || '{}');
        if (botStatus.online) {
          const updatedStatus = {
            ...botStatus,
            uptime: botStatus.uptime ? botStatus.uptime + 30 : 30,
            latency: 80 + Math.floor(Math.random() * 20) // Random latency 80-100ms
          };
          localStorage.setItem('discord-keys-botStatus', JSON.stringify(updatedStatus));
          queryClient.invalidateQueries({ queryKey: ["/bot/status"] });
        }

        // Simulate dashboard stats updates
        queryClient.invalidateQueries({ queryKey: ["/dashboard/stats"] });
      }, 30000); // Update every 30 seconds

      // Listen for storage changes (for multi-tab sync)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key?.startsWith('discord-keys-')) {
          const resource = e.key.replace('discord-keys-', '');
          queryClient.invalidateQueries({ queryKey: [`/${resource}`] });
        }
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [queryClient]);

  return IS_GITHUB_PAGES ? 'github-pages' : 'websocket';
}