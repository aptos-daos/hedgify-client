"use client";

import React, { useEffect } from "react";
import { getTokenList } from "@/lib/panora";
import { useTokenStore } from "@/store/token";
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
  const { setTokenList } = useTokenStore();

  useEffect(() => {
    const fetchTokenList = async () => {
      const tokens = await getTokenList();
      setTokenList(tokens);
    };
    fetchTokenList();
  }, []);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default RootLayoutProvider;
