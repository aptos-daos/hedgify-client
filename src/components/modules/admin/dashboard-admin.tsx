"use client";

import React from "react";
import DataTable, { type Column } from "@/components/molecules/DataTable";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import useInvite from "@/hooks/use-invite";
import { formatDate } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const DashboardAdmin = () => {
  const queryClient = useQueryClient();
  const { getInviteCodes, createInviteCode } = useInvite();
  const { data: codes = [] } = useQuery({
    queryKey: ["inviteCodes"],
    queryFn: getInviteCodes,
  });

  const handleCopyClick = async () => {
    const code = await createInviteCode();
    await navigator.clipboard.writeText(code);
    await queryClient.invalidateQueries({ queryKey: ["inviteCodes"] });
  };

  const columns: Column<Invite>[] = [
    {
      id: "code",
      header: "Code",
      cell: (row) => <span>{row.code}</span>,
    },
    {
      id: "user",
      header: "User",
      cell: (row) => row.user,
    },
    {
      id: "expiresAt",
      header: "Expires At",
      cell: (row) => formatDate(row.expiresAt, "yyyy-MM-dd HH:mm"),
    },
  ];

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleCopyClick}>
          <Clipboard />
          Generate A New Code
        </Button>
      </div>
      <DataTable<Invite> data={codes} columns={columns} />
    </>
  );
};

export default DashboardAdmin;
