"use client";

import React, { useEffect, useState } from "react";
import { DaoData } from "@/validation/dao.validation";
import { DAO_TOP_MESSAGE } from "@/constants";
import { DaoStatus } from "@/constants";
import { getStartsInFormat } from "@/utils/formatters";

interface Props extends DaoData {
  status: DaoStatus;
  tradingEnds: Date;
}

const DaoMessage = ({ status, tradingEnds }: Props) => {
  const [timestr, setTimestr] = useState("");
  const messages = {
    [DaoStatus.NOT_STARTED]: DAO_TOP_MESSAGE.NOT_STARTED,
    [DaoStatus.TRADING_NOT_STARTED]: DAO_TOP_MESSAGE.TRADING_NOT_STARTED,
    [DaoStatus.NOT_SUCCESSFUL]: DAO_TOP_MESSAGE.NOT_SUCCESSFUL,
    [DaoStatus.FUNDING_LIVE]: DAO_TOP_MESSAGE.TRADING_LIVE,
    [DaoStatus.TRADING_LIVE]: DAO_TOP_MESSAGE.LIVE,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestr(getStartsInFormat(tradingEnds));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-1.5 px-3 text-xs bg-white/5 border border-primary/80 rounded-lg text-center">
      {messages[status](timestr)}
    </div>
  );
};

export default DaoMessage;
