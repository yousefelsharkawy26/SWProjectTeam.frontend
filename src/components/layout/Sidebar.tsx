
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  User,
  Users,
  ClipboardList,
  CreditCard,
  Package,
  BarChart2,
  Settings,
  LogOut,
  Stethoscope,
  MessageSquare,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import UserProvider from "@/context/UserContext";

const Sidebar = ({ deviceType }) => {

  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(true);
  const user = UserProvider.useUser().user;

  const navItems = [
    {
      name: "Dashboard",
      icon: <BarChart2 size={22} />,
      path: "/dashboard",
    },
    {
      name: "Patients",
      icon: <Users size={22} />,
      path: "/patients",
    },
    {
      name: "Appointments",
      icon: <CalendarDays size={22} />,
      path: "/appointments",
    },
    {
      name: "Treatments",
      icon: <Stethoscope size={22} />,
      path: "/treatments",
    },
    {
      name: "Staff",
      icon: <User size={22} />,
      path: "/staff",
    },
    {
      name: "Posts",
      icon: <MessageSquare size={22} />,
      path: "/posts",
    },
    {
      name: "Inventory",
      icon: <Package size={22} />,
      path: "/inventory",
    },
    {
      name: "Billing",
      icon: <CreditCard size={22} />,
      path: "/billing",
    },
    {
      name: "Reports",
      icon: <ClipboardList size={22} />,
      path: "/reports",
    },
    {
      name: "Settings",
      icon: <Settings size={22} />,
      path: "/settings",
    },
  ];

  const protictedNavItems = [
    {
      name: "Posts",
      icon: <MessageSquare size={22} />,
      path: "/posts",
    },
    {
      name: "Patients",
      icon: <Users size={22} />,
      path: "/medical-record",
    },
    {
      name: "Settings",
      icon: <Settings size={22} />,
      path: "/settings",
    },
  ]

  const navMobileItems = [
    {
      name: "Dashboard",
      icon: <BarChart2 size={22} />,
      path: "/dashboard",
    },
    {
      name: "Patients",
      icon: <Users size={22} />,
      path: "/patients",
    },
    {
      name: "Appointments",
      icon: <CalendarDays size={22} />,
      path: "/appointments",
    },
    {
      name: "Staff",
      icon: <User size={22} />,
      path: "/staff",
    },
    {
      name: "Posts",
      icon: <MessageSquare size={22} />,
      path: "/posts",
    },
    {
      name: "Reports",
      icon: <ClipboardList size={22} />,
      path: "/reports",
    },
    {
      name: "Settings",
      icon: <Settings size={22} />,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    // Here you would typically clear authentication tokens or session data
    toast.success("Logged out successfully");
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login", { replace: true });
    }
    , 1000);
  };

  return (
    <TooltipProvider delayDuration={0}>
      {deviceType == 'desktop'? (
        <aside
        className={cn(
          "bg-white border-r border-gray-200 h-screen flex-shrink-0 transition-all duration-300 ease-in-out flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center">
              <Stethoscope className="h-6 w-6 text-dental-blue" />
              <span className="ml-2 text-lg font-bold text-dental-dark-blue">DentalCare</span>
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <Stethoscope className="h-6 w-6 text-dental-blue" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-dental-blue transition-colors"
          >
            {collapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="11 17 6 12 11 7"></polyline>
                <polyline points="18 17 13 12 18 7"></polyline>
              </svg>
            )}
          </button>
        </div>

        <PageLinks navItems={user?.permission !== 'user'? navItems : protictedNavItems} collapsed={collapsed} deviceType={deviceType} />

        <div className="p-4 border-t border-gray-200">
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={handleLogout}
                className={cn(
                  "flex items-center w-full rounded-md px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors",
                  collapsed && "justify-center"
                )}
              >
                <LogOut size={22} />
                {!collapsed && <span className="ml-3">Logout</span>}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
      ): (
        <PageLinks navItems={user?.permission !== 'user'? navMobileItems : protictedNavItems} collapsed={collapsed} deviceType={deviceType}/>
      )}
    </TooltipProvider>
  );
};

const PageLinks = ({ navItems, collapsed, deviceType }) => {
  return (
    <div className="flex-1 py-4 overflow-y-auto">
      <ul className={cn("space-y-2 px-2", deviceType!='desktop'? 'flex justify-center':'')}>
        {navItems.map((item) => (
          <li key={item.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-dental-blue text-white"
                      : "text-gray-700 hover:bg-dental-light-blue/10 hover:text-dental-blue"
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  {item.name}
                </TooltipContent>
              )}
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar;
