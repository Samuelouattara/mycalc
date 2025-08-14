'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import { useResponsive } from "@/hooks/useResponsive";
import { useDashboard } from "@/hooks/useDashboard";
import StatsCard from "@/components/dashboard/StatsCard";
import TopUsersCard from "@/components/dashboard/TopUsersCard";

export default function Home() {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const { topUsers, calculStats, loading, error, refreshData } = useDashboard();
  
  const viewMyCalculs = () => {
    router.push('/mes-calculs');
  }

  const makeCalculation = () => {
    router.push('/calculer');
  }

  if (error) {
    return (
      <div className="w-full p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={refreshData}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header avec actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard</h1>
          <p className="text-gray-600 mt-1">Bienvenue sur OuattCALC? - Votre calculateur intelligent</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={makeCalculation}
            className="bg-[#1C274D] text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            🧮 Faire un calcul
          </button>
          <button
            onClick={viewMyCalculs}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            📋 Voir mes calculs
          </button>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Calculs"
          value={calculStats?.total || 0}
          icon={<span className="text-xl">🧮</span>}
          color="blue"
          description="Calculs effectués"
        />
        <StatsCard
          title="Additions"
          value={calculStats?.types?.['+'] || 0}
          icon={<span className="text-xl">➕</span>}
          color="green"
          description="Opérations d'addition"
        />
        <StatsCard
          title="Soustractions"
          value={calculStats?.types?.['-'] || 0}
          icon={<span className="text-xl">➖</span>}
          color="purple"
          description="Opérations de soustraction"
        />
        <StatsCard
          title="Multiplications"
          value={calculStats?.types?.['*'] || 0}
          icon={<span className="text-xl">✖️</span>}
          color="orange"
          description="Opérations de multiplication"
        />
      </div>

      {/* Divisions et Top Utilisateurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsCard
          title="Divisions"
          value={calculStats?.types?.['/'] || 0}
          icon={<span className="text-xl">➗</span>}
          color="blue"
          description="Opérations de division"
        />
        <TopUsersCard users={topUsers} loading={loading} />
      </div>

      {/* Section d'actions rapides */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Actions Rapides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={makeCalculation}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-center group"
          >
            <div className="text-2xl mb-2">🧮</div>
            <p className="font-medium text-gray-900">Nouveau Calcul</p>
            <p className="text-sm text-gray-500">Effectuer un calcul</p>
          </button>
          
          <button
            onClick={viewMyCalculs}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all text-center group"
          >
            <div className="text-2xl mb-2">📋</div>
            <p className="font-medium text-gray-900">Historique</p>
            <p className="text-sm text-gray-500">Voir mes calculs</p>
          </button>
          
          <button
            onClick={() => router.push('/utilisateurs')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all text-center group"
          >
            <div className="text-2xl mb-2">👥</div>
            <p className="font-medium text-gray-900">Utilisateurs</p>
            <p className="text-sm text-gray-500">Gérer les utilisateurs</p>
          </button>
          
          <button
            onClick={() => router.push('/Profil')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all text-center group"
          >
            <div className="text-2xl mb-2">👤</div>
            <p className="font-medium text-gray-900">Profil</p>
            <p className="text-sm text-gray-500">Mon profil</p>
          </button>
        </div>
      </div>
    </div>
  );
}
