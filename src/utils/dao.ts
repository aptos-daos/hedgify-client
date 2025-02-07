import { DaoData } from "@/validation/dao.validation";
import { addDays } from "date-fns";
import { DaoStatus } from "@/constants";

interface Dao extends DaoData {
  tradingStarts: Date;
  tradingEnds: Date;
  totalFunding: number;
}

export const getLiveStatus = (dao: Dao): DaoStatus => {
  const now = new Date();
  
  if (dao.fundingStarts > now) {
    console.log('DAO status: Not Started');
    return DaoStatus.NOT_STARTED;
  }
  if (dao.tradingEnds > now) {
    console.log('DAO status: Funding Live');
    return DaoStatus.FUNDING_LIVE;
  }
  if (dao.tradingStarts > now && dao.indexFund <= dao.totalFunding) {
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
