"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { TwitterLogo } from "@phosphor-icons/react/dist/ssr";

export default function TwitterAuthButton() {
  const { data: session } = useSession();
  const defText = session?.user?.name ?? session?.user?.username ?? "Sign Out";
  const [text, setText] = useState(defText);

  if (!session)
    return (
      <InteractiveHoverButton
        icon={<TwitterLogo weight="fill" />}
        onClick={() => signIn("twitter")}
      >
        Sign In with Twitter
      </InteractiveHoverButton>
    );

  return (
    <InteractiveHoverButton
      onClick={() => signOut()}
      onMouseEnter={() => setText("Sign Out")}
      onMouseLeave={() => setText(defText)}
      className="transition"
      icon={<TwitterLogo weight="fill" />}
    >
      <span className="flex items-center justify-center gap-2">{text}</span>
    </InteractiveHoverButton>
  );
}
