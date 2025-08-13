import { create } from 'zustand';

export interface UserState {
	userId: number | null;
	nom: string | null;
	email: string | null;
	setUser: (params: { userId: number; nom?: string | null; email?: string | null }) => void;
	clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	userId: null,
	nom: null,
	email: null,
	setUser: ({ userId, nom = null, email = null }) => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('userId', String(userId));
			if (nom) window.localStorage.setItem('userNom', String(nom));
			if (email) window.localStorage.setItem('userEmail', String(email));
		}
		set({ userId, nom: nom ?? null, email: email ?? null });
	},
	clearUser: () => {
		if (typeof window !== 'undefined') {
			window.localStorage.removeItem('userId');
			window.localStorage.removeItem('userNom');
			window.localStorage.removeItem('userEmail');
		}
		set({ userId: null, nom: null, email: null });
	}
}));


