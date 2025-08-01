'use client';

import NoFeatureYet from '@/components/shared/noFeatureYet'
import { useResponsive } from '@/hooks/useResponsive'
import React from 'react'

export default function Page() {
  const { isMobile } = useResponsive();
  
  return (
    <div className={`
      w-full
      ${isMobile ? 'min-h-screen px-4 pt-4 pb-24' : ''}
    `}>
      <NoFeatureYet title='Mes Calculs' description='Ici retrouver tous vos calculs' />
    </div>
  )
}