import Chats from "@/components/modules/chats";
import PreviewDisplay from "@/components/modules/preview-display";
import SwapWidget from "@/components/modules/swap-widget";
import TradeView from "@/components/modules/tradeview-widget";
import { Separate } from "@/components/molecules/separate-layout";
import DAOAPI from "@/request/dao/dao.api";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ fund: string }>;
}) {
  const fundId = (await params).fund;
  const api = new DAOAPI();

  const dao = await api.getSingleDAO(fundId);

  if (!dao) {
    return notFound();
  }

  return (
    <main>
      <Separate.Root>
        <Separate.Layout>
          <PreviewDisplay {...dao} />
        </Separate.Layout>
        <Separate.Layout>
          <SwapWidget />
          <TradeView {...dao} />
        </Separate.Layout>
      </Separate.Root>
      <Chats daoId={dao.id} />
    </main>
  );
}
