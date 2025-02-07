"use client";

import React from "react";
import { Clipboard } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  copyable: boolean;
  content: string | number;
}

const Copy: React.FC<Props> = ({ copyable, content }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(content));
      // Optional: Add toast or notification here
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy content", err);
    }
  };

  if (!copyable) return null;

  return (
    <motion.button
      onClick={handleCopy}
      className="flex gap-2"
      aria-label="Copy to clipboard"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {content}
      <Clipboard className="w-4 h-4 text-gray-400 cursor-pointer" />
    </motion.button>
  );
};

export default Copy;
