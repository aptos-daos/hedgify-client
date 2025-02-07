"use client";
import { cn } from "@/lib/utils";
import { motion, SpringOptions, useSpring, useTransform } from "motion/react";
import { useEffect, JSX } from "react";

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: keyof JSX.IntrinsicElements | React.ComponentType;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
}: AnimatedNumberProps) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current)
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  );
}
