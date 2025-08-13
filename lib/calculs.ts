import api from '@/lib/apiClient';
import { CalculationHistoryResponseDto, CalculationResponseDto, ChainCalculationDto } from '@/type/calculs';

export async function computeChain(payload: ChainCalculationDto): Promise<CalculationResponseDto> {
	const { data } = await api.post<CalculationResponseDto>('/calculations/chain', payload);
	return data;
}

export async function getUserCalculationHistory(
	userId: number | string,
	page?: number
): Promise<CalculationHistoryResponseDto | any[]> {
	const { data } = await api.get<CalculationHistoryResponseDto | any[]>(`/calculations/history/${userId}`, {
		params: page ? { page } : undefined
	});
	return data;
}


