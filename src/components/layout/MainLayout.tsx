
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [width, setWidth] = useState(0);
  const [deviceType, setDeviceType] = useState('');

  useEffect(() => {
    setWidth(screen.width)

    if (width > 0 && width < 464)
      setDeviceType('mobile')
    else if (width > 464 && width < 1024)
      setDeviceType('tablet')
    else if (width > 1024 && width < 3000)
      setDeviceType('desktop')

  }, [width])

  return (
    <>
      {deviceType=='desktop'? (
        <div className={'min-h-screen bg-dental-bg flex'} >
        <Sidebar deviceType={deviceType} />
        <div className="flex-1 overflow-hidden">
          <TopNavbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
        <Toaster position="top-right" richColors />
      </div>
      ):(
        <>
          <div className={'flex flex-col justify-center'} >
            <div className="flex flex-col flex-1 overflow-hidden">
              <Sidebar deviceType={deviceType} />
              <TopNavbar />
              <main className="flex-1 overflow-y-auto p-4 md:p-6">
                {children}
              </main>
            </div>
            <Toaster position="top-right" richColors />
          </div>
        </>
      )}
    </>
  );
};

export default MainLayout;
