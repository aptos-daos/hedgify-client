"use client";

import { useDao } from "@/hooks/use-dao";
import React from "react";
import { isAfter, isBefore, parseISO } from "date-fns";
import { DaoData } from "@/validation/dao.validation";
import DaoCardList from "@/components/modules/DaoCardList";

const Home: React.FC = () => {
  const { daos, loading, error } = useDao(true);
  const currentDate = new Date();

  if (error) {
    return <div>Error loading data</div>;
  }

  const featuredFunds = daos.filter((fund: DaoData) => {
    return (
      isAfter(currentDate, fund.fundingStarts) &&
      isBefore(currentDate, parseISO(String(fund.fundingEnds)))
    );
  });

  const upcomingFunds = daos.filter((fund: DaoData) => {
    return isAfter(fund.fundingStarts, currentDate);
  });

  return (
    <main className="pt-20">
      <section className="space-y-2 text-center">
        <h1 className="font-extrabold">Raise Money.</h1>
        <h1 className="font-extrabold">Trade Memes.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa est
          laudantium vero?
        </p>
      </section>
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
    </main>
  );
};

export default Home;
