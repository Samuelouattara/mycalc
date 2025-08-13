export interface CalculationResponseDto {
	result: number;
	operator: string;
}

export interface ChainCalculationDto {
	expression: string;
	userId?: number;
}

export interface CalculationDto {
	id: number;
	expression: string;
	operator: string;
	result: string;
	createdAt: string;
}

export interface CalculationHistoryResponseDto {
	total: number;
	page: number;
	pageSize: number;
	history: CalculationDto[];
}


