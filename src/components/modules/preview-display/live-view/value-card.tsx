import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  heading: string;
  value: string | number;
  type?: "value" | "progress" | "number";
  className?: string;
  isLoading?: boolean;
}

const ValueCard: React.FC<Props> = ({
  heading,
  value,
  type = "value",
  className,
  isLoading = false,
}) => {
  const numericValue =
    typeof value === "string" ? Number(value.replace(/[^0-9.-]/g, "")) : value;

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className="h-8 w-[100px]" />;
    }

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
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-sm text-muted">{heading}</CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          "p-4 pt-0 flex items-center justify-start text-2xl font-bold",
          className
        )}
      >
        {isLoading ? <Skeleton className="h-8 w-[100px]" /> : renderContent()}
      </CardContent>
    </Card>
  );
};

export default ValueCard;
