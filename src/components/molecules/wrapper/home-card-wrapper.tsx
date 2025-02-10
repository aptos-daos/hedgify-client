import React from "react";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import BottomTopAnimation from "./bottom-top-animation";

interface Props {
  title: string;
  children: React.ReactNode;
  crown?: boolean;
  className?: string;
}

const HomeCardWrapper = ({
  title,
  children,
  crown = false,
  className,
}: Props) => {
  return (
    <section className={cn("w-full px-4 md:px-0", className)}>
      <BottomTopAnimation className="relative py-4 md:py-6 w-full md:w-fit m-auto">
        <div
          className={cn(
            "z-40 absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 -translate-y-1/2",
            crown && "-translate-y-3/4"
          )}
        >
          {crown && <Crown className="text-primary" size={20} />}
          <div className="p-1.5 md:p-2 px-3 md:px-4 bg-primary w-fit rounded-full">
            <h2 className="text-sm md:text-xs font-bold tracking-widest text-primary-foreground">
              {title.toLocaleUpperCase()}
            </h2>
          </div>
        </div>
        {children}
      </BottomTopAnimation>
    </section>
  );
};

export default HomeCardWrapper;
