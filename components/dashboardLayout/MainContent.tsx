'use client';
import NoFeatureYet from "../shared/noFeatureYet";
import { useResponsive } from "../../hooks/useResponsive";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isMobile, isTablet } = useResponsive();
  
    return (
      <main className={`
        flex-1 overflow-auto bg-[#F7F7F7] shadow-sm
        ${isMobile ? 'p-2' : isTablet ? 'p-4' : 'p-2'}
        ${isMobile || isTablet ? 'rounded-none' : 'rounded-xl m-4 mr-4 mb-4'}
      `}>
        {children ? children : <NoFeatureYet title='Dashboard' description='Ici retrouver les éléments de votre dashboard' />}
      </main>
    )
  }