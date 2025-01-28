import HomeCardWrapper from "@/components/molecules/wrapper/home-card-wrapper";
import { DaoData } from "@/validation/dao.validation";
import React from "react";
import { DaoCard } from "../../molecules/DaoCard";
import { DaoCardPhone } from "./dao-card-phone";

interface Props {
  title: string;
  daos: DaoData[];
  loading?: boolean;
}

const DaoCardList = ({ title, daos }: Props) => {
  const commonClasses =
    "border rounded-xl border-foreground p-4 pt-7 bg-white/10 flex-col gap-2 transition";
  const desktopClasses =
    "hidden md:flex md:flex-row md:flex-wrap md:gap-5 md:min-h-60 md:h-[26rem] md:w-[50rem]";
  const mobileClasses = "flex md:hidden";

  return (
    <HomeCardWrapper title={title}>
      <div className={`${commonClasses} ${desktopClasses}`}>
        {daos.map((fund) => (
          <DaoCard {...fund} key={fund.id} />
        ))}
      </div>
      <div className={`${commonClasses} ${mobileClasses}`}>
        {daos.map((fund) => (
          <DaoCardPhone {...fund} key={fund.id} />
        ))}
      </div>
    </HomeCardWrapper>
  );
};

export default DaoCardList;
