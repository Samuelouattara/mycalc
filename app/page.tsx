'use client';

import ContentTitle from "@/components/shared/contentTitle";
import IconDashboard from "@/components/ui/icones/IconDashboard";
import { useRouter } from "next/navigation";
import { useResponsive } from "@/hooks/useResponsive";

export default function Home() {
  const router = useRouter();
  const { isMobile } = useResponsive();
  
  const viewMyCalculs = () => {
    router.push('/mes-calculs');
  }

  const makeCalculation = () => {
    router.push('/calculer');
  }

  const actions: {
    label: string;
    onClick: () => void;
    variant: 'primary' | 'secondary';
  }[] = [
      {
        label: 'Faire un calcul',
        onClick: makeCalculation,
        variant: 'primary' as const
      },
      {
        label: 'Voir mes calculs',
        onClick: viewMyCalculs,
        variant: 'secondary' as const
      }
    ]
  return (
    <div className={`
      w-full
      ${isMobile ? 'min-h-screen px-4 pt-4 pb-24' : 'space-y-6'}
    `}>
      <ContentTitle title="Dashboard" description="Bienvenue sur MyCalc" icon={<IconDashboard />} actions={actions} />
    </div>
  );
}
