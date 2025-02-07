interface TransactionData {
  version: string;
  hash: string;
  state_change_hash: string;
  event_root_hash: string;
  state_checkpoint_hash: string | null;
  gas_used: string;
  success: boolean;
  vm_status: string;
  accumulator_root_hash: string;
  changes: Change[];
  sender: string;
  sequence_number: string;
  max_gas_amount: string;
  gas_unit_price: string;
  expiration_timestamp_secs: string;
  payload: Payload;
  signature: Signature;
  events: Event[];
  timestamp: string;
  type: string;
}

interface Change {
  address: string;
  state_key_hash: string;
  data?: {
    type: string;
    data: any;
  };
  handle?: string;
  key?: string;
  value?: string;
  type: string;
}

interface CoinStore {
  coin: {
    value: string;
  };
  deposit_events: EventInfo;
  frozen: boolean;
  withdraw_events: EventInfo;
}

interface EventInfo {
  counter: string;
  guid: {
    id: {
      addr: string;
      creation_num: string;
    };
  };
}

interface Account {
  authentication_key: string;
  coin_register_events: EventInfo;
  guid_creation_num: string;
  key_rotation_events: EventInfo;
  rotation_capability_offer: {
    for: {
      vec: any[];
    };
  };
  sequence_number: string;
  signer_capability_offer: {
    for: {
      vec: any[];
    };
  };
}

interface Payload {
  function: string;
  type_arguments: any[];
  arguments: Array<string | Record<string, any>>;
  type: string;
}

interface Signature {
  public_key: string;
  signature: string;
  type: string;
}

interface Event {
  guid: {
    creation_number: string;
    account_address: string;
  };
  sequence_number: string;
  type: string;
  data: Record<string, any>;
}

interface DaoConfig {
  creator_address: string;
  dao_acl: {
    permissions: {
      handle: string;
    };
  };
  dao_coin: {
    inner: string;
  };
  dao_coin_burn_ref: {
    metadata: {
      inner: string;
    };
  };
  dao_coin_mint_ref: {
    metadata: {
      inner: string;
    };
  };
  dao_coin_transfer_ref: {
    metadata: {
      inner: string;
    };
  };
  dao_coin_uri: string;
  dao_description: string;
  dao_investment_coin: {
    inner: string;
  };
  dao_name: string;
  dao_object_address: string;
  dao_twitter_uri: string;
  dao_website_uri: string;
  is_frozen_transfer: boolean;
  is_withdrawable: boolean;
  max_raise: string;
  merkle_root: string;
  participants: {
    public_round_participants_invested_table: {
      handle: string;
    };
    vip_participants_invested_table: {
      handle: string;
    };
  };
  pool_created: boolean;
  profits_to_manager: string;
  public_round_wallet_limit: string;
  raise_end_time: string;
  raise_start_time: string;
  total_raised: string;
  trading_end_time: string;
  trading_start_time: string;
}
