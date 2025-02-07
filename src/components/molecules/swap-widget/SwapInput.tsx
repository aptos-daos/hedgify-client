import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import CoinList from "./coin-widget/coin-list";
import { getLabel } from "@/utils/formatters";
import { cn } from "@/lib/utils";
import { fetchBalance } from "@/lib/wallet";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

interface SwapInputProps {
  label: string;
  value?: number | null;
  onChange?: (value: number) => void;
  onTokenChange?: (token: Token) => void;
  coins: any[];
  default_token: Token;
}

const SwapInput: React.FC<SwapInputProps> = ({
  label,
  value,
  onChange,
  coins,
  default_token,
}) => {
  const {account} = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [activeToken, setActiveToken] = useState<Token>(default_token);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (account && account?.address.length > 0)
      fetchBalance(account.address, activeToken?.tokenAddress)
        .then((balance) => {
          console.log(balance)
          setBalance(balance);
        })
        .catch((err) => {
          console.error(err);
          setBalance(null);
        });
  }, [account?.address, activeToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  const handleClose = (index: number) => {
    setActiveToken(coins[index]);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span className="select-none text-muted">{getLabel(label)}</span>
        <span className="flex items-center gap-1 text-muted">
          Wallet Balance:{" "}
          {balance?.toFixed(2) ?? "0.00"}
          {activeToken?.symbol}
        </span>
      </div>
      <div className="relative">
        <Input
          type="number"
          placeholder="0.0"
          value={value || ""}
          onChange={handleChange}
          className="pr-16"
        />
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger
            className={cn(
              "curson-pointer text-xs absolute right-2 top-[18px] -translate-y-1/2 px-2 py-1 rounded",
              coins.length > 1 ? "bg-primary cursor-pointer" : "bg-gray-100"
            )}
            disabled={coins.length < 2}
          >
            {coins.length > 0 ? activeToken?.symbol || "APT" : "APT"}
          </DrawerTrigger>
          <CoinList coins={coins} onClose={handleClose} />
        </Drawer>
      </div>
    </div>
  );
};

export default SwapInput;
