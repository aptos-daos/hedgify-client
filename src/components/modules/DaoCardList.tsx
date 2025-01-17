import { DaoData } from "@/validation/dao.validation";
import React from "react";
import { DaoCard } from "../molecules/DaoCard";
import { Skeleton } from "../ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselItem,
} from "@/components/ui/carousel";

interface Props {
  title: string;
  daos: DaoData[];
  loading?: boolean;
}

const DaoCardList = ({ title, daos, loading }: Props) => {
  return (
    <section>
      <h1>{title}</h1>
      <div className="relative w-full px-4">
        <Carousel>
          <CarouselContent className="-ml-4">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-48 w-full mb-4" />
                  ))
              : daos.map((fund: DaoData) => (
                  <CarouselItem key={fund.id}>
                    <DaoCard {...fund} />
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default DaoCardList;
