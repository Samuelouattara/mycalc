'use client';
import NoFeatureYet from "../shared/noFeatureYet";
import { useResponsive } from "../../hooks/useResponsive";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <main className={`
      w-full h-full bg-[#F7F7F7] shadow-sm overflow-y-auto rounded-xl border border-gray-100
      ${isMobile ? 'p-4' : isTablet ? 'p-4' : 'p-6'}
    `}>
      {children ? children : <NoFeatureYet title='Dashboard' description='Ici retrouver les éléments de votre dashboard' />}
    </main>
  )
}