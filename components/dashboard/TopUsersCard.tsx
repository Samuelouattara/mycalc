import React from 'react';
import { TopUserDto } from '@/type/auth';

interface TopUsersCardProps {
  users: TopUserDto[];
  loading?: boolean;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return `#${rank}`;
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 2:
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 3:
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200';
  }
};

export default function TopUsersCard({ users, loading }: TopUsersCardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Top Utilisateurs</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((rank) => (
            <div key={rank} className="flex items-center space-x-3 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Top Utilisateurs</h3>
      <div className="space-y-3">
        {users.map((user, index) => (
          <div key={user.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${getRankColor(index + 1)}`}>
              {getRankIcon(index + 1)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{user.Nom}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-600">{user.calculationsCount}</p>
              <p className="text-xs text-gray-500">calculs</p>
            </div>
          </div>
        ))}
      </div>
      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Aucun utilisateur trouvé</p>
        </div>
      )}
    </div>
  );
}
