import { indexerClient } from "@/lib/graphql";
import { GET_DAO_DETAILS, DaoDetails } from "@/constants/queries/daos";

const getDAODetailsIndexer = async (daoAddress: string) => {
  const response = await indexerClient.query({
    query: GET_DAO_DETAILS,
    variables: {
      dao_address: daoAddress.toLowerCase(),
    },
  });
  return response.data.daos_fun_events_daos_by_pk as DaoDetails;
};

export default getDAODetailsIndexer;
