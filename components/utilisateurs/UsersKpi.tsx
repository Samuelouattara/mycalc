import React from 'react';

interface UsersKpiProps {
  totalUsers: number;
  loading?: boolean;
}

export default function UsersKpi({ totalUsers, loading }: UsersKpiProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Total Utilisateurs</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalUsers}</p>
          <p className="text-xs text-gray-500 mt-1">Utilisateurs inscrits</p>
        </div>
        <div className="p-3 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
          <span className="text-2xl">👥</span>
        </div>
      </div>
    </div>
  );
}
