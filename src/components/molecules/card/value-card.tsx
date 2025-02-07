import React from "react";
import { Card } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Progress } from "@/components/ui/progress";

interface Props {
  heading: string;
  value: string | number;
  type?: "value" | "progress" | "number";
}

const ValueCard: React.FC<Props> = ({ heading, value, type = "value" }) => {
  const numericValue =
    typeof value === "string" ? Number(value.replace(/[^0-9.-]/g, "")) : value;

  const renderContent = () => {
    switch (type) {
      case "progress":
        return <Progress value={numericValue} className="mt-3" />;

      case "number":
        return (
          <AnimatedNumber
            className="text-xl md:text-3xl text-white font-semibold"
            springOptions={{
              bounce: 0,
              duration: 2000,
            }}
            value={numericValue}
          />
        );

      default:
        return <>{value}</>;
    }
  };

  return (
    <Card className="p-4 px-5 bg-white/10 text-white">
      <h1 className="text-sm text-muted">{heading}</h1>
      {renderContent()}
    </Card>
  );
};

export default ValueCard;
