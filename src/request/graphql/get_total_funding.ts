import { indexerClient } from "@/lib/graphql";
import { GET_TOTAL_INVESTED } from "@/constants/queries/invested";

export const getTotalFunding = async (treasuryAddress: string) => {
  try {
    const result = await indexerClient.query({
      query: GET_TOTAL_INVESTED,
      variables: {
        daoAddress:
          "0xef0b84d92005fcc9c0a2283134365107eb6b2ce2bbb1af2377dcf41ef8f5f66e", //TODO: treasuryAddress,
      },
    });

    return result.data.daos_fun_events_dao_join_events_aggregate.aggregate.sum
      .amount_invested as number;
  } catch (error) {
    console.error("Error fetching total invested:", error);
    return 0;
  }
};
