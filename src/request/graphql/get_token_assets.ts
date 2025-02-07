import { gql } from "@apollo/client";

// Interfaces for CoinBalances query
export interface CoinBalance {
  amount: string;
  coin_type: string;
  coin_type_hash: string;
  last_transaction_timestamp: string;
}

export interface CoinBalancesResponse {
  current_coin_balances: CoinBalance[];
}

// Interfaces for GetFungibleAsset query
export interface AssetMetadata {
  asset_type: string;
  creator_address: string;
  decimals: number;
  icon_uri: string;
  name: string;
  project_uri: string;
  symbol: string;
  token_standard: string;
}

export interface FungibleAssetBalance {
  amount: string;
  amount_v1: string;
  amount_v2: string;
  asset_type_v1: string;
  asset_type_v2: string;
  asset_type: string;
  is_frozen: boolean;
  is_primary: boolean;
  metadata: AssetMetadata;
  owner_address: string;
  storage_id: string;
  token_standard: string;
}

export interface FungibleAssetResponse {
  current_fungible_asset_balances: FungibleAssetBalance[];
}

export const GET_TOKEN_BALANCE = gql`
  query CoinBalances($address: String!) {
    current_coin_balances(where: { owner_address: { _eq: $address } }) {
      amount
      coin_type
      coin_type_hash
      last_transaction_timestamp
    }
  }
`;

export const GET_FUNGIBLE_ASSET_BALANCE = gql`
  query GetFungibleAsset($daoAddress: String!) {
    current_fungible_asset_balances(
      where: { owner_address: { _eq: $daoAddress } }
    ) {
      amount
      amount_v1
      amount_v2
      asset_type_v1
      asset_type_v2
      asset_type
      is_frozen
      is_primary
      metadata {
        asset_type
        creator_address
        decimals
        icon_uri
        name
        project_uri
        symbol
        token_standard
      }
      owner_address
      storage_id
      token_standard
    }
  }
`;
