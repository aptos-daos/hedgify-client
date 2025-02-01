"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTokenStore } from "@/store/token";
import { default_token } from "@/constants/token";
import SwapInput from "./SwapInput";
import SwapIcon from "./coin-widget/SwapIcon";
import { getAllQuotes, swap } from "@/lib/panora";
import { useWalletStore } from "@/store/wallet";

const predefinedAmounts = ["0.5", "1", "2", "5"];
const values = [
  { label: "Price Impact", value: "1.07%" },
  { label: "Platform Fees", value: "0.001 APT" },
];

const SwapWidget = () => {
  const { address } = useWalletStore();
  const [loading, setLoading] = useState(false);
  const { tokenList, balance, setBalance } = useTokenStore();
  const [state, setState] = useState({
    from: {
      amount: 0,
      active: default_token,
      coins: [default_token],
    },
    to: {
      amount: 0,
      active: tokenList[1],
      coins: tokenList,
    },
  });

  useEffect(() => {
    if (tokenList && tokenList.length > 0) {
      setState((prevState) => ({
        ...prevState,
        to: {
          ...prevState.to,
          active: tokenList[0],
          coins: tokenList,
        },
      }));
    }
  }, [tokenList]);

  const handleSwapButtonClick = () => {
    setState({
      from: state.to,
      to: state.from,
    });
  };

  // TODO: REMOVE ME
  const handleChangeAmount = (amount: string) => {
    setState((prev) => ({
      ...prev,
      from: { ...prev.from, amount: Number(amount) },
    }));
  };

  const handleInputChange = async (value: number, key: "from" | "to") => {
    setState((prev) => ({
      ...prev,
      [key]: { ...prev[key], amount: value },
    }));

    const response = await getAllQuotes(
      String(state.from.active.chainId),
      String(value),
      state.from.active.tokenAddress,
      state.to.active.tokenAddress
    );
  };

  const handleTokenChange = (token: Token, key: "from" | "to") => {
    setState((prev) => ({
      ...prev,
      [key]: { ...prev[key], active: token },
    }));
  };

  const handleClick = async () => {
    // TODO: Implement Backend Swap
    await swap(
      state.from.active.tokenAddress,
      state.to.active.tokenAddress,
      state.from.amount.toString(),
      address
    );
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
        onTokenChange={(token) => handleTokenChange(token, key)}
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
          <Button
            className="w-full bg-primary"
            disabled={loading}
            onClick={handleClick}
          >
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
