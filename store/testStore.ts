import { create } from "zustand/react";


export interface TestStoreProps {  bears: number;
  increasePopulation: () => void;
  decreasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}
 export const testStore = create<TestStoreProps>((set) => ({
  bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    decreasePopulation: () => set((state) => ({ bears: state.bears - 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
}));