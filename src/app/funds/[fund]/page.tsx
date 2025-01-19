import Chats from "@/components/modules/chats";
import PreviewDisplay from "@/components/modules/preview-display";
import SwapWidget from "@/components/modules/swap-widget";
import TradeView from "@/components/modules/tradeview-widget";
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
      <div className="flex justify-between gap-2">
        <PreviewDisplay {...dao} />
        <div>
          <SwapWidget />
          <TradeView {...dao} />
        </div>
      </div>
      <Chats daoId={dao.id} />
    </main>
  );
}
