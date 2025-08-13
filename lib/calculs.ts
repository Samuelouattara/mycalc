import api from '@/lib/apiClient';
import { CalculationHistoryResponseDto, CalculationResponseDto, ChainCalculationDto } from '@/type/calculs';

export async function computeChain(payload: ChainCalculationDto): Promise<CalculationResponseDto> {
	const { data } = await api.post<CalculationResponseDto>('/calculations/chain', payload);
	return data;
}

export async function getUserCalculationHistory(
    userId: number | string,
    page?: number,
    operator?: string
): Promise<CalculationHistoryResponseDto | any[]> {
    const params: Record<string, any> = {};
    if (page) params.page = page;
    if (operator && operator !== 'all') params.operator = operator;
    const { data } = await api.get<CalculationHistoryResponseDto | any[]>(`/calculations/history/${userId}`, {
        params: Object.keys(params).length ? params : undefined
    });
    return data;
}


