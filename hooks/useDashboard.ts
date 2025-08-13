import { useEffect, useState } from 'react';
import { getTopUsers, getCalculTypesStats } from '@/lib/auth';
import { TopUserDto, CalculTypesStatsDto } from '@/type/auth';

export const useDashboard = () => {
  const [topUsers, setTopUsers] = useState<TopUserDto[]>([]);
  const [calculStats, setCalculStats] = useState<CalculTypesStatsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Charger les données en parallèle
      const [topUsersData, statsData] = await Promise.all([
        getTopUsers(),
        getCalculTypesStats()
      ]);
      
      setTopUsers(topUsersData);
      setCalculStats(statsData);
    } catch (err) {
      console.error('Erreur lors du chargement du dashboard:', err);
      setError('Impossible de charger les données du dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const refreshData = () => {
    loadDashboardData();
  };

  return {
    topUsers,
    calculStats,
    loading,
    error,
    refreshData
  };
};
