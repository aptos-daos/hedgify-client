import { DaoStatus, LiveViewType, LiveKeys } from "@/constants";
import { DaoData } from "@/validation/dao.validation";
import React from "react";
import GoalProgress from "./goal-progress";
import TwitterCard from "./twitter-card";
import MarketCapital from "../../market-capital";
import Partners from "./partners";
import Returns from "./returns";
import AUM from "./aum";

interface Props extends DaoData {
  status: DaoStatus;
}

const LiveView: React.FC<Props> = ({ status, ...dao }) => {
  const renderView = (viewType: LiveViewType) => {
    switch (viewType) {
      case LiveViewType.GOAL:
        return <GoalProgress treasuryAddress={dao.treasuryAddress} />;
      case LiveViewType.TWITTER:
        return <TwitterCard twitter={dao.daoXHandle || dao.userXHandle} />;
      case LiveViewType.MARKET_CAPITAL:
        return <MarketCapital />;
      case LiveViewType.AUM:
        return <AUM daoAddress={dao.treasuryAddress}/>;
      case LiveViewType.PARTNERS:
        return <Partners daoAddress={dao.treasuryAddress} />;
      case LiveViewType.RETURNS:
        return <Returns daoAddress={dao.treasuryAddress} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {LiveKeys[status].map((item, index) => (
        <React.Fragment key={index}>{renderView(item)}</React.Fragment>
      ))}
    </div>
  );
};

export default LiveView;
