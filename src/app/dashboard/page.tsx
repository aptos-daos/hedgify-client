"use client";

import React from "react";
import { DaoCardLong } from "@/components/molecules/card/dao-card-long";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useDao } from "@/hooks/use-dao";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/auth";
import DashboardAdmin from "@/components/modules/admin/dashboard-admin";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { isAdmin } = useAuthStore();
  const { account } = useWallet();
  const { fetchAllDaoData } = useDao();

  const {
    data: daos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["daos", account?.address],
    queryFn: () => fetchAllDaoData(),
    enabled: !!account?.address,
  });

  if (error) return <div>Error loading DAOs</div>;

  if (isLoading) {
    return (
      <main>
        {isAdmin && <DashboardAdmin />}
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </main>
    );
  }

  return (
    <main>
      {isAdmin && <DashboardAdmin />}
      {daos?.map((dao) => (
        <DaoCardLong key={dao.id} {...dao} />
      ))}
    </main>
  );
};

export default Dashboard;
