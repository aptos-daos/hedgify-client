"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { TwitterLogo } from "@phosphor-icons/react/dist/ssr";
import { TextMorph } from "@/components/ui/text-morph";
import { useState } from "react";

export default function TwitterAuthButton() {
  const { data: session } = useSession();
  const defText = session?.user?.name ?? session?.user?.username ?? "Sign Out";
  const [text, setText] = useState(defText);

  if (!session)
    return (
      <Button onClick={() => signIn("twitter")}>Sign In with Twitter</Button>
    );

  return (
    <Button
      onClick={() => signOut()}
      onMouseEnter={() => setText("Sign Out")}
      onMouseLeave={() => setText(defText)}
      className="transition min-w-32"
    >
      <TwitterLogo />
      <TextMorph className="text-black">
        {text}
      </TextMorph>
    </Button>
  );
}
