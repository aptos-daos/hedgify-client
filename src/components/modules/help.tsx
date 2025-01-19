import React from "react";
import { Card } from "@/components/ui/card";
import { guideContent } from "@/constants/help";

const GuideSection = ({
  title,
  points,
}: {
  title: string;
  points: string[];
}) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <ul className="list-disc list-inside space-y-1">
      {points.map((point: string, index: number) => (
        <li key={index} className="text-muted">
          {point}
        </li>
      ))}
    </ul>
  </div>
);

const DAOTokenHolderGuide = () => {
  return (
    <Card className="w-full mx-auto p-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">DAO Token Holder Guide</h1>
      {guideContent.map((section, index) => (
        <GuideSection
          key={index}
          title={section.title}
          points={section.points}
        />
      ))}
    </Card>
  );
};

export default DAOTokenHolderGuide;
