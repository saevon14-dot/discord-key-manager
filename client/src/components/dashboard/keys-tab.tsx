import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Download, RefreshCw, Trash2, Search } from "lucide-react";
import { Key, DashboardStats } from "@shared/schema";

export default function KeysTab() {
  const [activeKeyTab, setActiveKeyTab] = useState("day");
  const [newKeyType, setNewKeyType] = useState("day");
  const [newKeys, setNewKeys] = useState("");
  const [customName, setCustomName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const keyTypes = [
    { id: "day", label: "Day Keys" },
    { id: "week", label: "Week Keys" },
    { id: "month", label: "Month Keys" },
    { id: "3month", label: "3 Month" },
    { id: "6month", label: "6 Month" },
    { id: "lifetime", label: "Lifetime" },
    { id: "custom", label: "Custom" },
  ];

  const { data: keys, isLoading } = useQuery<Key[]>({
    queryKey: ["/api/keys", { type: activeKeyTab }],
  });

  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const addKeysMutation = useMutation({
    mutationFn: async (data: { type: string; customName?: string; keys: string[] }) => {
      return apiRequest("POST", "/api/keys", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/keys"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      setNewKeys("");
      setCustomName("");
      toast({
        title: "Success",
        description: "Keys added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add keys",
        variant: "destructive",
      });
    },
  });

  const removeKeyMutation = useMutation({
    mutationFn: async (keyId: string) => {
      return apiRequest("DELETE", `/api/keys/${keyId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/keys"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({
        title: "Success",
        description: "Key removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove key",
        variant: "destructive",
      });
    },
  });

  const cleanupKeysMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/keys/cleanup");
    },
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/keys"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({
        title: "Success",
        description: `Removed ${response.removed} expired keys`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to cleanup keys",
        variant: "destructive",
      });
    },
  });

  const handleAddKeys = () => {
    if (!newKeys.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one key",
        variant: "destructive",
      });
      return;
    }

    const keysList = newKeys
      .split("\n")
      .map((key) => key.trim())
      .filter((key) => key.length > 0);

    addKeysMutation.mutate({
      type: newKeyType,
      customName: newKeyType === "custom" ? customName : undefined,
      keys: keysList,
    });
  };

  const filteredKeys = keys?.filter((key) =>
    key.key.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const currentKeyCount = stats?.keyPools?.[activeKeyTab as keyof typeof stats.keyPools] || 0;

  return (
    <div className="space-y-6">
      {/* Key Category Tabs */}
      <Card className="bg-discord-darker border-discord-dark">
        <CardContent className="p-2">
          <div className="flex space-x-1">
            {keyTypes.map((type) => (
              <Button
                key={type.id}
                variant={activeKeyTab === type.id ? "default" : "ghost"}
                onClick={() => setActiveKeyTab(type.id)}
                className={`px-4 py-2 ${
                  activeKeyTab === type.id
                    ? "bg-discord-primary text-white"
                    : "text-discord-text hover:bg-discord-dark"
                }`}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Management Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Keys */}
        <Card className="bg-discord-darker border-discord-dark">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Add Keys</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-discord-text text-sm font-medium mb-2">Key Type</label>
                <Select value={newKeyType} onValueChange={setNewKeyType}>
                  <SelectTrigger className="bg-discord-dark border-discord-dark text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-discord-dark border-discord-dark">
                    {keyTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id} className="text-white">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {newKeyType === "custom" && (
                <div>
                  <label className="block text-discord-text text-sm font-medium mb-2">Custom Name</label>
                  <Input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Enter custom key type name"
                    className="bg-discord-dark border-discord-dark text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-discord-text text-sm font-medium mb-2">Keys (one per line)</label>
                <Textarea
                  value={newKeys}
                  onChange={(e) => setNewKeys(e.target.value)}
                  placeholder="KEY-1234-ABCD-5678&#10;KEY-5678-EFGH-9012&#10;KEY-9012-IJKL-3456"
                  className="bg-discord-dark border-discord-dark text-white h-32 resize-none"
                />
              </div>
              
              <Button
                onClick={handleAddKeys}
                disabled={addKeysMutation.isPending}
                className="w-full bg-discord-primary hover:bg-blue-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                {addKeysMutation.isPending ? "Adding..." : "Add Keys"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        <Card className="bg-discord-darker border-discord-dark">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Bulk Actions</h3>
            <div className="space-y-4">
              <Button className="w-full bg-discord-green hover:bg-green-600 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export All Keys
              </Button>
              
              <Button className="w-full bg-discord-yellow hover:bg-yellow-600 text-black">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Key Pools
              </Button>
              
              <Button
                onClick={() => cleanupKeysMutation.mutate()}
                disabled={cleanupKeysMutation.isPending}
                className="w-full bg-discord-red hover:bg-red-600 text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {cleanupKeysMutation.isPending ? "Cleaning..." : "Clear Expired Keys"}
              </Button>

              <div className="bg-discord-dark rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Quick Stats</h4>
                <div className="text-sm text-discord-muted space-y-1">
                  <div className="flex justify-between">
                    <span>Total Keys Available:</span>
                    <span>{stats?.totalAvailable || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Keys Used Today:</span>
                    <span>{stats?.usedToday || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Keys Added Today:</span>
                    <span>{stats?.addedToday || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key List */}
      <Card className="bg-discord-darker border-discord-dark">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {keyTypes.find(t => t.id === activeKeyTab)?.label} ({currentKeyCount} available)
            </h3>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search keys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-discord-dark border-discord-dark text-white"
              />
              <Button variant="ghost" className="text-discord-text hover:bg-discord-dark">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-discord-dark">
                  <th className="text-left py-3 px-4 text-discord-muted font-medium">Key</th>
                  <th className="text-left py-3 px-4 text-discord-muted font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-discord-muted font-medium">Added</th>
                  <th className="text-left py-3 px-4 text-discord-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-discord-muted">
                      Loading keys...
                    </td>
                  </tr>
                ) : filteredKeys.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-discord-muted">
                      No keys found
                    </td>
                  </tr>
                ) : (
                  filteredKeys.map((key: any) => (
                    <tr key={key.id} className="border-b border-discord-dark hover:bg-discord-dark transition-colors">
                      <td className="py-3 px-4">
                        <code className="text-discord-green text-sm">{key.key}</code>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={key.status === "available" ? "default" : "secondary"}
                          className={`${
                            key.status === "available"
                              ? "bg-discord-green bg-opacity-20 text-discord-green"
                              : "bg-discord-red bg-opacity-20 text-discord-red"
                          }`}
                        >
                          {key.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-discord-muted text-sm">
                        {new Date(key.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeKeyMutation.mutate(key.id)}
                          disabled={removeKeyMutation.isPending}
                          className="text-discord-red hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
