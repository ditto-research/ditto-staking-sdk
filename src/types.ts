import { ditto as Ditto } from "./ditto";

export enum Network {
  LOCALNET = "localnet",
  DEVNET = "devnet",
  TESTNET = "testnet",
  MAINNET = "mainnet",
}

export function toNetwork(network: string): Network {
  if (network == "localnet") return Network.LOCALNET;
  if (network == "devnet") return Network.DEVNET;
  if (network == "testnet") return Network.TESTNET;
  if (network == "mainnet") return Network.MAINNET;
  throw Error("Invalid network");
}

export interface AptosTxnConfig {
  maxGasAmount: bigint;
  gasUnitPrice: bigint;
  txnExpirationOffset: bigint;
}

export enum UpdateDittoConfigParam {
  POOL_BUFFER_PCT = "update_pool_buffer_pct",
  REWARDS_FEE_PCT = "update_rewards_fee_pct",
  PROTOCOL_FEE_SHARE_PCT = "update_protocol_fee_share_pct",
  INSTANT_UNSTAKE_FEE_BPS = "update_instant_unstake_fee_bps",
  REQUIRE_VALIDATOR_WHITELIST = "update_require_validator_whitelist",
}

export interface TxnResponse {
  hash: string;
  msg: string;
}

export enum DittoModule {
  staking = "ditto_staking",
  config = "ditto_config",
  coin = "staked_coin",
}
