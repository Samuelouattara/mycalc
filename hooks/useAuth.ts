import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { getUserById } from '@/lib/auth';

export function useAuth() {
	const { userId, nom, email, setUser, clearUser } = useUserStore();

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const cachedUserId = window.localStorage.getItem('userId');
		const cachedNom = window.localStorage.getItem('userNom');
		const cachedEmail = window.localStorage.getItem('userEmail');
		if (cachedUserId) {
			setUser({ userId: Number(cachedUserId), nom: cachedNom, email: cachedEmail });
		}
	}, [setUser]);

	const fetchProfile = async () => {
		if (!userId) return null;
		try {
			const user = await getUserById(userId);
			setUser({ userId: user.id, nom: user.Nom, email: user.email });
			return user;
		} catch (err) {
			return null;
		}
	};

	return { userId, nom, email, setUser, clearUser, fetchProfile };
}


