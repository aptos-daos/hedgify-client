"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { TwitterHoverButton } from "@/components/magicui/twitter-hover-button";

export default function TwitterAuthButton() {
  const { data: session } = useSession();
  const defText = session?.user?.name ?? session?.user?.username ?? "Sign Out";
  const [text, setText] = useState(defText);

  if (!session)
    return (
      <Button onClick={() => signIn("twitter")}>Sign In with Twitter</Button>
    );

  return (
    <TwitterHoverButton
      onClick={() => signOut()}
      onMouseEnter={() => setText("Sign Out")}
      onMouseLeave={() => setText(defText)}
      className="transition"
    >
      <span className="flex items-center justify-center gap-2">
        {text}
      </span>
    </TwitterHoverButton>
  );
}
