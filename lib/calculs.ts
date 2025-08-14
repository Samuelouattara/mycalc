export async function computeLog(payload: { x: number, userId?: number }): Promise<CalculationResponseDto> {
    const { data } = await api.post<CalculationResponseDto>('/calculations/log', payload);
    return data;
}
export async function computePercent(payload: { x: number, userId?: number }): Promise<CalculationResponseDto> {
    const { data } = await api.post<CalculationResponseDto>('/calculations/percent', payload);
    return data;
}
export async function getLastUserCalculation(userId: number | string): Promise<CalculationResponseDto> {
    const { data } = await api.get<CalculationResponseDto>(`/calculations/ans/${userId}`);
    return data;
}
export async function computeAbs(payload: { value: number, userId?: number }): Promise<CalculationResponseDto> {
    const { data } = await api.post<CalculationResponseDto>('/calculations/abs', payload);
    return data;
}
export async function computePi(payload: { userId?: number }): Promise<CalculationResponseDto> {
    const { data } = await api.post<CalculationResponseDto>('/calculations/pi', payload);
    return data;
}
export async function computeExp(payload: { value: number, userId?: number }): Promise<CalculationResponseDto> {
    const { data } = await api.post<CalculationResponseDto>('/calculations/exp', payload);
    return data;
}
export async function computeRad(payload: { value: number, userId?: number }): Promise<CalculationResponseDto> {
    const { data } = await api.post<CalculationResponseDto>('/calculations/rad', payload);
    return data;
}
export async function computeDeg(payload: { value: number, userId?: number }): Promise<CalculationResponseDto> {
    const { data } = await api.post<CalculationResponseDto>('/calculations/deg', payload);
    return data;
}
export async function computeLn(payload: { value: number, userId?: number }): Promise<CalculationResponseDto> {
    const { data } = await api.post<CalculationResponseDto>('/calculations/ln', payload);
    return data;
}
export async function computeSqrt(payload: { value: number, userId?: number }): Promise<CalculationResponseDto> {
    const { data } = await api.post<CalculationResponseDto>('/calculations/sqrt', payload);
    return data;
}

import api from '@/lib/apiClient';
import { CalculationHistoryResponseDto, CalculationResponseDto, ChainCalculationDto } from '@/type/calculs';

export async function computeSquare(payload: { value: number, userId?: number }): Promise<CalculationResponseDto> {
    const { data } = await api.post<CalculationResponseDto>('/calculations/square', payload);
    return data;
}

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
    // Si l'opérateur est '+', utiliser la route dédiée
    if (operator === '+') {
        const { data } = await api.get<CalculationHistoryResponseDto | any[]>(`/calculations/additions/${userId}`, {
            params: Object.keys(params).length ? params : undefined
        });
        return data;
    }
    // Si l'opérateur est '-', utiliser la route dédiée
    if (operator === '-') {
        const { data } = await api.get<CalculationHistoryResponseDto | any[]>(`/calculations/subtractions/${userId}`, {
            params: Object.keys(params).length ? params : undefined
        });
        return data;
    }
    // Si l'opérateur est '*', utiliser la route dédiée
    if (operator === '*') {
        const { data } = await api.get<CalculationHistoryResponseDto | any[]>(`/calculations/multiplications/${userId}`, {
            params: Object.keys(params).length ? params : undefined
        });
        return data;
    }
    // Si l'opérateur est '/', utiliser la route dédiée
    if (operator === '/') {
        const { data } = await api.get<CalculationHistoryResponseDto | any[]>(`/calculations/divisions/${userId}`, {
            params: Object.keys(params).length ? params : undefined
        });
        return data;
    }
    const { data } = await api.get<CalculationHistoryResponseDto | any[]>(`/calculations/history/${userId}`, {
        params: Object.keys(params).length ? params : undefined
    });
    return data;
}


