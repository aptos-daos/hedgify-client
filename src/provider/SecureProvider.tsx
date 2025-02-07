"use client";

import React from "react";
import { notFound } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useAuthStore from "@/store/auth";

const SecureProvider = ({ children }: { children: React.ReactNode }) => {
  const { connected } = useWallet();
  const { isAdmin } = useAuthStore();
  if (!connected || !isAdmin) return notFound();

  if (isAdmin) return <>{children}</>;
};

export default SecureProvider;
