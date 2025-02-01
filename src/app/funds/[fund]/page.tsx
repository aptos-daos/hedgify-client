import Chats from "@/components/modules/chats";
import DaoMessage from "@/components/modules/dao-message";
import PreviewDisplay from "@/components/modules/preview-display";
import SwapWidget from "@/components/modules/swap-widget";
import { Separate } from "@/components/molecules/separate-layout";
import { FUNDING_PERIOD, FUNDING_HOLD_PERIOD } from "@/constants";
import DAOAPI from "@/request/dao/dao.api";
import { notFound } from "next/navigation";
import { addDays } from "date-fns";
import MyDaoToken from "@/components/modules/my-dao-token";
import ParticipantsTable from "@/components/modules/participants-table";

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
      <DaoMessage
        {...dao}
        tradingStarts={addDays(
          dao.fundingStarts,
          FUNDING_PERIOD + FUNDING_HOLD_PERIOD
        )}
      />

      <Separate.Root>
        <Separate.Layout>
          <PreviewDisplay {...dao} />
          <ParticipantsTable participants={[]}/>
        </Separate.Layout>

        <Separate.Layout>
          <SwapWidget />
          <MyDaoToken {...dao} tradingEnds="" />
        </Separate.Layout>
      </Separate.Root>
      <Chats daoId={dao.id} />
    </main>
  );
}
