import { indexerClient } from "@/lib/graphql";
import {
  GET_PARTICIPANTS,
  GetParticipantsResponse,
} from "@/constants/queries/participants";

const getParticipantsIndexer = async (daoAddress: string) => {
  const response = await indexerClient.query<GetParticipantsResponse>({
    query: GET_PARTICIPANTS,
    variables: {
      daoAddress,
    },
  });
  return response.data.daos_fun_events_dao_join_events;
};

export default getParticipantsIndexer;
