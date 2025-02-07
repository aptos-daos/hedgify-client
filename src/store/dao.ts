import { create } from "zustand";

export const useMarketCapital = create<{
  marketCapital: number;
  setMarketCapital: (value: number) => void;
}>((set) => ({
  marketCapital: 0,
  setMarketCapital: (value) => set({ marketCapital: value }),
}));
