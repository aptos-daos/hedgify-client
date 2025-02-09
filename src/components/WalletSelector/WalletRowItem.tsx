import { WalletItem } from "@aptos-labs/wallet-adapter-react";
import { ArrowRight, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletRowItemProps } from "./wallet.d";
import { motion } from "framer-motion";

export default function WalletRowItem({ wallet, isAptosConnect = false }: WalletRowItemProps) {
  const isInstallRequired = () => false;

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02 },
  };

  const renderInstallButton = () => (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={buttonVariants}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="outline"
        className="w-full flex items-center justify-between p-3 space-x-4"
      >
        <div className="flex items-center space-x-3">
          <WalletItem.Icon className="size-8" />
          <WalletItem.Name className="font-medium text-primary" />
        </div>
        <WalletItem.InstallLink>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="size-[26px] bg-blue rounded-full grid place-items-center"
          >
            <Link className="size-4 text-foreground" />
          </motion.div>
        </WalletItem.InstallLink>
      </Button>
    </motion.div>
  );

  const renderConnectButton = () => (
    <WalletItem.ConnectButton asChild>
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={buttonVariants}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="outline"
          className={`bg-white/10 hover:bg-white/20 transition-colors py-7 px-4 rounded-2xl border-0 w-full flex items-center space-x-3 ${
            isAptosConnect ? "justify-between" : "justify-start"
          }`}
        >
          <div className="flex items-center space-x-3">
            <WalletItem.Icon className="size-8" />
            <WalletItem.Name className="font-medium text-foreground" />
          </div>
          {isAptosConnect && (
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="size-5 text-foreground" />
            </motion.div>
          )}
        </Button>
      </motion.div>
    </WalletItem.ConnectButton>
  );

  return (
    <WalletItem wallet={wallet}>
      {isInstallRequired() ? renderInstallButton() : renderConnectButton()}
    </WalletItem>
  );
}
