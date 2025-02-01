import React from "react";
import { Clipboard } from "lucide-react";
import { DaoData } from "@/validation/dao.validation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props extends DaoData {
  tradingEnds: string;
}

const MyDaoToken = ({
  walletAddress = '',
  profits = 0,
  daoCoinAddress = '',
  tradingEnds,
  fundingStarts,
}: Props) => {
  const items = [
    { label: "Admin address", value: walletAddress, copyable: true },
    { label: "Creator Carry fee", value: `${profits}%`, badge: true },
    { label: "PFUND token", value: daoCoinAddress, copyable: true },
    { label: "Funding Starts", value: fundingStarts },
    { label: "DAO expiration", value: tradingEnds },
  ];

  return (
    <Card>
      <CardHeader className="p-5 pb-3">
        <h2 className="font-medium text-base">Your DAO tokens</h2>
        <p className="text-xl font-semibold">PFUND</p>
      </CardHeader>
      <CardContent className="space-y-2 p-5 pt-0">
        {items.map((field, index) => (
          <div key={index} className="flex justify-between items-center text-sm text-muted">
            <span className="">{field.label}</span>
            {field.badge ? (
              <Badge variant="secondary">{field.value}</Badge>
            ) : (
              <div className="flex items-center">
                {/* <span className="text-gray-800 mr-2">{field.value}</span> */}
                {field.copyable && (
                  <Clipboard className="w-4 h-4 text-gray-400 cursor-pointer" />
                )}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MyDaoToken;
