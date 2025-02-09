"use client";

import React, { useState, useEffect } from "react";
import SwapWidgetMolecule from "@/components/molecules/swap-widget";
import { useTokenStore } from "@/store/token";
import { default_token } from "@/constants/token";
import { DaoData } from "@/validation/dao.validation";
import { swap } from "@/lib/panora";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "@/hooks/use-toast";
import { useContract } from "@/hooks/use-contract";

const ManagerSwapWidget: React.FC<DaoData> = (dao) => {
  const { tokenList } = useTokenStore();
  const { account } = useWallet();
  const { executeTransaction } = useContract();
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

  const handleClick = async () => {
    if (!account?.address) {
      toast({
        title: "Please Connect Wallet",
        variant: "destructive",
      });
      return;
    }
    const resp = await swap("", "", "", "");
    const quotes = resp.quotes;
    // TODO: handle response
    const contract_resps = await Promise.all(
      quotes.map((quote) =>
        executeTransaction(
          // TODO: change function string
          quote.txData.function,
          quote.txData.arguments,
          quote.txData.type_arguments
        )
      )
    );
  };

  return (
    <SwapWidgetMolecule
      fromObj={state.from}
      toObj={state.to}
      onClick={handleClick}
      inputSwap
    />
  );
};

export default ManagerSwapWidget;
