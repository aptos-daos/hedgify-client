"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import DAOForm from "./Form";
import { FormInput } from "./form-input";
import { toFormikValidationSchema } from "zod-formik-adapter";
import InviteAPI from "@/request/invite/invite.api";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useSession } from "next-auth/react";
import { DaoData, DaoFormData } from "@/validation/dao.validation";
import { useContract } from "@/hooks/use-contract";
import { useDao } from "@/hooks/use-dao";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { CSVRow } from "@/validation/csv.validation";
import { toast } from "@/hooks/use-toast";
import { Modal, ModalBody, ModalContent } from "@/components/ui/animated-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DAOAPI from "@/request/dao/dao.api";

export const inviteSchema = z.object({
  inviteCode: z.string().min(6, "Invite code must be at least 6 characters"),
});

interface Props {
  inviteCode: string;
  children: React.ReactNode;
}

interface IData extends DaoFormData {
  whitelist: CSVRow[];
}

const DaoInitForm: React.FC<Props> = ({ inviteCode, children }) => {
  const router = useRouter();
  const [dao, setDao] = useState<DaoData | null>();
  const [isOpen, setIsOpen] = useState(false);
  const { account, connected } = useWallet();
  const { status } = useSession();
  const inviteApi = new InviteAPI();
  const { updateDaoValue } = useDao();
  const daoAPI = new DAOAPI();
  const contract = useContract();

  const [scope, animate] = useAnimate();
  const [verified, setVerified] = useState(inviteCode.length > 0);
  const [invite, setInvite] = useState(inviteCode);

  const formik = useFormik<{ inviteCode: string }>({
    initialValues: {
      inviteCode,
    },
    validationSchema: toFormikValidationSchema(inviteSchema),
    onSubmit: async (values) => {
      const v = await inviteApi.validateInvite(values.inviteCode);
      setVerified(v);
      if (v) {
        setInvite(values.inviteCode);
        animate(scope.current, { marginTop: 0 });
      }
    },
  });

  const handleCreateDao = async (data: IData) => {
    try {
      const create_resp = await daoAPI.createDAO({ inviteCode: invite, ...data });
      if (create_resp === null) {
        toast({
          title: "Failed to create DAO",
          description: "No response found",
          variant: "destructive",
        });
        return;
      }

      // @ts-ignore
      const contract_resp = await contract.createDao(create_resp);

      if (!contract_resp) {
        toast({
          title: "Failed to create DAO",
          description: "Transaction failed",
          variant: "destructive",
        });
        return;
      }

      const daoCreationEvent = contract_resp.events.find((event) =>
        event.type.includes("DaoCreationEvent")
      );

      if (!daoCreationEvent) {
        toast({
          title: "Failed to create DAO",
          description: "Creation event not found",
          variant: "destructive",
        });
        return;
      }

      const { dao_coin, dao_object_address } = daoCreationEvent.data;

      if (!dao_coin || !dao_object_address) {
        toast({
          title: "Failed to create DAO",
          description: "Missing DAO addresses in event",
          variant: "destructive",
        });
        return;
      }

      // @ts-ignore
      const dao = await updateDaoValue(create_resp.id, {
        treasuryAddress: dao_coin.inner,
        daoCoinAddress: dao_object_address,
      });

      if (!dao) {
        toast({
          title: "Failed to create DAO",
          description: "Something Went Wrong",
          variant: "destructive",
        });
        return;
      }

      setDao(dao);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while creating the DAO",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div
        className={"flex-1 space-y-2 md:space-y-4 mt-10 min-w-sm max-w-md"}
        ref={scope}
      >
        <Card className="w-full mx-auto p-6 pace-y-6">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <FormInput
              name="inviteCode"
              label="Invite Code"
              placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"
              formik={formik}
              disabled={verified}
            />
            {!verified && (
              <Button
                type="submit"
                className="w-full font-semibold"
                disabled={status !== "authenticated" || !connected}
              >
                {!connected
                  ? "Please Connect Your Wallet"
                  : status === "authenticated"
                  ? "Check Eligibility"
                  : "Please Sign in With Twitter"}
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
              <Card className="w-full mx-auto p-6">
                <h2 className="text-lg md:text-2xl font-bold text-center">
                  Create Your Hedge Fund DAO
                </h2>

                <DAOForm
                  onSubmit={handleCreateDao}
                  address={account?.address!}
                />
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
            className="flex-1 hidden md:block m-0! min-w-96"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <Modal open={isOpen} setOpen={setIsOpen}>
        <ModalBody>
          <ModalContent>
            <h3 className="text-lg font-semibold">Transaction Status</h3>
            {dao && dao.poster && (
              <>
                <div className="relative overflow-hidden z-40 bg-white flex flex-col items-start justify-start h-64 w-full mx-auto rounded-md">
                  <div className="relative w-full h-full">
                    <Image
                      src={dao?.poster}
                      alt="Preview"
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
                <Button onClick={() => router.replace(`/dashboard/${dao.id}`)}>
                  Check Modal Dashboard
                </Button>
              </>
            )}
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DaoInitForm;
