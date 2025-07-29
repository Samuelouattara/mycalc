'use client';

import ContentTitle from "@/components/shared/contentTitle";
import IconDashboard from "@/components/ui/icones/IconDashboard";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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
    <div className="space-y-6">
      <ContentTitle title="Dashboard" description="Bienvenue sur MyCalc" icon={<IconDashboard />} actions={actions} />
    </div>
  );
}
