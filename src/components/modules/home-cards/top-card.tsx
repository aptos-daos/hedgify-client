import HomeCardWrapper from "@/components/molecules/wrapper/home-card-wrapper";
import { DEFAULT_ALTER_IMAGE } from "@/constants";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  marketCap?: string;
  volume?: string;
  liquidity?: string;
  fundName?: string;
  coinAddress?: string;
}

const TopCard: React.FC<Props> = ({
  marketCap = "$12,55,666",
  volume = "$55,666",
  liquidity = "$22,55,666",
  fundName = "Aditya Birla LGBTQ Fund",
  coinAddress = "0x0",
}) => {
  const items = [
    { label: "Market Capital", value: marketCap },
    { label: "Volume", value: volume },
    { label: "Liquidity", value: liquidity },
  ];

  const commonClasses =
    "overflow-hidden border-foreground p-4 pt-7 bg-white/10 z-10 rounded-xl border gap-4 transition relative";
  const desktopClasses =
    "hidden md:flex md:flex-row md:flex-wrap md:gap-5 md:min-h-80 md:h-[15rem] md:w-[50rem]";
  const mobileClasses = "flex flex-col md:hidden min-h-[24rem]";

  return (
    <Link href={`/funds/${coinAddress}`}>
      <HomeCardWrapper title="Most Traded Fund" className="relative" crown>
        {/* Desktop View */}
        <div className={`${commonClasses} ${desktopClasses}`}>
          <div className="h-full aspect-square relative rounded-lg overflow-hidden z-20">
            <Image
              src={DEFAULT_ALTER_IMAGE}
              fill
              className="object-cover"
              alt="Fund cover image"
            />
          </div>

          <div className="p-6 flex flex-col gap-4 z-20">
            <h3 className="text-3xl font-bold text-white">{fundName}</h3>

            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.label} className="flex md:text-lg gap-1">
                  <span className="text-gray-400">{item.label}:</span>
                  <span className="text-white font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-28 -left-5 rotate-[25deg]  flex gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[30rem] w-16 bg-white" />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className={`${commonClasses} ${mobileClasses}`}>
          <div className="w-full aspect-square relative rounded-lg overflow-hidden z-20">
            <Image
              src={DEFAULT_ALTER_IMAGE}
              fill
              className="object-cover"
              alt="Fund cover image"
            />
          </div>

          <div className="flex flex-col gap-4 z-20">
            <h3 className="text-2xl font-semibold text-white">
              Aditya Birla LGBTQ Fund
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-gray-400 text-sm">{item.label} :</span>
                  <span className="text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-28 -left-5 rotate-[22deg] flex gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[30rem] w-16 bg-white" />
              ))}
            </div>
          </div>
        </div>
      </HomeCardWrapper>
    </Link>
  );
};

export default TopCard;
