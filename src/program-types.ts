import { HexString } from "aptos";

export interface DittoPool {
  total_aptos: bigint;
  aptos_buffer_amount: bigint;
  pending_stake_amount: bigint;
  treasury_amount: bigint;
  validator_states: TableKeysAndHandle<HexString>; // Table<address, ValidatorState>
  last_update_timestamp: bigint;
  total_pending_claim: bigint;
  claim_pool_amount: bigint;
  user_claim_state: TableKeysAndHandle<HexString>; // Table<address, UserClaimState>>
  validator_tickets_table_handle: string; // Table<address, vector<DelayedUnstakeTicket>>
}

export interface ValidatorState {
  owner_capability: OwnerCapability;
  start_of_epoch_balance: bigint;
  distributed_balance: bigint;
}

export interface OwnerCapability {
  pool_address: HexString;
}

export interface UserClaimState {
  available_claim: bigint;
  pending_claim: bigint;
}

export interface DelayedUnstakeTicket {
  user: HexString;
  aptos_to_receive: bigint;
}

export interface ValidatorWhitelist {
  whitelist_table_handle: string; // Table<address, bool>
}
export interface DittoConfig {
  pool_buffer_pct: bigint;
  rewards_fee_pct: bigint;
  protocol_fee_share_pct: bigint;
  instant_unstake_fee_bps: bigint;
  require_validator_whitelist: boolean;
}

export interface TableKeysAndHandle<T> {
  keys: Array<T>;
  handle: string;
}

export interface CoinInfo {
  decimals: number;
  name: string;
  supply: bigint;
  symbol: string;
}
