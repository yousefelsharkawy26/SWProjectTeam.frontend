import React from "react";
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
  Menu,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(true);
  const isMobile = useIsMobile();

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
      name: "Inventory",
      icon: <Package size={22} />,
      path: "/inventory",
    },
    // {
    //   name: "Billing",
    //   icon: <CreditCard size={22} />,
    //   path: "/billing",
    // },
    // {
    //   name: "Reports",
    //   icon: <ClipboardList size={22} />,
    //   path: "/reports",
    // },
    {
      name: "Settings",
      icon: <Settings size={22} />,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    // Here you would typically clear authentication tokens or session data
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (isMobile) {
    // Mobile view - bottom navigation bar
    return (
      <>
        {/* Main bottom navigation with most important items */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex justify-around items-center h-16">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex flex-col items-center px-2 py-1",
                  location.pathname === item.path
                    ? "text-dental-blue"
                    : "text-gray-600"
                )}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            ))}

            {/* More menu for remaining items */}
            <Sheet>
              <SheetTrigger className="flex flex-col items-center px-2 py-1 text-gray-600">
                <Menu size={22} />
                <span className="text-xs mt-1">More</span>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[60vh]">
                <div className="grid grid-cols-4 gap-4 pt-6">
                  {navItems.slice(5).map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "flex flex-col items-center p-3 rounded-lg",
                        location.pathname === item.path
                          ? "bg-dental-light-blue/10 text-dental-blue"
                          : "text-gray-600"
                      )}
                    >
                      {item.icon}
                      <span className="text-xs mt-2">{item.name}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex flex-col items-center p-3 rounded-lg text-red-500"
                  >
                    <LogOut size={22} />
                    <span className="text-xs mt-2">Logout</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Add bottom padding to main content to prevent overlap with bottom navigation */}
        <div className="pb-16"></div>
      </>
    );
  }

  // Desktop view - original sidebar
  return (
    <TooltipProvider delayDuration={0}>
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
              <span className="ml-2 text-lg font-bold text-dental-dark-blue">
                DentalCare
              </span>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="11 17 6 12 11 7"></polyline>
                <polyline points="18 17 13 12 18 7"></polyline>
              </svg>
            )}
          </button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-2 px-2">
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
                    <TooltipContent side="right">{item.name}</TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>

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
            {collapsed && <TooltipContent side="right">Logout</TooltipContent>}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
