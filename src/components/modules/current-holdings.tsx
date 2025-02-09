"use client";

import React from "react";
import DataTable, { type Column } from "@/components/molecules/DataTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchFungibleAsset } from "@/lib/wallet";
import { DaoData } from "@/validation/dao.validation";
import { useQuery } from "@tanstack/react-query";
import { type FungibleAssetBalance } from "@/request/graphql/get_token_assets";
import { useMarketCapital } from "@/store/dao";
import { formatAddress } from "@/utils/formatters";

const CurrentHoldings: React.FC<DaoData> = (dao) => {
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

  const columns: Column<FungibleAssetBalance>[] = [
    {
      id: "storage_id",
      header: "Asset",
      cell: (row) => <span>{formatAddress(row.storage_id)}</span>,
    },
    {
      id: "amount",
      header: "Balance",
      cell: (row) => <span>{row.amount}</span>,
    },
    {
      id: "asset_type",
      header: "Symbol",
      cell: (row) => <span>{formatAddress(row.asset_type)}</span>,
    },
  ];

  if (error) return <div>Error loading Holdings</div>;

  return (
    <Card className="md:max-w-lg">
      <CardHeader>
        <CardTitle className="text-white pb-1">Current Holdings</CardTitle>
      </CardHeader>
      <CardContent className="text-white">
        <DataTable<FungibleAssetBalance>
          columns={columns}
          //@ts-ignore
          data={data}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default CurrentHoldings;
