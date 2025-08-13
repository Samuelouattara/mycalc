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
	phone?: string;
	department?: string;
	joinDate?: string;
	createdAt?: string;
	lastLogin?: string;
	calculationsCount: number;
}

export interface LoginUserDto {
	email: string;
	password: string;
}

export interface LoginResponseDto {
	message: string;
	userId: number;
	nom: string;
	// Le backend peut renvoyer des champs additionnels (ex: email)
	[key: string]: unknown;
}


