import axios from "axios";
import { CHAIN_ID } from "@/constants";

export interface DexScreenerToken {
  address: string;
  name: string;
  symbol: string;
}

export interface DexScreenerTransaction {
  buys: number;
  sells: number;
}

export interface DexScreenerWebsite {
  url: string;
}

export interface DexScreenerSocial {
  platform: string;
  handle: string;
}

export interface DexScreenerInfo {
  imageUrl: string;
  websites: DexScreenerWebsite[];
  socials: DexScreenerSocial[];
}

export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  labels: string[];
  baseToken: DexScreenerToken;
  quoteToken: DexScreenerToken;
  priceNative: string;
  priceUsd: string;
  txns: Record<string, DexScreenerTransaction>;
  volume: Record<string, number>;
  priceChange: Record<string, number>;
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
  info: DexScreenerInfo;
  boosts: {
    active: number;
  };
}

export const fetchDexScreenerData = async (tokenAddresses: string) => {
  try {
    const response = await axios.get<DexScreenerPair>(
      `https://api.dexscreener.com/latest/dex/tokens/${CHAIN_ID}/${tokenAddresses}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`DexScreener API error: ${error.message}`);
    }
    throw error;
  }
};
