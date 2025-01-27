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
    <section>
      <BottomTopAnimation className="relative py-6 w-fit m-auto">
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 -translate-y-1/2",
            crown && "-translate-y-3/4"
          )}
        >
          {crown && <Crown className="text-primary" size={24} />}
          <div className="p-2 px-4 bg-primary w-fit rounded-full">
            <h2 className="text-xs font-bold tracking-widest text-primary-foreground">
              {title.toLocaleUpperCase()}
            </h2>
          </div>
        </div>
        <div
          className={cn(
            "border rounded-xl min-h-60 border-foreground",
            className
          )}
        >
          {children}
        </div>
      </BottomTopAnimation>
    </section>
  );
};

export default HomeCardWrapper;
