import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CoinList from "./coin-widget/coin-list";

interface SwapInputProps {
  label: string;
  value?: number | null;
  onChange?: (value: number) => void;
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
  const [activeToken, setActiveToken] = useState<Token>(default_token);
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Fetch balance

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  const handleClose = (index: number) => {
    setActiveToken(coins[index]);
    setIsOpen(false);
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span className="select-none">{label}</span>
          <span className="flex items-center gap-1">
            <span className="text-gray-400">Wallet Balance:</span>
            <span>{activeToken?.symbol}</span>
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
              className="text-xs absolute right-2 top-[18px] -translate-y-1/2 bg-gray-100 px-2 py-1 rounded"
              disabled={coins.length < 2}
            >
              {coins.length > 0 ? activeToken?.symbol || "APT" : "APT"}
            </DrawerTrigger>
            <DrawerTitle hidden></DrawerTitle>
            <DrawerContent>
              <CoinList coins={coins} onClose={handleClose} />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default SwapInput;
