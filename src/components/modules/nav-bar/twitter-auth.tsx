import React from "react";
import { signIn, signOut, auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const TwitterLoginButton = async () => {
  
  const session = await auth();
  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("twitter");
      }}
    >
      <Button type="submit">Sign in with Twitter</Button>
    </form>
  );
};

export default TwitterLoginButton;
