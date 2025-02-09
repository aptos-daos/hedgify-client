"use client";

import React, { useEffect, useState } from "react";
import { DaoData } from "@/validation/dao.validation";
import { DAO_TOP_MESSAGE } from "@/constants";
import { DaoStatus } from "@/constants";
import { getStartsInFormat } from "@/utils/formatters";

interface Props extends DaoData {
  status: DaoStatus;
  tradingStarts: Date;
  tradingEnds: Date;
}

const DaoMessage = ({ status, tradingStarts, tradingEnds }: Props) => {
  const [timestr, setTimestr] = useState("");
  const messages = {
    [DaoStatus.NOT_STARTED]: DAO_TOP_MESSAGE.NOT_STARTED,
    [DaoStatus.TRADING_NOT_STARTED]: DAO_TOP_MESSAGE.TRADING_NOT_STARTED,
    [DaoStatus.NOT_SUCCESSFUL]: DAO_TOP_MESSAGE.NOT_SUCCESSFUL,
    [DaoStatus.FUNDING_LIVE]: DAO_TOP_MESSAGE.FUNDING_LIVE,
    [DaoStatus.TRADING_LIVE]: DAO_TOP_MESSAGE.TRADING_LIVE,
  };

  useEffect(() => {
    const getTime = () => {
      if(status === DaoStatus.NOT_STARTED) {
        return getStartsInFormat(tradingStarts);
      } else if(status === DaoStatus.TRADING_NOT_STARTED) {
        return getStartsInFormat(tradingStarts);
      } else if(status === DaoStatus.NOT_SUCCESSFUL) {
        return getStartsInFormat(tradingEnds);
      } else if(status === DaoStatus.FUNDING_LIVE) {
        return getStartsInFormat(tradingStarts);
      } else if(status === DaoStatus.TRADING_LIVE) {
        return getStartsInFormat(tradingEnds);
      }
    };

    const updateTime = () => {
      setTimestr(getTime() || '');
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [status, tradingStarts, tradingEnds]);

  return (
    <div className="w-full p-1.5 px-3 text-xs bg-white/5 border border-primary/80 rounded-lg text-center">
      {messages[status](timestr)}
    </div>
  );
};

export default DaoMessage;
