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

interface SwapObject {
  amount: number;
  active: Token;
  coins: Token[];
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

interface DaoContract {
  creator_address: string;
  dao_coin: {
    inner: string;
  };
  dao_coin_uri: string;
  dao_description: string;
  dao_investment_coin: {
    inner: string;
  };
  dao_name: string;
  dao_object_address: string;
  dao_twitter_uri: string;
  dao_website_uri: string;
  max_raise: string;
  partners: string;
  pool_created: boolean;
  profits_to_manager: string;
  public_round_wallet_limit: string;
  raise_end_time: string;
  raise_start_time: string;
  total_raised: string;
  trading_end_time: string;
  trading_start_time: string;
  whitelist_end_time: string;
  whitelist_merkle_root: string;
};
