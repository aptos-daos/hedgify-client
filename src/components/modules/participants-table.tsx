import React from "react";
import DataTable, { type Column } from "@/components/molecules/DataTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Participant {
  id: string;
  amount: number;
  walletAddress: string;
}

// TODO: IMAGEPLEMENT TABLE
const ParticipantsTable = ({participants}: {participants: Participant[]}) => {
  const columns: Column<Participant>[] = [
    {
      id: "id",
      header: "ID",
      cell: (row) => <span>{row.id}</span>,
    },
    {
      id: "amount",
      header: "Amount",
      cell: (row) => row.amount,
    },
    {
      id: "walletAddress",
      header: "Wallet Address",
      cell: (row) => <span className="truncate">{row.walletAddress}</span>,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white pb-1">Participants</CardTitle>
        <CardDescription>List of all participants in the pool</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={[]} />
      </CardContent>
    </Card>
  );
};

export default ParticipantsTable;
