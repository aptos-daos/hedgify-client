import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SwapInput from "./SwapInput";
import SwapIcon from "./coin-widget/SwapIcon";
import { getAllQuotes } from "@/lib/panora";
import { cn } from "@/lib/utils";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const predefinedAmounts = ["0.5", "1", "2", "5"];
const values = [
  { label: "Price Impact", value: "1.07%" },
  { label: "Platform Fees", value: "0.001 APT" },
];

interface SwapObject {
  amount: number;
  active: Token;
  coins: Token[];
}

interface Props {
  inputSwap?: boolean;
  fromObj: SwapObject;
  toObj: SwapObject;
  onClick: () => void;
  footer?: string;
}

const SwapWidget: React.FC<Props> = ({
  fromObj,
  toObj,
  onClick,
  footer,
  inputSwap = false,
}) => {
  const { connected } = useWallet();
  const [from, setFrom] = useState<SwapObject>(fromObj);
  const [to, setTo] = useState<SwapObject>(toObj);

  const handleSwapButtonClick = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleChangeAmount = (amount: string) => {
    setFrom((prev) => ({
      ...prev,
      amount: Number(amount),
    }));
  };

  const handleInputChange = async (value: number, key: "from" | "to") => {
    if (key === "from") {
      setFrom((prev) => ({
        ...prev,
        amount: value,
      }));
    } else {
      setTo((prev) => ({
        ...prev,
        amount: value,
      }));
    }

    const response = await getAllQuotes(
      String(from.active.chainId),
      String(value),
      from.active.tokenAddress,
      to.active.tokenAddress
    );
  };

  const handleTokenChange = (token: Token, key: "from" | "to") => {
    if (key === "from") {
      setFrom((prev) => ({
        ...prev,
        active: token,
      }));
    } else {
      setTo((prev) => ({
        ...prev,
        active: token,
      }));
    }
  };

  return (
    <Card>
      <CardHeader
        className="flex-row justify-between gap-2 p-5"
        hidden={!inputSwap}
      >
        <Button className="w-full">Buy</Button>
        <Button className="w-full bg-red-400">Sell</Button>
      </CardHeader>
      <CardContent className={cn("space-y-4 p-5", inputSwap && "pt-0")}>
        <div className="space-y-5">
          {/* Predefined Amounts */}
          <div className="grid grid-cols-4 gap-2">
            {predefinedAmounts.map((amount) => (
              <Button
                key={amount}
                className="w-full bg-white hover:bg-muted cursor-pointer"
                onClick={() => handleChangeAmount(amount)}
              >
                {`${amount} ${from.active.symbol}`}
              </Button>
            ))}
          </div>

          {(
            <SwapInput
              label="from"
              value={from.amount}
              coins={from.coins}
              default_token={from.active}
              onChange={(value) => handleInputChange(value, "from")}
              onTokenChange={(token) => handleTokenChange(token, "from")}
            />
          )}
          {inputSwap && <SwapIcon onClick={handleSwapButtonClick} />}
          {to && (
            <SwapInput
              label="to"
              value={to.amount}
              coins={to.coins}
              default_token={to.active}
              onChange={(value) => handleInputChange(value, "to")}
              onTokenChange={(token) => handleTokenChange(token, "to")}
            />
          )}

          {/* Price Impact & Fees */}
          <div className="space-y-2 text-sm">
            {values.map((item, index) => (
              <div key={index} className="flex justify-between text-muted">
                <span>{item.label}:</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Swap Button */}
          <Button
            className="w-full bg-primary"
            disabled={!connected}
            onClick={onClick}
          >
            {connected ? "SWAP for the Sake of GOD" : "Please Connect Wallet"}
          </Button>
        </div>
      </CardContent>
      <CardFooter hidden>
        <div>{footer}</div>
      </CardFooter>
    </Card>
  );
};

export default SwapWidget;
