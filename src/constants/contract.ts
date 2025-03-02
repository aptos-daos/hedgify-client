import { updateAddress } from "@/utils/address";
import { getSecondsTime } from "@/utils/formatters";
import { CSVRow } from "@/validation/csv.validation";
import { DaoData } from "@/validation/dao.validation";
import { type MoveStructId } from "@aptos-labs/ts-sdk";

interface IData extends DaoData {
  merkle?: { root: string; proof: string; limit: string };
}

const MODULE_ADDRESS = process.env.NEXT_PUBLIC_MODULE_ADDRESS as string;
const MODULE_NAME = "daos";

/*
struct JoinDaoSignature has drop {
        /// Dao address
        dao_address: vector<u8>,
        /// Joinee address
        joinee_address: vector<u8>,
        /// Expiration time of the signature
        expire_time_in_seconds: u64,
    }
*/

const functions = [
  "CREATE_DAO",
  "START_TREADING",
  "JOIN_VIP",
  "JOIN_PUBLIC",
  "CLAIM_DAO_TOKENS",
  "WITHDRAW_UNSUCCESSFUL",
  "SET_WITHDRAWABLE",
  "WITHDRAW_COMPLETION",
  "CREATE_STORE",
  "END_WHITELIST",
];

type IResources = {
  [key in (typeof functions)[number]]: MoveStructId;
};

type IArguments = {
  [key in (typeof functions)[number]]: string[];
};

export const VIEW: IResources = {
  GET_DAO_DETAILS: `${MODULE_ADDRESS}::${MODULE_NAME}::get_dao_config`,
};

export const RESOURCES: IResources = {
  CREATE_DAO: `${MODULE_ADDRESS}::${MODULE_NAME}::create_dao`,
  START_TREADING: `${MODULE_ADDRESS}::${MODULE_NAME}::start_trading`,
  JOIN_VIP: `${MODULE_ADDRESS}::${MODULE_NAME}::join_dao_vip`,
  JOIN_PUBLIC: `${MODULE_ADDRESS}::${MODULE_NAME}::join_dao_public`,
  CLAIM_DAO_TOKENS: `${MODULE_ADDRESS}::${MODULE_NAME}::claim_dao_tokens`,
  WITHDRAW_UNSUCCESSFUL: `${MODULE_ADDRESS}::${MODULE_NAME}::withdraw_on_unsuccessful_raise`,
  SET_WITHDRAWABLE: `${MODULE_ADDRESS}::${MODULE_NAME}::set_is_withdrawable`,
  WITHDRAW_COMPLETION: `${MODULE_ADDRESS}::${MODULE_NAME}::withdraw_dao_completion`,
  CREATE_STORE: `${MODULE_ADDRESS}::${MODULE_NAME}::create_store`,
  END_WHITELIST: `${MODULE_ADDRESS}::${MODULE_NAME}::end_whitelist`,
  DAO_SWAP_PANORA: `${MODULE_ADDRESS}::${MODULE_NAME}::execute_dao_swap_panora`,
};

export const TYPE_FUN_ARGUMENTS = {
  CREATE_DAO: (dao: IData) => [
    dao.title,
    dao.fundTicker,
    dao.description,
    dao.poster,
    dao.website,
    dao.daoXHandle,
    updateAddress("a"),
    dao.indexFund,
    getSecondsTime(dao.fundingStarts),
    dao.tradingPeriod * 24 * 60 * 60, // IN SECONDS
    dao.merkle?.root || [],
    getSecondsTime(dao.whitelistEnds),
    dao.publicLimit,
    dao.profits,
    [],
    "uhferfer",
    getSecondsTime(new Date())
  ],
  JOIN_VIP: (dao: IData, amount: number) => [
    dao.treasuryAddress,
    amount,
    dao.merkle?.proof || [],
    dao.merkle?.limit || 0,
  ],
  JOIN_PUBLIC: (
    dao: IData,
    amount: number,
    sign: string,
    sign_exp_time: string
  ) => [dao.treasuryAddress, amount, sign, sign_exp_time],
  START_TRADING: (dao: IData) => [dao.treasuryAddress],
  END_WHITELIST: (dao: IData) => [dao.treasuryAddress],
};
