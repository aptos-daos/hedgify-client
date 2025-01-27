import React from "react";
import { DaoData } from "@/validation/dao.validation";
import { ImageCard } from "@/components/molecules/card/image-card";
import LiveView from "./LiveView";
import DaoDetails from "./DaoDetails";
import { Separate } from "@/components/molecules/separate-layout";
import { AnimatedSocialTooltip } from "@/components/ui/animated-social-tooltip";
import { XLogo, TelegramLogo, Planet } from "@phosphor-icons/react/dist/ssr";

const PreviewDisplay: React.FC<DaoData> = (dao) => {
  const iconSize = 16;
  const data = [
    {
      title: "Website",
      icon: <Planet size={iconSize} />,
      value: dao.website,
    },
    {
      title: "Twitter/X",
      icon: <XLogo size={iconSize} />,
      value: dao.daoXHandle || dao.userXHandle,
    },
    {
      title: "Telegram",
      icon: <TelegramLogo size={iconSize} />,
      value: dao.telegramGroup ?? dao.telegramHandle,
    },
  ].filter((item) => typeof item.value === "string");
  return (
    <div className="space-y-2">
      <Separate.Root className="flex gap-2" line={false} responsive={false}>
        <Separate.Layout>
          <ImageCard {...dao} className="h-full">
            <AnimatedSocialTooltip items={data} />
          </ImageCard>
        </Separate.Layout>
        <Separate.Layout>
          <LiveView />
        </Separate.Layout>
      </Separate.Root>

      {/* TODO: Implement Trading Starts At from Indexer */}
      <DaoDetails {...dao} />
    </div>
  );
};

export default PreviewDisplay;
