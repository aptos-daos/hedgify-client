interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface Token {
  chainId: number;
  tokenAddress: string;
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

interface Invite {
  name: string;
  code: string;
  user: string;
  expiresAt: string;
}