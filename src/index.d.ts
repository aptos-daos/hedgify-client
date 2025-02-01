interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface Token {
  chainId: number;
  tokenAddress: `${string}::${string}::${string}`;
  faAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  bridge: null;
  panoraSymbol: string;
  usdPrice: string;
  logoUrl: string;
  websiteUrl: string;
  panoraUI: boolean;
  panoraTags: string[];
  panoraIndex: number;
  coinGeckoId: string;
  coinMarketCapId: any;
  isInPanoraTokenList: boolean;
  isBanned: boolean;
}

interface SwapQuoteResponse {
  fromToken: {
    address: string;
    decimals: number;
    current_price: string;
  };
  toToken: {
    address: string;
    decimals: number;
    current_price: string;
  };
  fromTokenAmount: string;
  fromTokenAmountUSD: string;
  quotes: Array<{
    toTokenAmount: string;
    priceImpact: string;
    slippagePercentage: string;
    feeAmount: string;
    minToTokenAmount: string;
    toTokenAmountUSD: string;
    feeAmountUSD: string;
  }>;
  swapAmountSide: string;
}

interface Invite {
  name: string;
  code: string;
  user: string;
  expiresAt: string;
}

interface Participant {
  id: string;
  amount: string;
  walletAddress: string;
}

