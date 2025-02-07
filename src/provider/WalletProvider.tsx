"use client";

import React, { FC, ReactNode, createContext, useRef, useEffect } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAutoConnectStore } from "@/store/wallet";
import { useToast } from "@/hooks/use-toast";
import UserAPI from "@/request/auth/user.api";
import { getToken } from "@/lib/token";
import useAuthStore from "@/store/auth";

const StoreContext = createContext(null);

const WalletLoginProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setIsAdmin } = useAuthStore();
  const prevConnectedRef = useRef<boolean | null>(null);
  const prevAddressRef = useRef<string | null | undefined>(null);
  const userApi = new UserAPI();
  const { account, connected, signMessage } = useWallet();

  useEffect(() => {
    const handleLogin = async () => {
      if (
        connected &&
        account?.address &&
        (prevConnectedRef.current !== connected ||
          prevAddressRef.current !== account.address)
      ) {
        try {
          // Request a message to sign
          const { message, nonce } = await userApi.requestMessage(
            account?.address
          );

          // Ask the user to sign the message
          const response = await signMessage({ message, nonce });

          if (response?.fullMessage && response?.signature) {
            // Call the login API after a successful signature
            const resp = await userApi.login(
              account.address,
              account.publicKey as string,
              response.fullMessage,
              response.signature.toString()
            );

            if (resp.role && resp.role === "admin") {
              setIsAdmin(true);
            }
          } else {
            console.error("Failed to retrieve full message or signature.");
          }
        } catch (error) {
          console.error("Error during login process:", error);
        }
      }

      prevConnectedRef.current = connected;
      prevAddressRef.current = account?.address;
    };
    if (getToken().length === 0) {
      handleLogin();
    }
  }, [connected, account, userApi, signMessage]);
  return <>{children}</>;
};

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnectStore();
  const storeRef = useRef(null);

  const { toast } = useToast();
  const wallets = [
    new PetraWallet(),
    new MartianWallet(),
    new PontemWallet(),
    new TrustWallet(),
  ];

  return (
    <StoreContext.Provider value={storeRef.current}>
      <AptosWalletAdapterProvider
        plugins={wallets}
        autoConnect={autoConnect}
        dappConfig={{
          network: Network.TESTNET,
          aptosConnectDappId: "57fa42a9-29c6-4f1e-939c-4eefa36d9ff5",
          mizuwallet: {
            manifestURL:
              "https://assets.mz.xyz/static/config/mizuwallet-connect-manifest.json",
          },
        }}
        onError={(error) => {
          console.error(error);

          toast({
            title: "Wallet Error",
            description: error.message || "Unknown wallet error",
            variant: "destructive",
          });
        }}
      >
        <WalletLoginProvider>{children}</WalletLoginProvider>
      </AptosWalletAdapterProvider>
    </StoreContext.Provider>
  );
};

// Hook for easy access to auto-connect state
export const useAutoConnect = () => {
  const { autoConnect, setAutoConnect } = useAutoConnectStore();
  return { autoConnect, setAutoConnect };
};
