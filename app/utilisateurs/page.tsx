'use client'

import ContentTitle from '@/components/shared/contentTitle'
import NoFeatureYet from '@/components/shared/noFeatureYet'
import UsersIcon from '@/components/ui/icones/usersIcon'
import UserTable from '@/components/utilisateurs/UserTable'
import { Content } from 'next/font/google'
import React, { useState, useCallback } from 'react'
import TableParams from '@/components/utilisateurs/TableParams'
import KpiUsers from '@/components/utilisateurs/KpiUsers'

export default function Page() {
  const [selectedKpi, setSelectedKpi] = useState<number | null>(null);

  const handleKpiChange = useCallback((newSelectedKpi: number | null) => {
    console.log('KPI changed to:', newSelectedKpi);
    setSelectedKpi(newSelectedKpi);
  }, []);

  const actions: {
    label: string;
    onClick: () => void;
    variant: 'primary' | 'secondary';
  }[] = [
    {
      label: 'Ajouter un utilisateur',
      onClick: () => {},
      variant: 'primary' as const
    },

    {
      label: 'Filtrer',
      onClick: () => {},
      variant: 'primary' as const
    }
  ];
  return (
    <div>
      <div>
        <ContentTitle title='Utilisateurs' description='Ici retrouver tous les utilisateurs' icon={<UsersIcon />} actions={actions} />
        <KpiUsers onKpiChange={handleKpiChange} />
      </div>
      <div className="mb-4">
        <TableParams />
      </div>
      
      <UserTable selectedKpi={selectedKpi} />
    </div>
  )
}   