// All on server code will be written here

import { getLiveStatus } from "@/utils/status";
import { addDays } from "date-fns";
import DAOAPI from "@/request/dao/dao.api";
import { VIEW } from "@/constants/contract";
import aptos from "@/lib/aptos";
import { getSecondsTime, secondsToDate } from "./formatters";

export const getDaoDetails = async (daoId: string) => {
  const api = new DAOAPI();

  // dao details fetch from server
  let dao = await api.getSingleDAO(daoId);

  if (!dao) {
    return { status: 404 };
  }

  const dao_contract = (await aptos
    .view({
      payload: {
        function: VIEW.GET_DAO_DETAILS,
        functionArguments: [dao.daoCoinAddress],
        typeArguments: ["0x1::string::String"],
      },
    })
    .then((resp) => resp[0])) as DaoContract;

  if (!dao_contract) {
    // SERVER HAS DATA, BUT THERES NO SMART CONTRACT
    return { status: 500 };
  }

  dao = {
    ...dao,
    fundingStarts: secondsToDate(dao_contract.raise_start_time),
  };

  // TODO: Implement validation

  const tradingStarts = secondsToDate(dao_contract.trading_start_time);
  const tradingEnds = secondsToDate(dao_contract.trading_end_time);

  const dao_status = getLiveStatus({
    ...dao,
    totalFunding: Number(dao_contract.max_raise),
    tradingStarts,
    tradingEnds,
  });

  return { status: 200, dao_status, dao, tradingStarts, tradingEnds };
};
