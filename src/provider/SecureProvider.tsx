"use client";

import React from "react";
import { notFound } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const SecureProvider = ({ children }: { children: React.ReactNode }) => {
  const { connected } = useWallet();
  // if (!connected) return notFound();

  return <>{children}</>;
};

export default SecureProvider;
