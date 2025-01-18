"use client";

import { ToastProvider } from "@/components/ui/toast";
import { SessionProvider } from "next-auth/react";
import React from "react";

const RootLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>;
    </SessionProvider>
  );
};

export default RootLayoutProvider;
