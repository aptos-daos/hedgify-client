"use client";

import React from "react";
import { useMarketCapital } from "@/store/dao";
import ValueCard from "./preview-display/live-view/value-card";

const MarketCapital = () => {
  const { isLoading, marketCapital } = useMarketCapital();

  return (
    <ValueCard
      heading="Market Capital"
      value={marketCapital}
      type="value"
      isLoading={isLoading}
    />
  );
};

export default MarketCapital;
