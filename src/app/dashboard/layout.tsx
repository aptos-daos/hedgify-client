import React from "react";
import { Metadata } from "next";
import SecureProvider from "@/provider/SecureProvider";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
};

const DashboardLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SecureProvider>{children}</SecureProvider>;
};

export default DashboardLayoutProvider;
