import { DaoStatus } from "@/constants";
import { getTotalFunding } from "@/request/graphql/get_total_funding";
import { DaoData } from "@/validation/dao.validation";
import { useEffect, useState } from "react";

const KEY = {
  GOAL: {
    type: "progress",
    title: "Goal",
    getValue: async (dao: DaoData) => {
      const totalFunding = await getTotalFunding(dao.treasuryAddress);
      return `${(totalFunding / dao.indexFund) * 100}%`;
    },
  },
  TWITTER: {
    type: "value",
    title: "Twitter",
    getValue: (dao: DaoData) => {
      return dao.daoXHandle ?? dao.userXHandle;
    },
  },
  MARKET_CAPITAL: {
    type: "value",
    title: "Market Cap",
    getValue: async (dao: DaoData) => {
      return "1M"
    },
  },
  AUM: {
    type: "value",
    title: "AUM",
    getValue: async (dao: DaoData) => {
      return "$1M";
    },
  },
  PARTNERS: {
    type: "value",
    title: "Partners",
    getValue: async (dao: DaoData) => {
      return "$1M";
    },
  },
  RETURNS: {
    type: "value",
    title: "Returns",
    getValue: async (dao: DaoData) => {
      return "$1M";
    },
  },
} as const;

export const LiveKeys = {
  [DaoStatus.FUNDING_LIVE]: ["GOAL", "TWITTER"],
  [DaoStatus.TRADING_LIVE]: ["MARKET_CAPITAL", "AUM", "PARTNERS", "RETURNS"],
  [DaoStatus.NOT_SUCCESSFUL]: ["TWITTER"],
  [DaoStatus.NOT_STARTED]: ["TWITTER"],
  [DaoStatus.TRADING_NOT_STARTED]: ["MARKET_CAPITAL", "TWITTER"],
} as const;

interface IData {
  key: string;
  value: string | number;
  type: "value" | "number" | "progress";
}

export const useLive = (dao: DaoData, status: DaoStatus) => {
  const [liveData, setLiveData] = useState<IData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const relevantKeys = LiveKeys[status] || [];
        const transformedData = await Promise.all(
          relevantKeys.map(async (key) => {
            try {
              const keyConfig = KEY[key as keyof typeof KEY];
              const value = await keyConfig.getValue(dao);

              return {
                key: keyConfig.title,
                value,
                type: keyConfig.type,
              };
            } catch (fetchError) {
              console.error(`Error fetching ${key}:`, fetchError);
              const keyConfig = KEY[key as keyof typeof KEY];
              return {
                key: keyConfig?.title || key,
                value: "N/A",
                type: "error",
              };
            }
          })
        );

        // @ts-ignore
        setLiveData(transformedData);
        setIsLoading(false);
      } catch (generalError) {
        console.error("Error in data fetching:", generalError);
        setError(generalError instanceof Error ? generalError : new Error('Unknown error'));
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { 
    liveData, 
    isLoading, 
    error 
  };
};