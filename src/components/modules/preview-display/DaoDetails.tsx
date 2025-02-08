import React from "react";
import { DaoData } from "@/validation/dao.validation";
import { format, addDays } from "date-fns";
import { FUNDING_PERIOD, FUNDING_HOLD_PERIOD } from "@/constants";
import ListCard from "@/components/molecules/list-card";
import { formatAddress } from "@/utils/formatters";

interface Props extends DaoData {
  tradingStartsAt?: Date;
}

const DaoDetails: React.FC<Props> = ({
  daoXHandle,
  description,
  treasuryAddress,
  daoCoinAddress,
  createdAt,
  fundingStarts,
  walletAddress,
  tradingStartsAt = addDays(
    fundingStarts,
    FUNDING_PERIOD + FUNDING_HOLD_PERIOD
  ),
}) => {
  const data = [
    { label: "Founded By", value: daoXHandle },
    { label: "Description", value: description },
    {
      label: "DAO's Owner Address",
      value: formatAddress(walletAddress),
      copyable: true,
    },
    {
      label: "Treasury Address",
      value: formatAddress(treasuryAddress),
      copyable: true,
    },
    {
      label: "DAO Coin Address",
      value: formatAddress(daoCoinAddress),
      copyable: true,
    },
    { label: "Created", value: format(createdAt, "dd MMM yyyy"), badge: true },
    {
      label: "Trading Date",
      value: format(tradingStartsAt, "dd MMM yyyy"),
      badge: true,
    },
  ];

  return <ListCard title="Details" items={data} />;
};

export default DaoDetails;
