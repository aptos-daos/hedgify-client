import Chats from "@/components/modules/chats";
import PreviewDisplay from "@/components/modules/preview-display";
import { Separate } from "@/components/molecules/separate-layout";
import { notFound } from "next/navigation";
import Screener from "@/components/modules/screener";
import { TRADING_SWAP_ARR, FUNDING_SWAP_ARR } from "@/constants";
import FundsTabs from "@/components/modules/funds";
import {
  TradingLiveSwapWidget,
  TokenSwapWidget,
} from "@/components/modules/swap-widgets";
import DaoMessage from "@/components/modules/dao-message";
import { getDaoDetails } from "@/utils/dao";

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
          <PreviewDisplay status={dao_status} {...dao} />
          <FundsTabs status={dao_status} {...dao} />
        </Separate.Layout>

        <Separate.Layout>
          {FUNDING_SWAP_ARR.includes(dao_status) && (
            <TokenSwapWidget status={dao_status} {...dao} />
          )}

          {TRADING_SWAP_ARR.includes(dao_status) && (
            <>
              <TradingLiveSwapWidget {...dao} />
              <Screener pairAddress={dao.daoCoinAddress}/>
            </>
          )}
        </Separate.Layout>
      </Separate.Root>
      <Chats daoId={dao.id} />
    </main>
  );
}
