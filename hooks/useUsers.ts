import { useEffect, useState } from 'react';
import { getAllUsers } from '@/lib/auth';
import { UserDto } from '@/type/auth';

export const useUsers = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs:', err);
      setError('Impossible de charger les utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const refreshUsers = () => {
    loadUsers();
  };

  return {
    users,
    loading,
    error,
    refreshUsers
  };
};
