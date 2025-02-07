import { gql } from "@apollo/client";

export const GET_TOTAL_INVESTED = gql`
  query GetTotalInvested($daoAddress: String!) {
    daos_fun_events_dao_join_events_aggregate(
      where: { dao_address: { _eq: $daoAddress } }
    ) {
      aggregate {
        sum {
          amount_invested
        }
      }
    }
  }
`;
