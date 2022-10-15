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

export interface TxnResponse {
  hash: string;
  msg: string;
}

export enum DittoModule {
  staking = "ditto_staking",
  config = "ditto_config",
  coin = "staked_coin",
  validatorBuffer = "validator_lockup_buffer",
}

export enum DittoEventType {
  stake = "stake_events",
  instant_unstake = "instant_unstake_events",
  delayed_unstake = "delayed_unstake_events",
  claim_aptos = "claim_aptos_events",
}
