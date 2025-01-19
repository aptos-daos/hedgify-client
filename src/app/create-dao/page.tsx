"use client";

import React, { useState, useEffect, use, Suspense } from "react";
import DaoInitForm from "@/components/modules/dao-create-form";
import { useSearchParams } from "next/navigation";
import InviteAPI from "@/request/invite/invite.api";
import DAOTokenHolderGuide from "@/components/modules/help";

const CreateDao = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const paramInvite = searchParams.get("invite") || "";
  const [verified, setVerified] = useState(false);
  const api = new InviteAPI();

  useEffect(() => {
    const validateInvite = async () => {
      if (paramInvite) {
        try {
          const isValid = await api.validateInvite(paramInvite);
          setVerified(isValid);
        } catch (error) {
          console.error("Error validating invite:", error);
          setVerified(false);
        }
      }
      setLoading(false);
    };

    validateInvite();
  }, [paramInvite]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex justify-center gap-4">
      <DaoInitForm inviteCode={verified ? paramInvite : ""}>
        <DAOTokenHolderGuide />
      </DaoInitForm>
    </main>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateDao />
    </Suspense>
  );
};

export default Page;
