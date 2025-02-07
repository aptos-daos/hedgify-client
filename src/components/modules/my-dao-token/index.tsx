import React from "react";
import { DaoData } from "@/validation/dao.validation";
import ListCard from "@/components/molecules/list-card";
import { format } from "date-fns";

interface Props extends DaoData {
  tradingEnds: string;
}

const MyDaoToken = ({
  walletAddress = "",
  profits = 0,
  daoCoinAddress = "",
  tradingEnds,
  fundingStarts,
}: Props) => {
  const items = [
    { label: "Admin address", value: walletAddress, copyable: true },
    { label: "Creator Carry fee", value: `${profits}%`, badge: true },
    { label: "PFUND token", value: daoCoinAddress, copyable: true },
    { label: "Funding Starts", value: format(fundingStarts, "dd MMM yyyy") },
    { label: "DAO expiration", value: format(tradingEnds, "dd MMM yyyy") },
  ];

  return <ListCard title="My Dao Tokens" subtitle="0 Pund" items={items} />;
};

export default MyDaoToken;
