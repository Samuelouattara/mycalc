'use client';
import NoFeatureYet from "../shared/noFeatureYet";
import { useResponsive } from "../../hooks/useResponsive";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isMobile, isTablet } = useResponsive();
  
    return (
      <main className={`
        w-full bg-[#F7F7F7] shadow-sm
        ${isMobile ? 'min-h-screen p-0' : isTablet ? 'min-h-screen p-2' : 'min-h-screen p-2'}
        ${isMobile || isTablet ? 'rounded-none' : 'rounded-xl m-4 mr-4 mb-4'}
      `}>
        {children ? children : <NoFeatureYet title='Dashboard' description='Ici retrouver les éléments de votre dashboard' />}
      </main>
    )
  }