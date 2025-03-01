"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const JiggleAnimation: React.FC<Props> = ({ children, className }) => {
  return (
    <motion.div
      animate={{
        rotate: [0, -2, 2, -2, 0],
        scale: [1, 1.02, 1, 1.02, 1]
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default JiggleAnimation;
