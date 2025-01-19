"use client";

import React from "react";
import { WalletSelector } from "@/components/WalletSelector";
import { usePathname } from "next/navigation";
import { SECURED_PATHS } from "@/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const WalletWrapper = ({ children }: Props) => {
  const pathname = usePathname();
  return (
    <>
      {/* TODO: <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link> */}
      {children}
      <div className="w-fit">
        <WalletSelector secure={SECURED_PATHS.includes(pathname)} />
      </div>
    </>
  );
};

export default WalletWrapper;
