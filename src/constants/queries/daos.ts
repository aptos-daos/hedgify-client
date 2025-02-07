import { gql } from "@apollo/client";

export interface DaoDetails {
  __typename: string;
  latest_transaction_version: number;
  max_raise: number;
  profits_to_manager: number;
  public_round_wallet_limit: number;
  raise_end_time: number;
  raise_start_time: number;
  total_raised: number;
  trading_end_time: number;
  trading_start_time: number;
  creator_address: string;
  dao_address: string;
  dao_coin: string;
  dao_coin_uri: string;
  dao_description: string;
  dao_investment_coin: string;
  dao_name: string;
  dao_twitter_uri: string;
  dao_website_uri: string;
  merkle_root: string;
  created_at: string;
  latest_transaction_timestamp: string;
  updated_at: string;
}

export const GET_DAO_DETAILS = gql`
  query GetDao($dao_address: String!) {
    daos_fun_events_daos_by_pk(dao_address: $dao_address) {
      latest_transaction_version
      max_raise
      profits_to_manager
      public_round_wallet_limit
      raise_end_time
      raise_start_time
      total_raised
      trading_end_time
      trading_start_time
      creator_address
      dao_address
      dao_coin
      dao_coin_uri
      dao_description
      dao_investment_coin
      dao_name
      dao_twitter_uri
      dao_website_uri
      merkle_root
      created_at
      latest_transaction_timestamp
      updated_at
    }
  }
`;
