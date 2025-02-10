"use client";

import React from "react";
import DataTable, { type Column } from "@/components/molecules/DataTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DaoData } from "@/validation/dao.validation";
import { type FungibleAssetBalance } from "@/request/graphql/get_token_assets";
import { formatAddress } from "@/utils/formatters";
import { useHoldings } from "@/hooks/use-holdings";

const CurrentHoldings: React.FC<DaoData> = (dao) => {
  const { isLoading, error, data } = useHoldings(dao);
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
