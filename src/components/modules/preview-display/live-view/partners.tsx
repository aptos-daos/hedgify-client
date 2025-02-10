"use client";

import React from "react";
import { useSubscription } from "@apollo/client";
import {
  GET_PARTICIPANTS_AGGREGATE,
  type GetParticipantsAggregateResponse,
} from "@/constants/queries/participants";
import ValueCard from "./value-card";

const Partners = ({ daoAddress }: { daoAddress: string }) => {
  const { data } = useSubscription<GetParticipantsAggregateResponse>(
    GET_PARTICIPANTS_AGGREGATE,
    {
      variables: {
        daoAddress,
      },
    }
  );

  const count =
    data?.daos_fun_events_dao_join_events_aggregate.aggregate.count ?? 0;

  return <ValueCard heading="Partners" value={count} type="value" />;
};

export default Partners;
