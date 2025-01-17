import { create } from "zustand";

interface TokenStore {
  tokenList: Token[];
  setTokenList: (tokens: Token[]) => void;
  balance?: {[key: string]: string};
  setBalance: (balance: {[key: string]: string}) => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokenList: [],
  setTokenList: (tokens) => set({ tokenList: tokens }),
  balance: undefined,
  setBalance: (balance) => set({ balance }),
}));
