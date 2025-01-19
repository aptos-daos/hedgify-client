"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import DAOForm from "./Form";
import FormInput from "./form-input";
import { toFormikValidationSchema } from "zod-formik-adapter";
import InviteAPI from "@/request/invite/invite.api";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useSession } from "next-auth/react";
import { type DaoFormData } from "@/validation/dao.validation";

export const inviteSchema = z.object({
  inviteCode: z.string().min(6, "Invite code must be at least 6 characters"),
});

interface Props {
  inviteCode: string;
  children: React.ReactNode;
}

const DaoInitForm: React.FC<Props> = ({ inviteCode, children }) => {
  const api = new InviteAPI();
  const { data: session, status } = useSession();
  const [scope, animate] = useAnimate();
  const [verified, setVerified] = useState(inviteCode.length > 0);

  const handleCreateDao = () => {

  }

  const formik = useFormik<{ inviteCode: string }>({
    initialValues: {
      inviteCode,
    },
    validationSchema: toFormikValidationSchema(inviteSchema),
    onSubmit: async (values) => {
      const v = await api.validateInvite(values.inviteCode);
      setVerified(v);
      animate(scope.current, { marginTop: 0 });
    },
  });

  return (
    <>
      <div className={"min-w-max space-y-2 md:space-y-4 mt-10"} ref={scope}>
        <Card className="w-full min-w-96 mx-auto p-6 pace-y-6">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <FormInput
              name="inviteCode"
              label="Invite Code"
              placeholder="XXX-XXX-XXX-XXX-XXX"
              formik={formik}
              disabled={verified}
              />
            {!verified && (
              <Button type="submit" className="w-full font-semibold" disabled={status !== "authenticated"}>
                {status === "authenticated" ? "Check Eligibility" : "Please Sign in With Twitter"}
              </Button>
            )}
          </form>
        </Card>

        <AnimatePresence>
          {verified && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="w-full max-w-md mx-auto p-6">
                <h2 className="text-lg md:text-2xl font-bold text-center">
                  Create Your Hedge Fund DAO
                </h2>

                <DAOForm onSubmit={handleCreateDao}/>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {verified && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            className="!m-0 min-w-96"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DaoInitForm;
