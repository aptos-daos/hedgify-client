"use client";

import { useDao } from "@/hooks/use-dao";
import React from "react";
import { isAfter, differenceInDays } from "date-fns";
import { DaoData } from "@/validation/dao.validation";
import DaoCardList from "@/components/modules/DaoCardList";
import { FUNDING_PERIOD } from "@/constants";

const HomeCards: React.FC = () => {
  const { daos, loading, error } = useDao(true);
  const currentDate = new Date();

  const featuredFunds = daos.filter((fund: DaoData) => {
    const now = new Date();
    return differenceInDays(fund.fundingStarts, now) < FUNDING_PERIOD;
  });

  const upcomingFunds = daos.filter((fund: DaoData) => {
    return isAfter(fund.fundingStarts, currentDate);
  });

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <DaoCardList
        title="Featured Funds"
        daos={featuredFunds}
        loading={loading}
      />
      <DaoCardList
        title="Upcoming Funds"
        daos={upcomingFunds}
        loading={loading}
      />
    </>
  );
};

export default HomeCards;
