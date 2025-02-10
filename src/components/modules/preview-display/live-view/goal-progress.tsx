"use client";

import React from "react";
import { useSubscription } from "@apollo/client";
import { GET_TOTAL_INVESTED } from "@/constants/queries/invested";
import ValueCard from "./value-card";

const GoalProgress = ({ treasuryAddress }: { treasuryAddress: string }) => {
  const { data } = useSubscription(GET_TOTAL_INVESTED, {
    variables: {
      daoAddress: treasuryAddress,
    },
  });

  const progress =
    data?.daos_fun_events_dao_join_events_aggregate?.aggregate?.sum
      ?.amount_invested ?? 0;

  return <ValueCard heading="Goal" value={progress} type="progress" />;
};

export default GoalProgress;
