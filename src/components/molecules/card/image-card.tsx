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
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props extends DaoData {
  children?: React.ReactNode;
  className?: string;
  descriptionView?: boolean;
}

export function ImageCard({
  className,
  title,
  description,
  poster,
  indexFund,
  children,
  descriptionView = false,
}: Props) {
  return (
    <Card className={cn("w-fit bg-white p-4 space-y-2", className)}>
      <div className="relative overflow-hidden rounded-xl h-44 md:h-52 aspect-square">
        <Image
          src={poster || DEFAULT_ALTER_IMAGE}
          alt={title}
          className="object-cover"
          fill
        />
      </div>
      <Badge className="text-black text-xs px-1.5">
        Index Fund: {indexFund}
      </Badge>
      <CardTitle className="text-white text-[14px]">
        {"Aditya Birla LGBTQ Memetic Superficial Ultra Giga Fund"}
      </CardTitle>
      {descriptionView && (
        <CardDescription className="line-clamp-2 max-w-52">
          {description}
        </CardDescription>
      )}
      {children}
    </Card>
  );
}
