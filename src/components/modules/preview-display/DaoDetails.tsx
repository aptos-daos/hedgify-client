import React from "react";
import { DaoData } from "@/validation/dao.validation";
import { format, addDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FUNDING_PERIOD, FUNDING_HOLD_PERIOD } from "@/constants";

interface Props extends DaoData {
  tradingStartsAt?: Date;
}

const DaoDetails: React.FC<Props> = ({
  description,
  treasuryAddress,
  daoCoinAddress,
  createdAt,
  fundingStarts,
  tradingStartsAt = addDays(
    fundingStarts,
    FUNDING_PERIOD + FUNDING_HOLD_PERIOD
  ),
}) => {
  const data = {
    "Founded By": "John Doe",
    Bio: description,
    "DAO's Owner Address": "",
    "Treasury Address": treasuryAddress,
    "DAO Coin Address": daoCoinAddress,
    Created: format(createdAt, "dd MMM yyyy"),
    "Treading Date": format(tradingStartsAt, "dd MMM yyyy"),
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-white">Fund Details</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="text-white text-sm">
            <span className="font-semibold">{`${key}: `}</span>
            <span className="text-muted">{value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DaoDetails;
