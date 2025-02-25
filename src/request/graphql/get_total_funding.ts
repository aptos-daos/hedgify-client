import { indexerClient } from "@/lib/graphql";
import { GET_TOTAL_INVESTED } from "@/constants/queries/invested";

export const  getTotalFunding = async (treasuryAddress: string) => {
  try {
    return 35;
  //   const result = await indexerClient.query({
  //     query: GET_TOTAL_INVESTED,
  //     variables: {
  //       daoAddress: treasuryAddress,
  //     },
  //   });

  //   return result.data.daos_fun_events_dao_join_events_aggregate.aggregate.sum
  //     .amount_invested as number;
  } catch (error) {
    console.error("Error fetching total invested:", error);
    return 0;
  }
};
