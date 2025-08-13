import api from '@/lib/apiClient';
import { LoginResponseDto, LoginUserDto, RegisterUserDto, UserDto } from '@/type/auth';

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


