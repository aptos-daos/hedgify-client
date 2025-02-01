import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

interface RootProps extends Props {
  line?: boolean;
  responsive?: boolean;
}

const Root: React.FC<RootProps> = ({ children, className, line = true, responsive = true }) => {
  return (
    <div className={cn("relative flex w-full gap-2 md:gap-3", className, responsive && "flex-col md:flex-row")}>
      {React.Children.map(children, (child, index) => {
        if (index === React.Children.count(children) - 1) return child;
        return (
          <>
            {child}
            {line && <div className="h-[1px] md:h-auto md:w-[1px] bg-white/10 hidden md:block" />}
          </>
        );
      })}
    </div>
  );
};

const Layout: React.FC<Props> = ({ children, className, ref }) => {
  return <div className={cn("flex-1 space-y-2", className)} ref={ref}>{children}</div>;
};

export const Separate = {
  Root,
  Layout,
};
