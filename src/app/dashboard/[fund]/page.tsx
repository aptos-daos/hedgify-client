import { Separate } from "@/components/molecules/separate-layout";
import { notFound } from "next/navigation";
import { ManagerSwapWidget } from "@/components/modules/swap-widgets";
import CurrentHoldings from "@/components/modules/current-holdings";
import AdminController from "@/components/modules/admin-controller";
import MarketCapital from "@/components/modules/market-capital";
import { DaoStatus } from "@/constants";
import { getDaoDetails } from "@/utils/dao";
import DaoMessage from "@/components/modules/dao-message";

export default async function Page({
  params,
}: {
  params: Promise<{ fund: string }>;
}) {
  const fundId = (await params).fund;
  const { status, dao_status, dao, tradingStarts, tradingEnds } =
    await getDaoDetails(fundId);

  if (status !== 200 || !dao_status || !dao) {
    return notFound();
  }

  if (
    dao_status === DaoStatus.FUNDING_LIVE ||
    dao_status === DaoStatus.NOT_STARTED
  ) {
    return (
      <main>
        <DaoMessage
          status={dao_status}
          tradingStarts={tradingStarts}
          tradingEnds={tradingEnds}
          {...dao}
        />
        <AdminController {...dao} />
      </main>
    );
  }

  return (
    <main>
      <DaoMessage
        status={dao_status}
        tradingStarts={tradingStarts}
        tradingEnds={tradingEnds}
        {...dao}
      />

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
