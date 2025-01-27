import HomeCardWrapper from "../molecules/wrapper/home-card-wrapper";
import { DaoData } from "@/validation/dao.validation";
import React from "react";
import { DaoCard } from "../molecules/DaoCard";

interface Props {
  title: string;
  daos: DaoData[];
  loading?: boolean;
}

const DaoCardList = ({ title, daos }: Props) => {
  return (
    <HomeCardWrapper
      title={title}
      className="p-4 pt-7 bg-white bg-opacity-10 flex flex-wrap gap-5 transition h-[26rem] w-[50rem]"
    >
      {daos.map((fund: DaoData) => (
        <DaoCard {...fund} key={fund.id} />
      ))}
            {daos.map((fund: DaoData) => (
        <DaoCard {...fund} key={fund.id} />
      ))}
            {daos.map((fund: DaoData) => (
        <DaoCard {...fund} key={fund.id} />
      ))}
    </HomeCardWrapper>
  );
};

export default DaoCardList;
