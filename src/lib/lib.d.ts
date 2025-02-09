type MoveStructId = `${string}::${string}::${string}`;

interface IToken {
  address: string;
  current_price: string;
}

interface TokenDetails {
  tokenType: string;
  name: string;
  symbol: string;
  decimals: number;
}

interface RouteStep {
  fromToken: TokenDetails;
  toToken: TokenDetails;
  percentage: number;
  dexName: string;
  aggregatorName: string;
}

interface Route {
  percentage: number;
  routeTaken: RouteStep[][];
}

interface TxData {
  function: MoveStructId;
  type_arguments: MoveStructId[];
  arguments: any[];
}

interface Quote {
  toTokenAmount: string;
  route: Route[];
  priceImpact: string;
  slippagePercentage: string;
  feeAmount: string;
  minToTokenAmount: string;
  txData: TxData;
  toTokenAmountUSD: string;
}

interface SwapResponse {
  fromToken: IToken;
  toToken: IToken;
  fromTokenAmount: string;
  fromTokenAmountUSD: string;
  quotes: Quote[];
}
