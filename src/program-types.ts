import { HexString } from "aptos";

export interface DittoPool {
  totalAptos: bigint;
  aptosBufferAmount: bigint;
  pendingStakeAmount: bigint;
  treasuryAmount: bigint;
  validatorStates: TableKeysAndHandle<HexString>; // Table<address, ValidatorState>
  lastUpdateTimestamp: bigint;
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
  rewardsFeePct: bigint;
  protocolFeeSharePct: bigint;
  instantUnstakeFeeBps: bigint;
  requireValidatorWhitelist: boolean;
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
