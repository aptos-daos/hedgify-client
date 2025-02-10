export const DEFAULT_ALTER_IMAGE =
  "https://storage.googleapis.com/arup-aptos.appspot.com/01b0b05e-b206-4e22-9ec7-0f6bee7e665d/featuredImage2.png";

export const CHAIN_ID = "aptos";
export const SECURED_PATHS = ["/create-dao"];
export const FUNDING_PERIOD = 7;
export const FUNDING_HOLD_PERIOD = 3;
export const DAO_TOP_MESSAGE = {
  FUNDING_LIVE: (timestr: string) => "Fundraise Phase is Live",
  NOT_SUCCESSFUL: (timestr: string) =>
    "Fund Raise Unsuccessful ; Withdraw your Money",
  NOT_STARTED: (timestr: string) => `Fundraise will Starts in ${timestr}`,
  TRADING_NOT_STARTED: (timestr: string) =>
    "Fund Raise Successful ; Wait for Manager to Start Trading",
  TRADING_LIVE: (timestr: string) =>
    `Trading is Live ; Fund will Stop on ${timestr}`,
};
export const AVAILABLE_FUND_OPTIONS = [2, 1000, 5000, 10000, 50000, 100000];
export const AVAILABLE_PERIOD_OF_TRADING = [1, 30, 90, 120, 150, 180, 270];
export const TOTAL_DIVIDED_TOKENS = 1e9;

export enum LiveViewType {
  GOAL = "GOAL",
  TWITTER = "TWITTER",
  MARKET_CAPITAL = "MARKET_CAPITAL",
  AUM = "AUM",
  PARTNERS = "PARTNERS",
  RETURNS = "RETURNS"
}

export enum DaoStatus {
  FUNDING_LIVE = "FUNDING_LIVE", // Funding Swap
  NOT_SUCCESSFUL = "NOT_SUCCESSFUL", // Funding Swap
  NOT_STARTED = "NOT_STARTED", // Funding Swap
  TRADING_NOT_STARTED = "TRADING_NOT_STARTED", // Trading Swap
  TRADING_LIVE = "TRADING_LIVE", // Trading Swap
}

export const LiveKeys: Record<DaoStatus, LiveViewType[]> = {
  [DaoStatus.FUNDING_LIVE]: [LiveViewType.GOAL, LiveViewType.TWITTER],
  [DaoStatus.TRADING_LIVE]: [LiveViewType.MARKET_CAPITAL, LiveViewType.AUM, LiveViewType.PARTNERS, LiveViewType.RETURNS],
  [DaoStatus.NOT_SUCCESSFUL]: [LiveViewType.TWITTER],
  [DaoStatus.NOT_STARTED]: [LiveViewType.TWITTER],
  [DaoStatus.TRADING_NOT_STARTED]: [LiveViewType.MARKET_CAPITAL, LiveViewType.TWITTER],
} as const;


export const FUNDING_SWAP_ARR = [
  DaoStatus.FUNDING_LIVE,
  DaoStatus.NOT_SUCCESSFUL,
  DaoStatus.NOT_STARTED,
];

export const TRADING_SWAP_ARR = [
  DaoStatus.TRADING_NOT_STARTED,
  DaoStatus.TRADING_LIVE,
];
