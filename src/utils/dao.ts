import { DaoData } from "@/validation/dao.validation";
import { addDays } from "date-fns";
import { DaoStatus } from "@/constants";

interface Dao extends DaoData {
  tradingStarts: Date;
  totalFunding: number;
}

export const getLiveStatus = (dao: Dao): DaoStatus => {
  const now = new Date();
  const tradingEnds = addDays(dao.tradingStarts, dao.tradingPeriod);
  if (dao.fundingStarts > now) {
    return DaoStatus.NOT_STARTED;
  }
  if (dao.tradingStarts > now && dao.indexFund <= dao.totalFunding) {
    return DaoStatus.TRADING_NOT_STARTED;
  }
  if (dao.indexFund > dao.totalFunding) {
    return DaoStatus.NOT_SUCCESSFUL;
  }
  if (tradingEnds > now) {
    return DaoStatus.FUNDING_LIVE;
  }
  return DaoStatus.TRADING_LIVE;
};
