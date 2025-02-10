import { DaoData } from "@/validation/dao.validation";
import { useQuery } from "@tanstack/react-query";
import { useMarketCapital } from "@/store/dao";
import { fetchFungibleAsset } from "@/lib/wallet";

export const useHoldings = (dao: DaoData) => {
  const { setMarketCapital, setLoading } = useMarketCapital();

  const { data, isLoading, error } = useQuery({
    queryKey: ["FungibleAssetBalances", dao.treasuryAddress], // TODO: check it once
    queryFn: async () => {
      setLoading(true);
      // TODO: FETCH FROM PANORA AND MATCH THERE BALANCES
      const res = await fetchFungibleAsset(dao.treasuryAddress);

      const mappedRes = res.map((item) => {
        const amount =
          Number(item.amount) / Math.pow(10, item.metadata.decimals);
        return { ...item, amount };
      });

      const totalMarketCapital = mappedRes.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      setMarketCapital(totalMarketCapital);

      setLoading(false);
      return mappedRes;
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};
