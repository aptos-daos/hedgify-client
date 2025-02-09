import { create } from "zustand";

export const useMarketCapital = create<{
  marketCapital: number;
  isLoading: boolean;
  setMarketCapital: (value: number) => void;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  marketCapital: 0,
  isLoading: false,
  setMarketCapital: (value) => set({ marketCapital: value }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
