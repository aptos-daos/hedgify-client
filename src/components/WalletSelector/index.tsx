"use client";

import { useCallback, useMemo, useState } from "react";
import {
  useWallet,
  WalletSortingOptions,
  groupAndSortWallets,
  truncateAddress,
} from "@aptos-labs/wallet-adapter-react";
import { ChevronLeft } from "lucide-react";
import { Wallet } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Modal, ModalBody, ModalContent } from "@/components/ui/animated-modal";
import WalletRowItem from "./WalletRowItem";
import { AnimatePresence, motion } from "framer-motion";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

interface Props extends WalletSortingOptions {
  secure?: boolean;
}

export function WalletSelector({ ...walletSortingOptions }: Props) {
  const { account, connected, disconnect, wallets = [] } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moreView, setMoreView] = useState(false);
  const [text, setText] = useState("Sign Out");

  const filteredWallets = useMemo(() => 
    wallets.filter((w) => ["Petra", "Martian", "Continue with Google"].includes(w.name)),
    [wallets]
  );

  const { aptosConnectWallets, availableWallets, installableWallets } = useMemo(() => 
    groupAndSortWallets(filteredWallets, walletSortingOptions),
    [filteredWallets, walletSortingOptions]
  );

  const handleButtonClick = useCallback(async () => {
    if (connected) {
      await disconnect();
    } else {
      setIsModalOpen(true);
    }

  }, [connected, disconnect]);

  const handleModalClose = useCallback((val: boolean) => {
    setIsModalOpen(val);
    if (!val) setMoreView(false);
  }, []);

  const handleMouseEnter = useCallback(() => setText("Sign Out"), []);
  
  const handleMouseLeave = useCallback(() => 
    setText(account?.ansName || truncateAddress(account?.address) || "Unknown"),
    [account]
  );

  const handleMoreView = useCallback(() => setMoreView(true), []);
  const handleBackView = useCallback(() => setMoreView(false), []);

  return (
    <>
      <InteractiveHoverButton
        onClick={handleButtonClick}
        icon={<Wallet weight="fill" size={16} />}
        className="md:min-w-48"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {connected ? text : "Connect a Wallet"}
      </InteractiveHoverButton>

      <Modal open={isModalOpen} setOpen={handleModalClose}>
        <ModalBody>
          <ModalContent className="max-h-screen space-y-3 overflow-auto w-96 p-6">
            <AnimatePresence mode="wait">
              {moreView ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="link"
                    className="gap-1 text-blue font-medium flex justify-start"
                    onClick={handleBackView}
                  >
                    <ChevronLeft className="w-4 h-4" /> Go Back
                  </Button>
                  {installableWallets.map((wallet, index) => (
                    <WalletRowItem key={`installable-${wallet.name}-${index}`} wallet={wallet} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {!!aptosConnectWallets.length &&
                    aptosConnectWallets.map((wallet, index) => (
                      <WalletRowItem
                        key={`aptos-${wallet.name}-${index}`}
                        wallet={wallet}
                        isAptosConnect
                      />
                    ))}
                  {availableWallets.map((wallet, index) => (
                    <WalletRowItem key={`available-${wallet.name}-${index}`} wallet={wallet} />
                  ))}
                  {!!installableWallets.length && (
                    <Button
                      size="sm"
                      variant="link"
                      className="gap-2 text-blue font-medium text-sm"
                      onClick={handleMoreView}
                    >
                      More wallets
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
}
