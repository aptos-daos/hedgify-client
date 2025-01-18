import React from "react";
import { ImageCard } from "./card/image-card";
import { DaoData } from "@/validation/dao.validation";
import { Button } from "../ui/button";
import Link from "next/link";

export function DaoCard(dao: DaoData) {
  const { id } = dao;
  return (
    <ImageCard {...dao}>
      <Link href={`/funds/${id}`}>
        <Button>Check This Fund</Button>
      </Link>
    </ImageCard>
  );
}
