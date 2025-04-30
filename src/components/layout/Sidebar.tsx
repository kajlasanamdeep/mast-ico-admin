
import { NavLink } from "react-router-dom";
import { 
  Activity, 
  Coins, 
  Users, 
  Settings, 
  Calendar, 
  ListOrdered,
  Shield, 
  Bell, 
  FileText, 
  FileMinus,
  Settings as SettingsIcon
} from "lucide-react";
import { useSidebar } from "../sidebar/SidebarContext";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ElementType;
}

const NavItem = ({ to, label, icon: Icon }: NavItemProps) => {
  const { isSidebarOpen } = useSidebar();
  
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center py-3 px-4 rounded-md transition-colors",
          isActive 
            ? "bg-sidebar-accent text-primary" 
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
          !isSidebarOpen && "justify-center"
        )
      }
    >
      <Icon size={20} className="min-w-[20px]" />
      {isSidebarOpen && <span className="ml-3">{label}</span>}
    </NavLink>
  );
};

const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();
  
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar overflow-y-auto transition-all duration-300 ease-in-out z-30 border-r border-border/20",
        isSidebarOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-4">
        {/* Removed the MAST ICO and Admin Control Center text block */}
        
        <nav className="space-y-1">
          <NavItem to="/" label="Dashboard" icon={Activity} />
          <NavItem to="/token-management" label="Token Management" icon={Coins} />
          <NavItem to="/investor-management" label="Investors" icon={Users} />
          <NavItem to="/ico-settings" label="ICO Settings" icon={Settings} />
          <NavItem to="/transaction-history" label="Transactions" icon={ListOrdered} />
          <NavItem to="/security-settings" label="Security" icon={Shield} />
          <NavItem to="/campaign-management" label="Campaigns" icon={Calendar} />
          <NavItem to="/notifications" label="Notifications" icon={Bell} />
          <NavItem to="/kyc-management" label="KYC/AML" icon={FileText} />
          <NavItem to="/legal-compliance" label="Legal" icon={FileMinus} />
          <NavItem to="/settings" label="Settings" icon={SettingsIcon} />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
