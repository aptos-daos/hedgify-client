import { gql } from "@apollo/client";
import client from "@/lib/graphql";

const query = gql`
  query CoinBalances($address: String!) {
    current_coin_balances(where: { owner_address: { _eq: $address } }) {
      amount
      coin_type
      coin_type_hash
      last_transaction_timestamp
    }
  }
`;

export const fetchBalance = async (address: string, coinType: any) => {
  try {
    const { data } = await client.query({
      query,
      variables: {
        address,
      },
    });
    
    const balance = data.current_coin_balances.find(
      (balance: any) => balance.coin_type === coinType
    );
    
    return isNaN(balance?.amount) ? 0 : balance?.amount/1e8;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }
};
