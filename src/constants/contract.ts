import { updateAddress } from "@/utils/address";
import { getSecondsTime } from "@/utils/formatters";
import { DaoData } from "@/validation/dao.validation";
import { type MoveStructId } from "@aptos-labs/ts-sdk";

const MODULE_ADDRESS = process.env.NEXT_PUBLIC_MODULE_ADDRESS as string;
const MODULE_NAME = "daos";

const functions = [
  "CREATE_DA0",
  "START_TREADING",
  "JOIN_VIP",
  "JOIN_PUBLIC",
  "CLAIM_DAO_TOKENS",
  "WITHDRAW_UNSUCCESSFUL",
  "SET_WITHDRAWABLE",
  "WITHDRAW_COMPLETION",
  "CREATE_STORE",
];

type IResources = {
  [key in (typeof functions)[number]]: MoveStructId;
};

type IArguments = {
  [key in (typeof functions)[number]]: string[];
};

export const RESOURCES: IResources = {
  CREATE_DA0: `${MODULE_ADDRESS}::${MODULE_NAME}::create_dao`,
  START_TREADING: `${MODULE_ADDRESS}::${MODULE_NAME}::start_trading`,
  JOIN_VIP: `${MODULE_ADDRESS}::${MODULE_NAME}::join_dao_vip`,
  JOIN_PUBLIC: `${MODULE_ADDRESS}::${MODULE_NAME}::join_dao_public`,
  CLAIM_DAO_TOKENS: `${MODULE_ADDRESS}::${MODULE_NAME}::claim_dao_tokens`,
  WITHDRAW_UNSUCCESSFUL: `${MODULE_ADDRESS}::${MODULE_NAME}::withdraw_on_unsuccessful_raise`,
  SET_WITHDRAWABLE: `${MODULE_ADDRESS}::${MODULE_NAME}::set_is_withdrawable`,
  WITHDRAW_COMPLETION: `${MODULE_ADDRESS}::${MODULE_NAME}::withdraw_dao_completion`,
  CREATE_STORE: `${MODULE_ADDRESS}::${MODULE_NAME}::create_store`,
};

export const TYPE_ARGUMENTS: IArguments = {
  CREATE_DA0: [],
  START_TREADING: [],
  JOIN_VIP: [], // TODO: add type arguments
  JOIN_PUBLIC: [], // TODO: add type arguments
  CLAIM_DAO_TOKENS: [],
  WITHDRAW_UNSUCCESSFUL: [], // TODO: add type arguments
  SET_WITHDRAWABLE: [], // TODO: add type arguments
  WITHDRAW_COMPLETION: [], // TODO: add type arguments
  CREATE_STORE: [],
};

export const TYPE_FUN_ARGUMENTS = {
  CREATE_DA0: (dao: DaoData) => [
    dao.title,
    dao.fundTicker,
    dao.description,
    dao.poster,
    dao.website,
    dao.daoXHandle,
    updateAddress("0xa"),
    dao.indexFund,
    getSecondsTime(dao.fundingStarts),
    dao.tradingPeriod,
    "0x24022d815b6860a4da9b93bc3555b6b380cccf9182fe559b0ef824cbe64ddaa3", // UPDATE THIS,
    100000,
    dao.profits,
  ],
};
