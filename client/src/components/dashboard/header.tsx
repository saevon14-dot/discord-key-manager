import { Button } from "@/components/ui/button";
import { Plus, Server } from "lucide-react";

interface HeaderProps {
  tabInfo: {
    title: string;
    description: string;
  };
}

export default function Header({ tabInfo }: HeaderProps) {
  return (
    <header className="galaxy-card border-b border-galaxy-border p-6 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-galaxy-text">{tabInfo.title}</h2>
          <p className="text-galaxy-muted">{tabInfo.description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-gradient-to-r from-galaxy-purple to-galaxy-blue hover:from-galaxy-blue hover:to-galaxy-purple text-white shadow-lg transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add Keys
          </Button>
          <div className="flex items-center space-x-2 text-galaxy-muted">
            <Server className="w-4 h-4" />
            <span>Straves Network</span>
          </div>
        </div>
      </div>
    </header>
  );
}
