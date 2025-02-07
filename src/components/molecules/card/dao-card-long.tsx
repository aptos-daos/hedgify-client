import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DaoData } from "@/validation/dao.validation";
import Image from "next/image";
import { DEFAULT_ALTER_IMAGE } from "@/constants";
import BottomTopAnimation from "../wrapper/bottom-top-animation";
import Link from "next/link";

interface Props extends DaoData {
  children?: React.ReactNode;
  className?: string;
  descriptionView?: boolean;
}

export function DaoCardLong({ id, title, description, poster }: Props) {
  return (
    <Link href={`/${id}`}>
      <BottomTopAnimation>
        <Card className="p-2">
          <CardHeader hidden></CardHeader>
          <div className="flex gap-2">
            <div className="relative overflow-hidden rounded-xl h-12 aspect-square">
              <Image
                src={poster || DEFAULT_ALTER_IMAGE}
                alt={title}
                className="object-cover"
                fill
              />
            </div>
            <div>
              <CardTitle className="text-white text-[14px]">{title}</CardTitle>
              <CardDescription className="line-clamp-2 max-w-52">
                {description}
              </CardDescription>
            </div>
          </div>
        </Card>
      </BottomTopAnimation>
    </Link>
  );
}
