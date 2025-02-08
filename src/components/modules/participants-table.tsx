"use client";

import React from "react";
import DataTable, { type Column } from "@/components/molecules/DataTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import getParticipantsIndexer from "@/request/graphql/get_participants";
import { useQuery } from "@tanstack/react-query";
import { type Participant } from "@/constants/queries/participants";

const ParticipantsTable = ({ daoAddress }: { daoAddress: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["participants", daoAddress],
    queryFn: () => getParticipantsIndexer(daoAddress),
  });

  const columns: Column<Participant>[] = [
    {
      id: "id",
      header: "ID",
      cell: (row) => <span>{row.sequence_number}</span>,
    },
    {
      id: "amount_invested",
      header: "Amount",
      cell: (row) => row.amount_invested,
    },
    {
      id: "participant_address",
      header: "Wallet Address",
      cell: (row) => (
        <span className="truncate">{row.participant_address}</span>
      ),
    },
  ];

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white pb-1">Participants</CardTitle>
        <CardDescription>List of all participants in the pool</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable<Participant>
          columns={columns}
          isLoading={isLoading}
          // @ts-ignore
          data={data}
        />
      </CardContent>
    </Card>
  );
};

export default ParticipantsTable;
