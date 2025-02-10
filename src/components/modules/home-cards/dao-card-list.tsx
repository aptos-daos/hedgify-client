import HomeCardWrapper from "@/components/molecules/wrapper/home-card-wrapper";
import { DaoData } from "@/validation/dao.validation";
import React from "react";
import { DaoCard } from "@/components/molecules/DaoCard";
import { DaoCardLong } from "@/components/molecules/card/dao-card-long";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {} from "@/components/ui/card";

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
      <Carousel className={`${commonClasses} ${desktopClasses}`}>
        <CarouselContent>
          {daos.map((fund) => (
            <CarouselItem key={fund.id} className='basis-1/3'>
              <DaoCard {...fund} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className={`${commonClasses} ${mobileClasses}`}>
        {daos.map((fund) => (
          <DaoCardLong {...fund} key={fund.id} url="funds" />
        ))}
      </div>
    </HomeCardWrapper>
  );
};

export default DaoCardList;
