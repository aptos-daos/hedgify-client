"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTokenStore } from "@/store/token";
import { default_token } from "@/constants/token";
import SwapInput from "./SwapInput";
import SwapIcon from "./coin-widget/SwapIcon";

const SwapWidget = () => {
  const [loading, setLoading] = useState(false);
  const { tokenList, balance, setBalance } = useTokenStore();
  const predefinedAmounts = ["0.5", "1", "2", "5"];
  const values = [
    { label: "Price Impact", value: "1.07%" },
    { label: "Platform Fees", value: "0.001 APT" },
  ];
  const [state, setState] = useState({
    from: {
      amount: 0,
      active: default_token,
      coins: [default_token],
    },
    to: {
      amount: 0,
      active: tokenList[0],
      coins: tokenList,
    },
  });

  const handleSwapButtonClick = () => {
    setState({
      from: state.to,
      to: state.from,
    });
  };

  const handleChangeAmount = (amount: string) => {
    setState((prev) => ({
      ...prev,
      from: { ...prev.from, amount: Number(amount) },
    }));
  };

  const handleInputChange = (value: number, key: "from" | "to") => {
    setState((prev) => ({
      ...prev,
      [key]: { ...prev[key], amount: value },
    }));
  };

  const renderInput = (key: "from" | "to") => {
    const { amount, coins, active } = state[key];
    return (
      <SwapInput
        label={key}
        value={amount}
        coins={coins}
        default_token={active}
        onChange={(value) => handleInputChange(value, key)}
      />
    );
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between gap-2 p-5">
        <Button className="w-full">Buy</Button>
        <Button className="w-full bg-red-400">Sell</Button>
      </CardHeader>
      <CardContent className="space-y-4 p-5 pt-0">
        <div className="space-y-5">
          {/* Predefined Amounts */}
          <div className="grid grid-cols-4 gap-2">
            {predefinedAmounts.map((amount) => (
              <Button
                key={amount}
                className="w-full bg-white hover:bg-muted cursor-pointer"
                onClick={() => handleChangeAmount(amount)}
              >
                {`${amount} ${state.from.active.symbol}`}
              </Button>
            ))}
          </div>

          {renderInput("from")}
          <SwapIcon onClick={handleSwapButtonClick} />
          {renderInput("to")}

          {/* Price Impact & Fees */}
          <div className="space-y-2 text-sm">
            {values.map((item, index) => (
              <div key={index} className="flex justify-between text-muted">
                <span>{item.label}:</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Swap Button */}
          <Button className="w-full bg-primary" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "SWAP for the Sake of GOD"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SwapWidget;
