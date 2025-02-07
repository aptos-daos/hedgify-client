import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { useAnimate, motion } from "motion/react";

interface SwapIconProps {
  onClick?: () => void;
}

const SwapIcon: React.FC<SwapIconProps> = ({ onClick }) => {
  const [scope, animate] = useAnimate();
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    const newRotation = rotation === 180 ? 0 : 180;
    setRotation(newRotation);
    animate("svg", { rotate: newRotation });
    onClick?.();
  };

  return (
    <div className="relative w-full py-2">
      <motion.button
        type="button"
        className="cursor-pointer border-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full p-2"
        ref={scope}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUpDown className="h-6 w-6 text-white" />
      </motion.button>
      <div className="border-t border-gray-200" />
    </div>
  );
};

export default SwapIcon;
