"use client";

import { useCallback } from "react";
import {
  useWallet,
  WalletSortingOptions,
  groupAndSortWallets,
  isAptosConnectWallet,
  truncateAddress,
  APTOS_CONNECT_ACCOUNT_URL,
  WalletItem,
} from "@aptos-labs/wallet-adapter-react";
import {
  ArrowRight,
  ChevronLeft,
  Copy,
  Link,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  MainWalletViewProps,
  MoreWalletsViewProps,
  WalletRowItemProps,
} from "./wallet.d";
import { useToast } from "@/hooks/use-toast";

interface Props extends WalletSortingOptions {
  secure?: boolean;
}

export function WalletSelector({
  secure = false,
  ...walletSortingOptions
}: Props) {
  const { account, connected, disconnect, wallet } = useWallet();

  const { toast } = useToast();

  const copyAddress = useCallback(async () => {
    if (!account?.address) return;
    try {
      await navigator.clipboard.writeText(account.address);
      toast({
        title: "Success",
        description: "Copied wallet address to clipboard.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Failed to copy wallet address to clipboard.",
        variant: "destructive",
      });
    }
  }, [account?.address]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return connected ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-lg">
          {account?.ansName || truncateAddress(account?.address) || "Unknown"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={copyAddress} className="gap-2">
          <Copy className="h-4 w-4" /> Copy address
        </DropdownMenuItem>
        {wallet && isAptosConnectWallet(wallet) && (
          <DropdownMenuItem asChild>
            <a
              href={APTOS_CONNECT_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2"
            >
              <User className="h-4 w-4" /> Account
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={disconnect} className="gap-2">
          <LogOut className="h-4 w-4" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <ConnectWalletDialog {...walletSortingOptions} />
  );
}

function ConnectWalletDialog({
  ...walletSortingOptions
}: WalletSortingOptions) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [moreView, setMoreView] = useState(false);
  const { wallets = [] } = useWallet();

  // Utility function to filter wallets
  const filteredWallets = wallets.filter((wallet) =>
    ["Petra", "Martian", "Continue with Google"].includes(wallet.name)
  );

  const { aptosConnectWallets, availableWallets, installableWallets } =
    groupAndSortWallets(filteredWallets, walletSortingOptions);

  const hasAptosConnectWallets = !!aptosConnectWallets.length;

  const onDialogChange = (val: boolean) => {
    setIsDialogOpen(val);
    if (!val) setMoreView(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onDialogChange}>
      <DialogTrigger asChild>
        <Button className="rounded-lg w-full">Connect a Wallet</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-auto w-96 p-6">
        <DialogTitle hidden></DialogTitle>
        {!moreView ? (
          <MainWalletView
            hasAptosConnectWallets={hasAptosConnectWallets}
            aptosConnectWallets={aptosConnectWallets}
            availableWallets={availableWallets}
            installableWallets={installableWallets}
            onMoreViewToggle={() => setMoreView(true)}
          />
        ) : (
          <MoreWalletsView
            installableWallets={installableWallets}
            onBackToggle={() => setMoreView(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function MainWalletView({
  hasAptosConnectWallets,
  aptosConnectWallets,
  availableWallets,
  installableWallets,
  onMoreViewToggle,
}: MainWalletViewProps) {
  return (
    <>
      <DialogHeader className="pt-2">
        <DialogTitle className="flex flex-col text-center leading-snug font-semibold mt-4">
          Connect to DAOs
        </DialogTitle>
      </DialogHeader>

      {hasAptosConnectWallets &&
        aptosConnectWallets.map((wallet) => (
          <WalletRowItem key={wallet.name} wallet={wallet} isAptosConnect />
        ))}

      <div className="flex flex-col gap-3">
        {availableWallets.map((wallet) => (
          <WalletRowItem key={wallet.name} wallet={wallet} />
        ))}

        {!!installableWallets.length && (
          <Button
            size="sm"
            variant="link"
            className="gap-2 text-blue font-medium text-sm"
            onClick={onMoreViewToggle}
          >
            More wallets
          </Button>
        )}
      </div>
    </>
  );
}

function MoreWalletsView({
  installableWallets,
  onBackToggle,
}: MoreWalletsViewProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          More Wallets
        </DialogTitle>
      </DialogHeader>

      {installableWallets.map((wallet) => (
        <WalletRowItem key={wallet.name} wallet={wallet} />
      ))}

      <Button
        size="sm"
        variant="link"
        className="gap-1 text-blue font-medium flex justify-start"
        onClick={onBackToggle}
      >
        <ChevronLeft className="w-4 h-4" /> Go Back
      </Button>
    </>
  );
}

function WalletRowItem({ wallet, isAptosConnect = false }: WalletRowItemProps) {
  const isInstallRequired = (wallet: any) => {
    // Implement your install check logic here
    return false; // placeholder
  };

  const renderContent = () => {
    if (isInstallRequired(wallet)) {
      return (
        <Button
          variant="outline"
          className="w-full flex items-center justify-between p-3 space-x-4"
        >
          <div className="flex items-center space-x-3">
            <WalletItem.Icon className="size-8" />
            <WalletItem.Name className="font-medium text-primary" />
          </div>
          <WalletItem.InstallLink>
            <div className="size-[26px] bg-blue rounded-full grid place-items-center">
              <Link className="size-4 text-foreground" />
            </div>
          </WalletItem.InstallLink>
        </Button>
      );
    }

    return (
      <WalletItem.ConnectButton asChild>
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
          {isAptosConnect && <ArrowRight className="size-5 text-foreground" />}
        </Button>
      </WalletItem.ConnectButton>
    );
  };

  return <WalletItem wallet={wallet}>{renderContent()}</WalletItem>;
}
