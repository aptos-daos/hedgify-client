import { Separate } from "@/components/molecules/separate-layout";
import DAOAPI from "@/request/dao/dao.api";
import { notFound } from "next/navigation";
import { ManagerSwapWidget } from "@/components/modules/swap-widgets";
import getDAODetailsIndexer from "@/request/graphql/get_daos";
import { getLiveStatus } from "@/utils/dao";
import { getTotalFunding } from "@/request/graphql/get_total_funding";
import CurrentHoldings from "@/components/modules/current-holdings";
import AdminController from "@/components/modules/admin-controller";
import MarketCapital from "@/components/modules/market-capital";
import { DaoStatus } from "@/constants";
import { addDays } from "date-fns";

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
    tradingStarts: indexer_dao.trading_start_time
      ? new Date(indexer_dao.trading_start_time)
      : new Date(dao.createdAt),
    tradingEnds: indexer_dao.trading_start_time
      ? new Date(indexer_dao.trading_end_time)
      : new Date(addDays(dao.createdAt, dao.tradingPeriod)),
  });

  if (
    dao_status === DaoStatus.FUNDING_LIVE ||
    dao_status === DaoStatus.NOT_STARTED
  ) {
    return (
      <main>
        <AdminController {...dao} />
      </main>
    );
  }

  return (
    <main>
      {/* <DaoMessage
        {...dao}
        tradingStarts={addDays(
          dao.fundingStarts,
          FUNDING_PERIOD + FUNDING_HOLD_PERIOD
        )}
      /> */}

      <Separate.Root>
        <Separate.Layout>
          <MarketCapital />
          <CurrentHoldings {...dao} />
        </Separate.Layout>

        <Separate.Layout>
          <ManagerSwapWidget {...dao} />
        </Separate.Layout>
      </Separate.Root>
    </main>
  );
}
