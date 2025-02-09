"use client";

import React, { useState, useEffect } from "react";
import SwapWidgetMolecule from "@/components/molecules/swap-widget";
import { useTokenStore } from "@/store/token";
import { default_token, new_token } from "@/constants/token";
import { DaoData } from "@/validation/dao.validation";
import { useContract } from "@/hooks/use-contract";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "@/hooks/use-toast";
import UserAPI from "@/request/auth/user.api";
import DAOAPI, { DaoSingleResponseType } from "@/request/dao/dao.api";
import { swap } from "@/lib/panora";

const TradingLiveSwapWidget: React.FC<DaoData> = (dao) => {
  const userApi = new UserAPI();
  const daoApi = new DAOAPI();
  const token = new_token({ symbol: dao.fundTicker });
  const { account, connected } = useWallet();
  const { executeTransaction } = useContract();
  const [daoData, setDaoData] = useState<DaoSingleResponseType>(dao);
  const [amount, setAmount] = useState(0);
  const { joinDaoVip, joinDaoPublic } = useContract();
  const { tokenList } = useTokenStore();
  const [state, setState] = useState({
    from: {
      amount: 0,
      active: default_token,
      coins: [default_token],
    },
    to: {
      amount: 0,
      active: token,
      coins: [token],
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

  useEffect(() => {
    const fetchDao = async () => {
      if (connected && !dao.isPublic && account?.address) {
        const idao = await daoApi.getSingleDAO(dao.id, account.address);
        setDaoData(idao);
      }
    };
    
    fetchDao();
  }, [connected, dao.isPublic, dao.id, account?.address]);

  const handleClick = async (from: string, to: string, amount: number) => {
    if (!account?.address) {
      toast({
        title: "Please Connect Wallet",
        variant: "destructive",
      });
      return;
    }
    // TODO: IMPLEMENT SWAP LOGIC
    const resp = await swap(from, to, String(amount), dao.daoCoinAddress);
    const quotes = resp.quotes;
    // TODO: handle response
    const contract_resps = await Promise.all(
      quotes.map((quote) =>
        executeTransaction(
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
      onChange={(value) => setAmount(value.amount)}
      isActive={dao.isPublic || !daoData.merkle}
    />
  );
};

export default TradingLiveSwapWidget;
