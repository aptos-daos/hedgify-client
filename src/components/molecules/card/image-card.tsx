import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DaoData } from "@/validation/dao.validation";
import Image from "next/image";
import { DEFAULT_ALTER_IMAGE } from "@/constants";

interface Props extends DaoData {
  children?: React.ReactNode;
}

export function ImageCard({ title, description, poster, children }: Props) {
  return (
    <Card className="w-fit bg-white p-4">
      <div className="relative overflow-hidden rounded-xl h-60 w-60">
        <Image
          src={poster || DEFAULT_ALTER_IMAGE}
          alt={title}
          className="object-cover"
          fill
        />
      </div>
      <p className="text-primary text-xs">Index Fund: $1970000</p>
      <CardTitle className="text-white">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {children}
    </Card>
  );
}
