import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Copy from "./copy";

interface IData {
  label: string;
  value: string | number;
  copyable?: boolean;
  badge?: boolean;
}

interface Props {
  title: string;
  subtitle?: string;
  items: IData[];
}

const ListCard: React.FC<Props> = ({ title, subtitle, items }) => {
  return (
    <Card className="w-full">
      <CardHeader className="p-5">
        <CardTitle className="text-white">{title}</CardTitle>
        {subtitle && <p className="text-xl font-semibold">{subtitle}</p>}
      </CardHeader>

      <CardContent className="space-y-2 p-5 pt-0">
        {items.map((field, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm text-muted"
          >
            <span className="">{field.label}</span>
            {field.badge ? (
              <Badge variant="secondary">{field.value}</Badge>
            ) : (
              <Copy copyable={field.copyable || false} content={field.value} className="text-right text-xs" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ListCard;
