"use client";

import React from "react";
import { ToastProvider } from "@/components/ui/toast";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Session } from "next-auth";

const queryClient = new QueryClient();

const RootLayoutProvider = ({
  session,
  children,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default RootLayoutProvider;
