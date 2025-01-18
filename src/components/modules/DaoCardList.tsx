import { DaoData } from "@/validation/dao.validation";
import React from "react";
import { DaoCard } from "../molecules/DaoCard";

interface Props {
  title: string;
  daos: DaoData[];
  loading?: boolean;
}

const DaoCardList = ({ title, daos, loading }: Props) => {
  return (
    <section>
      <div className="relative py-4">
        <div className="p-2 px-4 bg-primary w-fit rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-xs font-bold tracking-widest text-primary-foreground">
            {title.toLocaleUpperCase()}
          </h2>
        </div>
        <div className="border rounded-xl min-h-60 border-foreground p-4 bg-white bg-opacity-10">
          {daos.map((fund: DaoData) => (
            <DaoCard {...fund} key={fund.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DaoCardList;
