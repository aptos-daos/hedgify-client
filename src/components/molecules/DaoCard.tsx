import React from "react";
import { ImageCard } from "@/components/molecules/card/image-card";
import { DaoData } from "@/validation/dao.validation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DaoCard({ ...dao }: DaoData) {
  const { id } = dao;
  return (
    <ImageCard className="h-[23rem] shadow-b-lg" {...dao} descriptionView>
      <Link href={`/funds/${id}`}>
        <Button className="w-full mt-2 font-bold">Check This Fund</Button>
      </Link>
    </ImageCard>
  );
}
