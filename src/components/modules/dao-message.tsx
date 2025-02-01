import React from "react";
import { DaoData } from "@/validation/dao.validation";
import { DAO_TOP_MESSAGE } from "@/constants";
import { getLiveStatus } from "@/utils/dao";
import { DaoStatus } from "@/constants";

interface Props extends DaoData {
  tradingStarts: Date;
  totalFunding?: number;
}

const DaoMessage = ({
  indexFund,
  fundingStarts,
  tradingPeriod,
  tradingStarts,
  totalFunding = indexFund,
}: Props) => {
  const status = getLiveStatus({
    indexFund,
    fundingStarts,
    tradingPeriod,
    tradingStarts,
    totalFunding,
  } as any);

  const messages = {
    [DaoStatus.NOT_STARTED]: DAO_TOP_MESSAGE.NOT_STARTED,
    [DaoStatus.TRADING_NOT_STARTED]: DAO_TOP_MESSAGE.TRADING_NOT_STARTED,
    [DaoStatus.NOT_SUCCESSFUL]: DAO_TOP_MESSAGE.NOT_SUCCESSFUL,
    [DaoStatus.FUNDING_LIVE]: DAO_TOP_MESSAGE.TRADING_LIVE,
    [DaoStatus.TRADING_LIVE]: DAO_TOP_MESSAGE.LIVE,
  };

  return (
    <div className="w-full p-1.5 px-3 text-xs bg-white/5 border border-primary/80 rounded-lg text-center">
      {messages[status]}
    </div>
  );
};

export default DaoMessage;
