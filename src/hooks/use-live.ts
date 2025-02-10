import { DaoStatus } from "@/constants";
import { getTotalFunding } from "@/request/graphql/get_total_funding";
import { DaoData } from "@/validation/dao.validation";
import { useEffect, useState } from "react";


// const KEY = {
//   [KeyType.GOAL]: {
//     type: "progress",
//     title: "Goal",
//     getValue: async (dao: DaoData) => {
//       const totalFunding = await getTotalFunding(dao.treasuryAddress);
//       return `${(totalFunding / dao.indexFund) * 100}%`;
//     },
//   },
//   [KeyType.TWITTER]: {
//     type: "value",
//     title: "Twitter",
//     getValue: (dao: DaoData) => {
//       return dao.daoXHandle ?? dao.userXHandle;
//     },
//   },
//   [KeyType.MARKET_CAPITAL]: {
//     type: "value",
//     title: "Market Cap",
//     getValue: async (dao: DaoData) => {
//       return "1M"
//     },
//   },
//   [KeyType.AUM]: {
//     type: "value",
//     title: "AUM",
//     getValue: async (dao: DaoData) => {
//       return "$1M";
//     },
//   },
//   [KeyType.PARTNERS]: {
//     type: "value",
//     title: "Partners",
//     getValue: async (dao: DaoData) => {
//       return "$1M";
//     },
//   },
//   [KeyType.RETURNS]: {
//     type: "value",
//     title: "Returns",
//     getValue: async (dao: DaoData) => {
//       return "$1M";
//     },
//   },
// } as const;
