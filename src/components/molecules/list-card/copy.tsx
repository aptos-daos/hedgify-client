"use client";

import React from "react";
import { Clipboard } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  copyable: boolean;
  content: string | number;
  className?: string;
}

const Copy: React.FC<Props> = ({ copyable, content, className }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(content));
      // Optional: Add toast or notification here
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy content", err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={cn("flex gap-2", className)}
      aria-label="Copy to clipboard"
      whileHover={copyable ? { scale: 1.05 } : undefined}
      whileTap={copyable ? { scale: 0.95 } : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      disabled={!copyable}
    >
      {content}
      {copyable && <Clipboard className="w-4 h-4 text-gray-400 cursor-pointer" />}
    </motion.button>
  );
};

export default Copy;
