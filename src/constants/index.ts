export const DEFAULT_ALTER_IMAGE =
  "https://storage.googleapis.com/arup-aptos.appspot.com/01b0b05e-b206-4e22-9ec7-0f6bee7e665d/featuredImage2.png";

export const SECURED_PATHS = ["/create-dao"];
export const FUNDING_PERIOD = 7;
export const FUNDING_HOLD_PERIOD = 3;
export const DAO_TOP_MESSAGE = {
  LIVE: "Fundraise Phase is Live",
  NOT_SUCCESSFUL: "Fund Raise Unsuccessful ; Withdraw your Money",
  NOT_STARTED: "Fundraise will Start in ddhhmmss",
  TRADING_NOT_STARTED: "Fund Raise Successful ; Wait for Manager to Start Trading",
  TRADING_LIVE: "Trading is Live ; Fund wil stop on ddmmyy hhmmss",
}
export const AVAILABLE_FUND_OPTIONS = [1000, 5000, 10000, 50000, 100000];
export const AVAILABLE_PERIOD_OF_TRADING = [30, 90, 120, 150, 180, 270];

export enum DaoStatus {
  FUNDING_LIVE,
  NOT_SUCCESSFUL,
  NOT_STARTED,
  TRADING_NOT_STARTED,
  TRADING_LIVE,
}