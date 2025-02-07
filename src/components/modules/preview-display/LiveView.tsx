"use client";

import ValueCard from "@/components/molecules/card/value-card";
import { DaoStatus } from "@/constants";
import { useLive } from "@/hooks/use-live";
import { DaoData } from "@/validation/dao.validation";
import React from "react";

interface Props extends DaoData {
  status: DaoStatus;
}

const LiveView: React.FC<Props> = ({ status, ...dao }) => {
  const { liveData } = useLive(dao, status);

  return (
    <div className="space-y-2">
      {liveData.map((item, index) => (
        <ValueCard
          key={index}
          heading={item.key}
          value={item.value}
          type={item.type}
        />
      ))}
    </div>
  );
};

export default LiveView;
