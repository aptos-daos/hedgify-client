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

const SwapWidget: React.FC<DaoData> = (dao) => {
  const userApi = new UserAPI();
  const daoApi = new DAOAPI();
  const token = new_token({ symbol: dao.fundTicker });
  const { account, connected } = useWallet();
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

  const handleClick = async () => {
    if (!account?.address) {
      toast({
        title: "Please Connect Wallet",
        variant: "destructive",
      });
      return;
    }

    if (dao.isPublic) {
      const resp = await userApi.getAdminSignature(
        dao.treasuryAddress,
        account.address
      );

      const contract_resp = await joinDaoPublic(
        daoData,
        amount,
        resp.signature,
        resp.expire_time_in_seconds
      );
    } else {
      const contract_resp = await joinDaoVip(daoData, amount);
    }
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

export default SwapWidget;
