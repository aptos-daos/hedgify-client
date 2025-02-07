import aptos from "@/lib/aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { type MoveStructId } from "@aptos-labs/ts-sdk";
import type { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { useToast } from "./use-toast";
import { DaoData } from "@/validation/dao.validation";
import {
  RESOURCES,
  TYPE_ARGUMENTS,
  TYPE_FUN_ARGUMENTS,
} from "@/constants/contract";

interface IDaoData extends DaoData {
  merkle?: { root: string; proof: string; limit: string };
}

const useContract = () => {
  const { toast } = useToast();
  const { signAndSubmitTransaction, connected } = useWallet();

  const executeTransaction = async (
    funString: MoveStructId,
    typeArguments: string[],
    funArguments: any[] = [],
    onSuccess?: () => void
  ) => {
    if (!connected) {
      toast({
        title: "Error Connecting Wallet",
        description: "Please connect your wallet to perform this action.",
        variant: "destructive",
      });
      return;
    }

    const transaction: InputTransactionData = {
      data: {
        function: funString,
        typeArguments: typeArguments,
        functionArguments: funArguments,
      },
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      const trx = await aptos.waitForTransaction({
        transactionHash: response.hash,
      });

      if (trx.success) {
        console.log("trx complete", trx);
        onSuccess?.();
      }

      return trx;
    } catch (error) {
      console.error("Sign And Submit Error", error);
    }
  };

  const createDao = async (dao: IDaoData) => {
    const _key = "CREATE_DAO";
    return (await executeTransaction(
      RESOURCES[_key],
      TYPE_ARGUMENTS[_key],
      TYPE_FUN_ARGUMENTS[_key](dao)
    )) as TransactionData;
  };

  const joinDaoVip = async (dao: IDaoData, amount: number) => {
    const _key = "JOIN_VIP";

    return (await executeTransaction(
      RESOURCES[_key],
      TYPE_ARGUMENTS[_key],
      TYPE_FUN_ARGUMENTS[_key](dao, amount)
    )) as TransactionData;
  };

  const joinDaoPublic = async (
    dao: IDaoData,
    amount: number,
    signature: string,
    expire_time_in_seconds: string
  ) => {
    const _key = "JOIN_PUBLIC";

    return (await executeTransaction(
      RESOURCES[_key],
      TYPE_ARGUMENTS[_key],
      TYPE_FUN_ARGUMENTS[_key](dao, amount, signature, expire_time_in_seconds)
    )) as TransactionData;
  };

  const startTrading = async (dao: IDaoData) => {
    const _key = "START_TRADING";

    return (await executeTransaction(
      RESOURCES[_key],
      TYPE_ARGUMENTS[_key],
      TYPE_FUN_ARGUMENTS[_key](dao)
    )) as TransactionData;
  };

  const endWhitelist = async (dao: IDaoData) => {
    const _key = "END_WHITELIST";

    return (await executeTransaction(
      RESOURCES[_key],
      TYPE_ARGUMENTS[_key],
      TYPE_FUN_ARGUMENTS[_key](dao)
    )) as TransactionData;
  };

  return { createDao, joinDaoPublic, joinDaoVip, startTrading, endWhitelist };
};

export { useContract };
