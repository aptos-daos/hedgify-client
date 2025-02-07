"use client";

import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/auth";
import React from "react";
import { useRouter } from "next/navigation";

const DashboardButton = () => {
  const router = useRouter();
  const { isAdmin } = useAuthStore();
  const handleClick = () => {
    router.push("/dashboard");
  };
  if (!isAdmin) return <></>;
  return <Button onClick={handleClick}>Dashboard</Button>;
};

export default DashboardButton;
