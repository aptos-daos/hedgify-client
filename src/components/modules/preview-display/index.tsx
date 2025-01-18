import React from "react";
import { DaoData } from "@/validation/dao.validation";
import { ImageCard } from "@/components/molecules/card/image-card";
import LiveView from "./LiveView";
import DaoDetails from "./DaoDetails";

interface Props extends DaoData {}

const PreviewDisplay: React.FC<Props> = (dao) => {
  return (
    <div className="space-y-2">
      <div className="flex w-full gap-2">
        <ImageCard {...dao} />
        <LiveView />
      </div>

      <DaoDetails {...dao} />
    </div>
  );
};

export default PreviewDisplay;
