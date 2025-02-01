import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AutoConnectStore {
  autoConnect: boolean;
  setAutoConnect: (autoConnect: boolean) => void;
}

interface WalletState {
  address: string;
  balance: number;
  setAddress: (address: string) => void;
  setBalance: (amount: number) => void;
  addToBalance: (amount: number) => void;
  subtractFromBalance: (amount: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: "",
  balance: 0,
  setAddress: (address) => set({ address }),
  setBalance: (amount) => set({ balance: amount }),
  addToBalance: (amount) =>
    set((state) => ({ balance: state.balance + amount })),
  subtractFromBalance: (amount) =>
    set((state) => ({ balance: state.balance - amount })),
}));

export const useAutoConnectStore = create<AutoConnectStore>()(
  persist(
    (set) => ({
      autoConnect: false,
      setAutoConnect: (autoConnect: boolean) => set({ autoConnect }),
    }),
    {
      name: "aptos-wallet-auto-connect",
      storage: {
        getItem: (name) => {
          const storedValue = localStorage.getItem(name);
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
