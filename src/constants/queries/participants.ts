import { gql } from "@apollo/client";

export interface Participant {
  amount_invested: string;
  creation_number: number;
  dao_address: string;
  dao_total_raised: string;
  event_index: number;
  inserted_at: string;
  investment_asset: string;
  is_permissioned: boolean;
  join_time: string;
  participant_address: string;
  sequence_number: number;
  transaction_timestamp: string;
  transaction_version: number;
  user: string;
}

export interface GetParticipantsResponse {
  daos_fun_events_dao_join_events: Participant[];
}

export const GET_PARTICIPANTS = gql`
  query GetDaos($daoAddress: String!) {
    daos_fun_events_dao_join_events(
      limit: 10
      where: { dao_address: { _eq: $daoAddress } }
    ) {
      amount_invested
      creation_number
      dao_address
      dao_total_raised
      event_index
      inserted_at
      investment_asset
      is_permissioned
      join_time
      participant_address
      sequence_number
      transaction_timestamp
      transaction_version
      user
    }
  }
`;
