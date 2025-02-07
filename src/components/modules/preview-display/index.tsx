import React from "react";
import { DaoData } from "@/validation/dao.validation";
import { ImageCard } from "@/components/molecules/card/image-card";
import LiveView from "./LiveView";
import { Separate } from "@/components/molecules/separate-layout";
import { AnimatedSocialTooltip } from "@/components/ui/animated-social-tooltip";
import { XLogo, TelegramLogo, Planet } from "@phosphor-icons/react/dist/ssr";
import { DaoStatus } from "@/constants";

interface Props extends DaoData{
  status: DaoStatus
}

const PreviewDisplay: React.FC<Props> = ({status, ...dao}) => {
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
    <Separate.Root className="flex gap-2" line={false} responsive={false}>
      <Separate.Layout>
        <ImageCard {...dao} className="h-full">
          <AnimatedSocialTooltip items={data} />
        </ImageCard>
      </Separate.Layout>
      <Separate.Layout>
        <LiveView status={status} {...dao} />
      </Separate.Layout>
    </Separate.Root>
  );
};

export default PreviewDisplay;
