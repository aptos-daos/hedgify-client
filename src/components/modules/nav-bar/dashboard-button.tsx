"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Speedometer } from "@phosphor-icons/react/dist/ssr";
import { useSession } from "next-auth/react";

const DashboardButton = () => {
  const router = useRouter();
  const { connected } = useWallet();
  const {status}= useSession();
  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    <InteractiveHoverButton
      onClick={handleClick}
      className={`${!connected && status !== "authenticated" && "hidden"}`}
      icon={<Speedometer weight="fill" />}
    >
      Dashboard
    </InteractiveHoverButton>
  );
};

export default DashboardButton;
