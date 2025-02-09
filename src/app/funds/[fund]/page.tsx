import Chats from "@/components/modules/chats";
import DaoMessage from "@/components/modules/dao-message";
import PreviewDisplay from "@/components/modules/preview-display";
import SwapWidget from "@/components/modules/swap-widgets/token-swap-widget";
import { Separate } from "@/components/molecules/separate-layout";
import DAOAPI from "@/request/dao/dao.api";
import { notFound } from "next/navigation";
import Screener from "@/components/modules/screener";
import getDAODetailsIndexer from "@/request/graphql/get_daos";
import { getTotalFunding } from "@/request/graphql/get_total_funding";
import { getLiveStatus } from "@/utils/dao";
import { DaoStatus } from "@/constants";
import FundsTabs from "@/components/modules/funds";

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

  const indexer_dao = await getDAODetailsIndexer(dao.treasuryAddress);
  const totalFunding = await getTotalFunding(dao.treasuryAddress);
  const dao_status = getLiveStatus({
    ...dao,
    totalFunding,
    tradingStarts: new Date(indexer_dao.trading_start_time * 1000),
    tradingEnds: new Date(indexer_dao.trading_end_time * 1000),
  });

  return (
    <main>
      <DaoMessage
        status={dao_status}
        tradingStarts={new Date(indexer_dao.trading_start_time * 1000)}
        tradingEnds={new Date(indexer_dao.trading_end_time * 1000)}
        {...dao}
      />

      <Separate.Root>
        <Separate.Layout>
          <PreviewDisplay status={dao_status} {...dao} />
          <FundsTabs status={dao_status} {...dao}/>
          {/* <DaoDetails {...dao} /> */}
        </Separate.Layout>

        <Separate.Layout>
          <SwapWidget {...dao} />
          
          {dao_status === DaoStatus.TRADING_LIVE && <Screener />}
          {/* <MyDaoToken {...dao} tradingEnds="" /> */}
        </Separate.Layout>
      </Separate.Root>
      <Chats daoId={dao.id} />
    </main>
  );
}
