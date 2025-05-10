import React from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-dental-bg flex">
      {!isMobile && <Sidebar />}
      <div className="flex flex-col flex-1 overflow-hidden mb-20">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
      {isMobile && <Sidebar />}
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default MainLayout;
