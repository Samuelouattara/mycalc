'use client'

import React from 'react'
import { useResponsive } from '@/hooks/useResponsive'
import { useUsers } from '@/hooks/useUsers'
import UserTable from '@/components/utilisateurs/UserTable'
import UsersKpi from '@/components/utilisateurs/UsersKpi'

export default function Page() {
  const { isMobile } = useResponsive();
  const { users, loading, error, refreshUsers } = useUsers();

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 Utilisateurs</h1>
          <p className="text-gray-600 mt-1">Gestion des utilisateurs de l'application</p>
        </div>
        <button
          onClick={refreshUsers}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          🔄 Actualiser
        </button>
      </div>

      {/* KPI - Nombre total d'utilisateurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <UsersKpi totalUsers={users.length} loading={loading} />
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Liste des Utilisateurs</h2>
          <p className="text-sm text-gray-600 mt-1">Tous les utilisateurs inscrits sur la plateforme</p>
        </div>
        <div className="p-6">
          <UserTable 
            users={users} 
            loading={loading} 
            error={error} 
            onRefresh={refreshUsers}
          />
        </div>
      </div>
    </div>
  )
}   