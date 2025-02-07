"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { TwitterLogo } from "@phosphor-icons/react/dist/ssr";

export default function TwitterAuthButton() {
  const { data: session } = useSession();

  if (!session)
    return (
      <Button onClick={() => signIn("twitter")}>Sign In with Twitter</Button>
    );

  return (
    <>
      <Button onClick={() => signOut()}>
        <TwitterLogo /> {session.user?.name ?? "Sign Out"}
      </Button>
    </>
  );
}
