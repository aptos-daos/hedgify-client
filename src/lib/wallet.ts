import { aptosClient } from "@/lib/graphql";
import {
  GET_FUNGIBLE_ASSET_BALANCE,
  GET_TOKEN_BALANCE,
  type FungibleAssetResponse,
  type FungibleAssetBalance,
} from "@/request/graphql/get_token_assets";

export const fetchBalance = async (address: string, coinType: any) => {
  try {
    const { data } = await aptosClient.query({
      query: GET_TOKEN_BALANCE,
      variables: {
        address,
      },
    });

    const balance = data.current_coin_balances.find(
      (balance: any) => balance.coin_type === coinType
    );

    return isNaN(balance?.amount) ? 0 : balance?.amount / 1e8;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return 0;
  }
};

export const fetchFungibleAsset = async (
  daoAddress: string
): Promise<FungibleAssetBalance[]> => {
  try {
    const { data } = await aptosClient.query<FungibleAssetResponse>({
      query: GET_FUNGIBLE_ASSET_BALANCE,
      variables: {
        daoAddress,
      },
    });
    return data.current_fungible_asset_balances;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return [];
  }
};
