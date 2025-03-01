import { DaoData } from "@/validation/dao.validation";
import { DaoStatus } from "@/constants";
import { isAfter } from "date-fns";

interface Dao extends DaoData {
  tradingStarts: Date;
  tradingEnds: Date;
  totalFunding: number;
}

export const getLiveStatus = (dao: Dao): DaoStatus => {
  const now = new Date();
  
  if (isAfter(dao.fundingStarts, now)) {
    console.log('DAO status: Not Started');
    return DaoStatus.NOT_STARTED;
  }
  if (isAfter(dao.tradingEnds, now)) {
    console.log('DAO status: Funding Live');
    return DaoStatus.FUNDING_LIVE;
  }
  if (isAfter(dao.tradingStarts, now) && dao.indexFund <= dao.totalFunding) {
    console.log('DAO status: Trading Not Started');
    return DaoStatus.TRADING_NOT_STARTED;
  }
  if (dao.indexFund > dao.totalFunding) {
    console.log('DAO status: Not Successful');
    return DaoStatus.NOT_SUCCESSFUL;
  }
  console.log('DAO status: Trading Live');
  return DaoStatus.TRADING_LIVE;
};
