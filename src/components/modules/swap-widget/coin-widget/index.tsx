"use client";

import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowUpDown } from "lucide-react";
import SwapInput from "../SwapInput";
import { useTokenStore } from "@/store/token";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { fetchBalance } from "@/components/WalletSelector/wallet";
import SwapIcon from "./SwapIcon";
import { default_token } from "@/constants/token";

interface SwapProps {
  onSwap?: (fromAmount: number, toAmount: number) => void;
  loading?: boolean;
}

const CoinWidget = ({ onSwap, loading = false }: SwapProps) => {
  const { tokenList, balance, setBalance } = useTokenStore();
  const predefinedAmounts = ["0.5", "1", "2", "5"];
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

  console.log(state)

  const handleSwapButtonClick = () => {
    setState({
      from: state.to,
      to: state.from,
    });
  };

  // TODO: Fetch balance
  // useEffect(() => {
  //   const loadBalance = async () => {
  //     if (account?.address && activeToken.tokenAddress) {
  //       try {
  //         const newBalance = await fetchBalance(account.address, activeToken.tokenAddress);
  //         setBalance(prev => ({
  //           ...prev,
  //           [activeToken.tokenAddress]: newBalance
  //         }));
  //       } catch (error) {
  //         console.error('Error fetching balance:', error);
  //       }
  //     }
  //   };

  //   loadBalance();
  // }, [account?.address, activeToken.tokenAddress]);

  return (
    <div className="space-y-6">
      {/* Predefined Amounts */}
      <div className="grid grid-cols-4 gap-2">
        {predefinedAmounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            className="w-full"
            onClick={() =>
              setState((prev) => ({
                ...prev,
                from: { ...prev.from, amount: Number(amount) },
              }))
            }
          >
            {`${amount} ${state.from.active.symbol}`}
          </Button>
        ))}
      </div>

      {/* TODO: From Input */}
      <SwapInput
        label="From"
        value={state.from.amount}
        coins={state.from.coins}
        default_token={state.from.active}
        onChange={(value) =>
          setState((prev) => ({
            ...prev,
            from: { ...prev.from, amount: value },
          }))
        }
      />

      <SwapIcon onClick={handleSwapButtonClick} />

      {/* To Input */}
      <SwapInput
        label="To"
        value={state.to.amount}
        coins={state.to.coins}
        default_token={state.to.active}
        onChange={(value) =>
          setState((prev) => ({ ...prev, to: { ...prev.to, amount: value } }))
        }
      />

      {/* Price Impact & Fees */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Price Impact</span>
          <span>1.07%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Platform Fees</span>
          <span>0.001 APT</span>
        </div>
      </div>

      {/* Swap Button */}
      <Button
        className="w-full bg-green-500 hover:bg-green-600 text-white"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "SWAP for the Sake of GOD"
        )}
      </Button>
    </div>
  );
};

export default CoinWidget;
