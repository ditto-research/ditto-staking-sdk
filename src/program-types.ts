import { HexString } from "aptos";

export interface DittoPool {
  totalAptos: bigint;
  queuedAptosForBuffer: bigint;
  aptosBufferAmount: bigint;
  pendingStakeAmount: bigint;
  treasuryAmount: bigint;
  validatorStates: TableKeysAndHandle<HexString>; // Table<address, ValidatorState>
  epoch: bigint;
  totalPendingClaim: bigint;
  claimPoolAmount: bigint;
  userClaimState: TableKeysAndHandle<HexString>; // Table<address, UserClaimState>>
  validatorTicketsTableHandle: string; // Table<address, vector<DelayedUnstakeTicket>>
}

export interface ValidatorState {
  ownerCapability: OwnerCapability;
  startOfEpochBalance: bigint;
  distributedBalance: bigint;
}

export interface OwnerCapability {
  poolAddress: HexString;
}

export interface UserClaimState {
  availableClaim: bigint;
  pendingClaim: bigint;
}

export interface DelayedUnstakeTicket {
  user: HexString;
  aptosToReceive: bigint;
}

export interface ValidatorWhitelist {
  whitelistTableHandle: string; // Table<address, bool>
}
export interface DittoConfig {
  poolBufferPct: bigint;
  poolBufferFeeIncreaseThresholdPct: bigint;
  rewardsFeePct: bigint;
  protocolFeeSharePct: bigint;
  minInstantUnstakeFeeBps: bigint;
  maxInstantUnstakeFeeBps: bigint;
  requireValidatorWhitelist: boolean;
  maxNValidators: bigint;
}

export interface ValidatorLockupBuffer {
  validatorAddrs: Array<HexString>;
  head: bigint;
  cachedHeadLockupRemainingSecs: bigint;
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

export interface StakeEvent {
  timestamp: bigint;
  user: HexString;
  aptAmountStaked: bigint;
  staptAmountRcvd: bigint;
  id: number;
}

export interface InstantUnstakeEvent {
  timestamp: bigint;
  user: HexString;
  staptAmountExchanged: bigint;
  aptAmountRcvd: bigint;
  feesPaid: bigint;
}

export interface DelayedUnstakeEvent {
  timestamp: bigint;
  user: HexString;
  staptAmountExchanged: bigint;
  aptAmountToRcv: bigint;
}

export interface ClaimAptosEvent {
  timestamp: bigint;
  user: HexString;
  aptAmountRcvd: bigint;
}

export interface AddValidatorEvent {
  timestamp: bigint;
  validator: HexString;
  activeStake: bigint;
  inactiveStake: bigint;
  pendingActiveStake: bigint;
  pendingInactiveStake: bigint;
}

export interface ValidatorPerformanceEvent {
  timestamp: bigint;
  validator: HexString;
  epoch: bigint;
  activeStake: bigint;
  reward: bigint;
}

export interface DittoPerformanceEvent {
  timestamp: bigint;
  epoch: bigint;
  totalAptos: bigint;
  validatorRewards: bigint;
  treasuryRewards: bigint;
  poolRewards: bigint;
}

export interface ValidatorRewardDistributionEvent {
  timestamp: bigint;
  validator: HexString;
  epoch: bigint;
  rewardDistributed: bigint;
}

export interface UnstakeTicketFillEvent {
  timestamp: bigint;
  user: HexString;
  validator: HexString;
  aptAmountToRcv: bigint;
}

export interface ValidatorStakeDistributionEvent {
  timestamp: bigint;
  validator: HexString;
  stakeDistributed: bigint;
}

export interface AddToPoolBufferEvent {
  timestamp: bigint;
  epoch: bigint;
  amountAdded: bigint;
  instruction: string;
}
