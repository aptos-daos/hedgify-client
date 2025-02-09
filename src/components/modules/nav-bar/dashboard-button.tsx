"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const DashboardButton = () => {
  const router = useRouter();
  const { connected } = useWallet();
  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    <Button onClick={handleClick} className={`${!connected && "hidden"}`}>
      Dashboard
    </Button>
  );
};

export default DashboardButton;
