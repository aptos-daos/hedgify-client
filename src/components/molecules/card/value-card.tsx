import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
  heading: string;
  value: string;
}

const ValueCard: React.FC<Props> = ({ heading, value }) => {
  return (
    <Card className="p-4 px-5 bg-white/10">
      <h1 className="text-sm text-muted">{heading}</h1>
      <span className="text-xl md:text-3xl text-white font-semibold">{value}</span>
    </Card>
  );
};

export default ValueCard;
