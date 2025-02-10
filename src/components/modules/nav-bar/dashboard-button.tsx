"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Speedometer } from "@phosphor-icons/react/dist/ssr";

const DashboardButton = () => {
  const router = useRouter();
  const { connected } = useWallet();
  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    <InteractiveHoverButton
      onClick={handleClick}
      className={`${!connected && "hidden"}`}
      icon={<Speedometer weight="fill" />}
    >
      Dashboard
    </InteractiveHoverButton>
  );
};

export default DashboardButton;
