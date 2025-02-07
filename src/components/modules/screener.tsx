import React from "react";

interface ScreenerProps {
  pairAddress?: string;
  embed?: boolean;
  loadChartSettings?: boolean;
  trades?: boolean;
  tabs?: boolean;
  info?: boolean;
  chartLeftToolbar?: boolean;
  chartDefaultOnMobile?: boolean;
  chartTheme?: "dark" | "light";
  theme?: "dark" | "light";
  chartStyle?: number;
  chartType?: "usd" | "candlestick";
  interval?: "1" | "5" | "15" | "30" | "60" | "240" | "1D" | "1W";
}

const Screener = ({
  pairAddress = "0x38a37ea5695188e4ca4a0050ab99864745f2b613c3710bb526d93c62a3b835f6",
  embed = true,
  loadChartSettings = false,
  trades = false,
  tabs = false,
  info = false,
  chartLeftToolbar = false,
  chartDefaultOnMobile = true,
  chartTheme = "dark",
  theme = "dark",
  chartStyle = 0,
  chartType = "usd",
  interval = "15",
}: ScreenerProps = {}) => {
  const buildUrl = () => {
    const baseUrl = "https://dexscreener.com/aptos/";
    const params = new URLSearchParams({
      embed: embed ? "1" : "0",
      loadChartSettings: loadChartSettings ? "1" : "0",
      trades: trades ? "1" : "0",
      tabs: tabs ? "1" : "0",
      info: info ? "1" : "0",
      chartLeftToolbar: chartLeftToolbar ? "1" : "0",
      chartDefaultOnMobile: chartDefaultOnMobile ? "1" : "0",
      chartTheme,
      theme,
      chartStyle: chartStyle.toString(),
      chartType,
      interval,
    });

    return `${baseUrl}${pairAddress}?${params.toString()}`;
  };

  return (
    <div className="relative w-full pb-[125%] lg:pb-[65%]">
      <iframe
        src={buildUrl()}
        title="dexscreener"
        loading="lazy"
        allowFullScreen
        className="absolute w-full h-full top-0 left-0 border-0"
      />
    </div>
  );
};

export default Screener;
