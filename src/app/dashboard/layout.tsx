import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
};

const DashboardLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export default DashboardLayoutProvider;
