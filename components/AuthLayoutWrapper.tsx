'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/dashboardLayout/Navbar";
import MainContent from "@/components/dashboardLayout/MainContent";
import SideBar from "@/components/dashboardLayout/SideBar";
import SidebarInitializer from "@/components/SidebarInitializer";

interface AuthLayoutWrapperProps {
  children: React.ReactNode;
}

export default function AuthLayoutWrapper({ children }: AuthLayoutWrapperProps) {
  const pathname = usePathname();
  
  // Si on est sur une page d'authentification, on ne rend que le children
  if (pathname?.startsWith("/login") || pathname?.startsWith("/register")) {
    return <>{children}</>;
  }

  // Layout classique pour toutes les autres pages
  return (
    <>
      <SidebarInitializer />
      <div className="flex min-h-screen">
        {/* Container responsive pour mobile/desktop */}
        <div className="flex w-full relative">
          <SideBar />
          <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <div className="flex-1">
              <MainContent>
                {children}
              </MainContent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
