import SecureProvider from "@/provider/SecureProvider";
import React from "react";

const SecureLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SecureProvider>{children}</SecureProvider>;
};

export default SecureLayout;
