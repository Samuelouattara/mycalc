import { create } from 'zustand';

export interface CalculHistoryItem {
	id: number;
	expression: string;
	result: string;
	timestamp: string;
}

export interface CalculState {
	display: string;
	apiResult: string | null;
	history: CalculHistoryItem[];
	setDisplay: (value: string) => void;
	setApiResult: (value: string | null) => void;
	addHistory: (item: Omit<CalculHistoryItem, 'id' | 'timestamp'> & { timestamp?: string }) => void;
	clearHistory: () => void;
}

export const useCalculStore = create<CalculState>((set) => ({
	display: '',
	apiResult: null,
	history: [],
	setDisplay: (value: string) => set({ display: value }),
	setApiResult: (value: string | null) => set({ apiResult: value }),
	addHistory: ({ expression, result, timestamp }) =>
		set((state) => ({
			history: [
				{
					id: Date.now(),
					expression,
					result,
					timestamp: timestamp ?? new Date().toISOString()
				},
				...state.history
			]
		})),
	clearHistory: () => set({ history: [] })
}));


