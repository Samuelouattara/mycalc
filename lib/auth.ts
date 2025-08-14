// Met à jour les infos utilisateur (Nom, email, password)
export async function updateUser(userId: number | string, payload: { Nom?: string; email?: string; password?: string }) {
	const { data } = await api.patch(`/users/update/${userId}`, payload);
	return data;
}
import api from '@/lib/apiClient';
import { LoginResponseDto, LoginUserDto, RegisterUserDto, UserDto, TopUserDto, CalculTypesStatsDto } from '@/type/auth';

export async function login(payload: LoginUserDto): Promise<LoginResponseDto> {
	const { data } = await api.post<LoginResponseDto>('/users/login', payload);
	return data;
}

export async function register(payload: RegisterUserDto): Promise<UserDto> {
	const { data } = await api.post<UserDto>('/users/register', payload);
	return data;
}

export async function getUserById(userId: number | string): Promise<UserDto> {
	const { data } = await api.get<UserDto>(`/users/${userId}`);
	return data;
}

// Fonctions pour le dashboard
export async function getTopUsers(): Promise<TopUserDto[]> {
	const { data } = await api.get<TopUserDto[]>('/users/dashboard/top');
	return data;
}

export async function getCalculTypesStats(): Promise<CalculTypesStatsDto> {
	const { data } = await api.get<CalculTypesStatsDto>('/users/dashboard/types/calculs');
	return data;
}

// Fonction pour récupérer tous les utilisateurs
export async function getAllUsers(): Promise<UserDto[]> {
	const { data } = await api.get<UserDto[]>('/users');
	return data;
}


