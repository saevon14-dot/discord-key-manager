import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Save, Edit, Trash2 } from "lucide-react";
import { Role, Setting } from "@shared/schema";

export default function RolesTab() {
  const [newRoleId, setNewRoleId] = useState("");
  const [newRoleName, setNewRoleName] = useState("");
  const [adminRoleId, setAdminRoleId] = useState("");
  const [permissions, setPermissions] = useState({
    day: true,
    week: true,
    month: false,
    "3month": false,
    "6month": false,
    lifetime: false,
    custom: false,
  });

  const { toast } = useToast();

  const { data: roles, isLoading } = useQuery<Role[]>({
    queryKey: ["/api/roles"],
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

  const addRoleMutation = useMutation({
    mutationFn: async (roleData: any) => {
      return apiRequest("POST", "/api/roles", roleData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/roles"] });
      setNewRoleId("");
      setNewRoleName("");
      setPermissions({
        day: true,
        week: true,
        month: false,
        "3month": false,
        "6month": false,
        lifetime: false,
        custom: false,
      });
      toast({
        title: "Success",
        description: "Role added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add role",
        variant: "destructive",
      });
    },
  });

  const removeRoleMutation = useMutation({
    mutationFn: async (roleId: string) => {
      return apiRequest("DELETE", `/api/roles/${roleId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/roles"] });
      toast({
        title: "Success",
        description: "Role removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove role",
        variant: "destructive",
      });
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async (setting: { key: string; value: string }) => {
      return apiRequest("POST", "/api/settings", setting);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    },
  });

  const handleAddRole = () => {
    if (!newRoleId.trim() || !newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Please enter both role ID and name",
        variant: "destructive",
      });
      return;
    }

    addRoleMutation.mutate({
      roleId: newRoleId,
      roleName: newRoleName,
      permissions,
      isAdmin: false,
    });
  };

  const handleSaveAdminSettings = () => {
    if (adminRoleId.trim()) {
      updateSettingMutation.mutate({
        key: "admin_role_id",
        value: adminRoleId,
      });
    }
  };

  const permissionKeys = [
    { key: "day", label: "Generate Day Keys" },
    { key: "week", label: "Generate Week Keys" },
    { key: "month", label: "Generate Month Keys" },
    { key: "3month", label: "Generate 3 Month Keys" },
    { key: "6month", label: "Generate 6 Month Keys" },
    { key: "lifetime", label: "Generate Lifetime Keys" },
    { key: "custom", label: "Generate Custom Keys" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Role */}
        <Card className="bg-discord-darker border-discord-dark">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Add Authorized Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-discord-text text-sm font-medium mb-2">Role ID</label>
                <Input
                  value={newRoleId}
                  onChange={(e) => setNewRoleId(e.target.value)}
                  placeholder="123456789012345678"
                  className="bg-discord-dark border-discord-dark text-white"
                />
              </div>

              <div>
                <label className="block text-discord-text text-sm font-medium mb-2">Role Name</label>
                <Input
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Role Name"
                  className="bg-discord-dark border-discord-dark text-white"
                />
              </div>

              <div>
                <label className="block text-discord-text text-sm font-medium mb-2">Permissions</label>
                <div className="space-y-2">
                  {permissionKeys.map((perm) => (
                    <div key={perm.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={perm.key}
                        checked={permissions[perm.key as keyof typeof permissions]}
                        onCheckedChange={(checked) =>
                          setPermissions((prev) => ({
                            ...prev,
                            [perm.key]: !!checked,
                          }))
                        }
                        className="border-discord-dark"
                      />
                      <label htmlFor={perm.key} className="text-discord-text text-sm">
                        {perm.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAddRole}
                disabled={addRoleMutation.isPending}
                className="w-full bg-discord-primary hover:bg-blue-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                {addRoleMutation.isPending ? "Adding..." : "Add Role"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Admin Settings */}
        <Card className="bg-discord-darker border-discord-dark">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Admin Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-discord-text text-sm font-medium mb-2">Admin Role ID</label>
                <Input
                  value={adminRoleId || settings?.admin_role_id || ""}
                  onChange={(e) => setAdminRoleId(e.target.value)}
                  placeholder="123456789012345678"
                  className="bg-discord-dark border-discord-dark text-white"
                />
              </div>

              <div>
                <label className="block text-discord-text text-sm font-medium mb-2">Global Settings</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="log-generations" defaultChecked className="border-discord-dark" />
                    <label htmlFor="log-generations" className="text-discord-text text-sm">
                      Log all key generations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-remove" defaultChecked className="border-discord-dark" />
                    <label htmlFor="auto-remove" className="text-discord-text text-sm">
                      Auto-remove used keys
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="require-confirmation" className="border-discord-dark" />
                    <label htmlFor="require-confirmation" className="text-discord-text text-sm">
                      Require confirmation for generation
                    </label>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSaveAdminSettings}
                disabled={updateSettingMutation.isPending}
                className="w-full bg-discord-green hover:bg-green-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateSettingMutation.isPending ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Roles */}
      <Card className="bg-discord-darker border-discord-dark">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Authorized Roles</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-discord-dark">
                  <th className="text-left py-3 px-4 text-discord-muted font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-discord-muted font-medium">ID</th>
                  <th className="text-left py-3 px-4 text-discord-muted font-medium">Permissions</th>
                  <th className="text-left py-3 px-4 text-discord-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-discord-muted">
                      Loading roles...
                    </td>
                  </tr>
                ) : !roles || roles.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-discord-muted">
                      No roles configured
                    </td>
                  </tr>
                ) : (
                  roles?.map((role) => (
                    <tr key={role.id} className="border-b border-discord-dark hover:bg-discord-dark transition-colors">
                      <td className="py-3 px-4 text-white font-medium">{role.roleName}</td>
                      <td className="py-3 px-4 text-discord-muted text-sm">{role.roleId}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {role.isAdmin ? (
                            <Badge className="bg-discord-primary bg-opacity-20 text-discord-primary">
                              All
                            </Badge>
                          ) : (
                            Object.entries(role.permissions || {})
                              .filter(([, enabled]) => enabled)
                              .map(([perm]) => (
                                <Badge
                                  key={perm}
                                  className="bg-discord-green bg-opacity-20 text-discord-green"
                                >
                                  {perm === "3month" ? "3M" : perm === "6month" ? "6M" : perm}
                                </Badge>
                              ))
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-discord-yellow hover:text-yellow-400"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRoleMutation.mutate(role.roleId)}
                            disabled={removeRoleMutation.isPending}
                            className="text-discord-red hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
