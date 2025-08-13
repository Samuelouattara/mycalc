export interface RegisterUserDto {
	email: string;
	password: string;
	Nom: string;
	icon?: number;
}

export interface UserDto {
	id: number;
	email: string;
	Nom: string;
	icon: number;
	password?: string;
	phone?: string;
	department?: string;
	joinDate?: string;
	date?: string;
	lastcal?: string;
	lastcalc?: string;
	opetype?: string;
	lastLogin?: string;
	calculationsCount: number;
	createdAt: string;
}

export interface LoginUserDto {
	email: string;
	password: string;
}

export interface LoginResponseDto {
	message: string;
	userId: number;
	nom: string;
	[key: string]: unknown;
}

// Types pour le dashboard
export interface TopUserDto {
	id: number;
	email: string;
	Nom: string;
	icon: number;
	phone?: string;
	department?: string;
	joinDate?: string;
	lastLogin?: string;
	calculationsCount: number;
}

export interface CalculTypesStatsDto {
	total: number;
	types: {
		'+': number;
		'-': number;
		'*': number;
		'/': number;
	};
}


