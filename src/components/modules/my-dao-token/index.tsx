import React from "react";
import { Clipboard } from "lucide-react";
import { DaoData } from "@/validation/dao.validation";

interface Props extends Partial<DaoData> {
  tokens?: number;
  adminAddress?: string;
  fundType?: string;
  creatorCarryFee?: string;
  pfundToken?: string;
  daoExpiration?: string;
  fundraiseExpiration?: string;
  progressSol?: number;
  totalSol?: number;
}

const MyDaoToken = ({
  tokens = 0,
  adminAddress = '',
  fundType = '',
  creatorCarryFee = '0%',
  pfundToken = '',
  daoExpiration = '',
  fundraiseExpiration = '',
  progressSol = 0,
  totalSol = 0,
}: Props) => {
  const items = [
    { label: "Admin address", value: adminAddress, copyable: true },
    { label: "Fund type", value: fundType, badge: true },
    { label: "Creator Carry fee", value: creatorCarryFee },
    { label: "PFUND token", value: pfundToken, copyable: true },
    { label: "DAO expiration", value: daoExpiration },
    { label: "Fundraise expiration", value: fundraiseExpiration },
    { label: "Progress", value: `${progressSol} SOL / ${totalSol} SOL` },
  ];
  return (
    <div className="p-6 rounded-lg shadow-sm max-w-md">
      <div className="space-y-4">
        <div>
          <h2 className="text-gray-600 text-lg font-medium">Your DAO tokens</h2>
          <p className="text-2xl font-semibold mt-1">{tokens} PFUND</p>
        </div>

        <div className="space-y-3">
          {items.map((field, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">{field.label}</span>
              {field.badge ? (
                <span className="bg-red-50 text-gray-700 px-3 py-1 rounded-md text-sm">
                  {field.value}
                </span>
              ) : (
                <div className="flex items-center">
                  <span className="text-gray-800 mr-2">{field.value}</span>
                  {field.copyable && (
                    <Clipboard className="w-4 h-4 text-gray-400 cursor-pointer" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDaoToken;
