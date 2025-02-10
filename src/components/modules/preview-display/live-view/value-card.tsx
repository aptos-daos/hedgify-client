import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";

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
        return (
          <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={numericValue}
            gaugePrimaryColor="hsl(var(--primary))"
            gaugeSecondaryColor="hsl(var(--secondary))"
          />
        );

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
    <Card className="text-white">
      <CardHeader className="p-4">
        <CardTitle className="text-sm text-muted">{heading}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex items-center justify-center">{renderContent()}</CardContent>
    </Card>
  );
};

export default ValueCard;
