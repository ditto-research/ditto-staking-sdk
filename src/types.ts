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
  instantUnstake = "instant_unstake_events",
  delayedUnstake = "delayed_unstake_events",
  claimAptos = "claim_aptos_events",
  addValidator = "add_validator_events",
  validatorPerformance = "validator_performance_events",
  dittoPerformance = "ditto_performance_events",
  validatorRewardDistribution = "validator_reward_distribution_events",
  unstakeTicketFill = "unstake_ticket_fill_events",
  validatorStakeDistribution = "validator_stake_distribution_events",
  addToPoolBuffer = "add_to_pool_buffer_events",
}
