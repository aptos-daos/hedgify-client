"use client";

import ValueCard from "@/components/molecules/card/value-card";
import React from "react";

const LiveView = () => {
  // TODO: will fetch live data
  const items = {
    "Market Capital": "$218291321",
    AUM: "$218291321",
    Parterners: "86",
    Return: "+86",
  };
  return (
    <div className="space-y-2">
      {Object.entries(items).map(([key, value]) => (
        <ValueCard key={key} heading={key} value={value} />
      ))}
    </div>
  );
};

export default LiveView;
