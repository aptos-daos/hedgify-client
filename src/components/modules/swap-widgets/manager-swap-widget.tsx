"use client";

import React, { useState, useEffect } from "react";
import SwapWidgetMolecule from "@/components/molecules/swap-widget";
import { useTokenStore } from "@/store/token";
import { default_token } from "@/constants/token";
import { DaoData } from "@/validation/dao.validation";

const ManagerSwapWidget: React.FC<DaoData> = (dao) => {
  const { tokenList } = useTokenStore();
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

  const handleClick = async () => {};

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
