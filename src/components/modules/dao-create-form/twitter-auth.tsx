"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      ) : (
        <Button onClick={() => signIn("twitter")}>Sign In with Twitter</Button>
      )}
    </nav>
  );
}