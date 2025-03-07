import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type InteractiveHoverButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
};

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, icon, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "backdrop-blur-lg group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background text-sm p-2 px-4 md:px-6 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1 md:gap-2">
        <div className="transition-all duration-300 group-hover:scale-[100.8] text-base md:text-lg">
          {icon}
        </div>
        <span className="inline-block transition-all duration-300 text-xs md:text-sm group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1 md:gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span className="text-xs md:text-sm">{children}</span>
        <ArrowRight className="w-3 h-3 md:w-4 md:h-4"/>
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
