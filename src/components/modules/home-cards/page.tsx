"use client";

import React from "react";
import { isAfter, differenceInDays } from "date-fns";
import { DaoData } from "@/validation/dao.validation";
import DaoCardList from "./dao-card-list";
import { FUNDING_PERIOD } from "@/constants";
import DAOAPI from "@/request/dao/dao.api";
import { useQuery } from "@tanstack/react-query";
import TopCard from "./top-card";

const HomeCards: React.FC = () => {
  const daoApi = new DAOAPI();
  const {
    data: daos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["daos"],
    queryFn: () => daoApi.getAllDAOs(),
  });

  const currentDate = new Date();

  const featuredFunds =
    daos?.filter((fund: DaoData) => {
      const now = new Date();
      return differenceInDays(fund.fundingStarts, now) < FUNDING_PERIOD;
    }) ?? [];

  const upcomingFunds =
    daos?.filter((fund: DaoData) => {
      return isAfter(fund.fundingStarts, currentDate);
    }) ?? [];

  if (error) {
    return <div className="text-3xl text-center">Error loading data</div>;
  }

  return (
    <>
      <TopCard />
      <DaoCardList
        title="Featured Funds"
        daos={featuredFunds}
        loading={isLoading}
      />
      <DaoCardList
        title="Upcoming Funds"
        daos={upcomingFunds}
        loading={isLoading}
      />
    </>
  );
};

export default HomeCards;
