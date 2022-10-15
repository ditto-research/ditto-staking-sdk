import { AptosClient, HexString, Types } from "aptos";
import * as types from "./types";
import * as programTypes from "./program-types";
import * as payload from "./payload";
import * as utils from "./utils";
import { Wallet, DummyWallet } from "./wallet";

export class Ditto {
  public get isInitialized(): boolean {
    return this._isInitialized;
  }
  private _isInitialized: boolean = false;

  public get network(): types.Network {
    return this._network;
  }
  private _network: types.Network;

  public get contractAddress(): HexString {
    return this._contractAddress;
  }
  private _contractAddress: HexString;

  public get aptosClient(): AptosClient {
    return this._aptosClient;
  }
  private _aptosClient: AptosClient;

  public get wallet(): Wallet {
    return this._wallet;
  }
  private _wallet: Wallet;

  public get dittoConfig(): programTypes.DittoConfig {
    return this._dittoConfig;
  }
  private _dittoConfig: programTypes.DittoConfig = null;

  public get validatorLockupBuffer(): programTypes.ValidatorLockupBuffer {
    return this._validatorLockupBuffer;
  }
  private _validatorLockupBuffer: programTypes.ValidatorLockupBuffer = null;

  public get dittoPool(): programTypes.DittoPool {
    return this._dittoPool;
  }
  private _dittoPool: programTypes.DittoPool = null;

  public get validatorWhitelist(): programTypes.ValidatorWhitelist {
    return this._validatorWhitelist;
  }
  private _validatorWhitelist: programTypes.ValidatorWhitelist = null;

  public get verifyTxnTimeoutMs(): number {
    return this._verifyTxnTimeoutMs;
  }
  private _verifyTxnTimeoutMs: number;

  public async load(
    wallet: Wallet = new DummyWallet(),
    network: types.Network,
    nodeUrl: string,
    contractAddress: HexString,
    verifyTxnTimeoutMs: number
  ) {
    this._network = network;
    this._aptosClient = new AptosClient(nodeUrl);
    this._contractAddress = contractAddress;
    this._verifyTxnTimeoutMs = verifyTxnTimeoutMs;
    this._wallet = wallet;

    try {
      await this.refreshDittoResources();
    } catch (e) {
      console.log("Unable to load Ditto smart contract state");
      return;
    }

    this._isInitialized = true;
  }

  public async initialize(
    initArgs: programTypes.DittoConfig
  ): Promise<types.TxnResponse> {
    let initializePayload = payload.initializePayload(initArgs);
    const txnRes = await utils.processTxn(
      this._wallet,
      initializePayload,
      this._verifyTxnTimeoutMs
    );
    await this.refreshDittoResources();
    return txnRes;
  }

  public async updatePoolBufferPct(
    poolBufferPct: bigint
  ): Promise<types.TxnResponse> {
    let updatePoolBufferPctPayload = payload.updatePoolBufferPct(poolBufferPct);
    const txnRes = await utils.processTxn(
      this._wallet,
      updatePoolBufferPctPayload,
      this._verifyTxnTimeoutMs
    );
    await this.refreshDittoConfig();
    return txnRes;
  }

  public async updatePoolBufferFeeIncreaseThresholdPct(
    poolBufferFeeIncreaseThresholdPct: bigint
  ): Promise<types.TxnResponse> {
    let updatePoolBufferFeeIncreaseThresholdPctPayload =
      payload.updatePoolBufferFeeIncreaseThresholdPct(
        poolBufferFeeIncreaseThresholdPct
      );
    const txnRes = await utils.processTxn(
      this._wallet,
      updatePoolBufferFeeIncreaseThresholdPctPayload,
      this._verifyTxnTimeoutMs
    );
    await this.refreshDittoConfig();
    return txnRes;
  }

  public async updateRewardsFeePct(
    rewardsFeePct: bigint
  ): Promise<types.TxnResponse> {
    let updateRewardsFeePct = payload.updateRewardsFeePct(rewardsFeePct);
    const txnRes = await utils.processTxn(
      this._wallet,
      updateRewardsFeePct,
      this._verifyTxnTimeoutMs
    );
    await this.refreshDittoConfig();
    return txnRes;
  }

  public async updateProtocolFeeSharePct(
    protocolFeeSharePct: bigint
  ): Promise<types.TxnResponse> {
    let updateProtocolFeeSharePctPayload =
      payload.updateProtocolFeeSharePct(protocolFeeSharePct);
    const txnRes = await utils.processTxn(
      this._wallet,
      updateProtocolFeeSharePctPayload,
      this._verifyTxnTimeoutMs
    );
    await this.refreshDittoConfig();
    return txnRes;
  }

  public async updateMinInstantUnstakeFeeBps(
    minInstantUnstakeFeeBps: bigint
  ): Promise<types.TxnResponse> {
    let updateMinInstantUnstakeFeeBpsPayload =
      payload.updateMinInstantUnstakeFeeBps(minInstantUnstakeFeeBps);
    const txnRes = await utils.processTxn(
      this._wallet,
      updateMinInstantUnstakeFeeBpsPayload,
      this._verifyTxnTimeoutMs
    );
    await this.refreshDittoConfig();
    return txnRes;
  }

  public async updateMaxInstantUnstakeFeeBps(
    maxInstantUnstakeFeeBps: bigint
  ): Promise<types.TxnResponse> {
    let updateMaxInstantUnstakeFeeBpsPayload =
      payload.updateMaxInstantUnstakeFeeBps(maxInstantUnstakeFeeBps);
    const txnRes = await utils.processTxn(
      this._wallet,
      updateMaxInstantUnstakeFeeBpsPayload,
      this._verifyTxnTimeoutMs
    );
    await this.refreshDittoConfig();
    return txnRes;
  }

  public async updateRequireValidatorWhitelist(
    requireValidatorWhitelist: boolean
  ): Promise<types.TxnResponse> {
    let updateRequireValidatorWhitelistPayload =
      payload.updateRequireValidatorWhitelist(requireValidatorWhitelist);
    const txnRes = await utils.processTxn(
      this._wallet,
      updateRequireValidatorWhitelistPayload,
      this._verifyTxnTimeoutMs
    );
    await this.refreshDittoConfig();
    return txnRes;
  }

  public async updateMaxNValidators(
    maxNValidators: bigint
  ): Promise<types.TxnResponse> {
    let updateMaxNValidatorsPayload =
      payload.updateMaxNValidators(maxNValidators);
    const txnRes = await utils.processTxn(
      this._wallet,
      updateMaxNValidatorsPayload,
      this._verifyTxnTimeoutMs
    );
    await this.refreshDittoConfig();
    return txnRes;
  }

  public async updateDittoState(): Promise<types.TxnResponse> {
    let updateDittoStatePayload = payload.updateDittoStatePayload();
    const txnRes = await utils.processTxn(
      this._wallet,
      updateDittoStatePayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public async distributeUnstakedCoins(): Promise<types.TxnResponse> {
    let distributeUnstakedCoinsPayload =
      payload.distributeUnstakedCoinsPayload();
    const txnRes = await utils.processTxn(
      this._wallet,
      distributeUnstakedCoinsPayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public async whitelistValidator(
    validator: HexString
  ): Promise<types.TxnResponse> {
    let whitelistValidatorPayload =
      payload.whitelistValidatorPayload(validator);
    const txnRes = await utils.processTxn(
      this._wallet,
      whitelistValidatorPayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public async joinValidatorSet(
    poolAddress: HexString
  ): Promise<types.TxnResponse> {
    let joinValidatorSetPayload = payload.joinValidatorSetPayload(poolAddress);
    const txnRes = await utils.processTxn(
      this._wallet,
      joinValidatorSetPayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public async fillDittoBuffer(): Promise<types.TxnResponse> {
    let fillDittoBufferPayload = payload.fillDittoBuffer();
    const txnRes = await utils.processTxn(
      this._wallet,
      fillDittoBufferPayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public async refreshDittoPool() {
    const resource: any = await this._aptosClient.getAccountResource(
      this._contractAddress,
      `${this._contractAddress}::${types.DittoModule.staking}::DittoPool`
    );
    if (resource == null) {
      throw Error("DittoPool fetch returned null");
    }

    let validatorStatesTableKeys: HexString[] = [];
    for (let i = 0; i < resource.data.validator_states.keys.length; i++) {
      let key = new HexString(resource.data.validator_states.keys[i]);
      validatorStatesTableKeys.push(key);
    }

    let userClaimStateTableKeys: HexString[] = [];
    for (let i = 0; i < resource.data.user_claim_state.keys.length; i++) {
      let key = new HexString(resource.data.user_claim_state.keys[i]);
      userClaimStateTableKeys.push(key);
    }

    this._dittoPool = {
      totalAptos: BigInt(resource.data.total_aptos),
      queuedAptosForBuffer: BigInt(resource.data.queued_aptos_for_buffer),
      aptosBufferAmount: BigInt(resource.data.aptos_buffer.value),
      pendingStakeAmount: BigInt(resource.data.pending_stake.value),
      treasuryAmount: BigInt(resource.data.treasury.value),
      validatorStates: {
        keys: validatorStatesTableKeys,
        handle: resource.data.validator_states.table.handle,
      },
      epoch: BigInt(resource.data.epoch),
      totalPendingClaim: BigInt(resource.data.total_pending_claim),
      claimPoolAmount: BigInt(resource.data.claim_pool.value),
      userClaimState: {
        keys: userClaimStateTableKeys,
        handle: resource.data.user_claim_state.table.handle,
      },
      validatorTicketsTableHandle: resource.data.validator_tickets.handle,
    };
  }

  public async refreshDittoConfig() {
    const resource: any = await this._aptosClient.getAccountResource(
      this._contractAddress,
      `${this._contractAddress}::${types.DittoModule.config}::DittoConfig`
    );
    if (resource == null) {
      throw Error("DittoConfig fetch returned null");
    }

    this._dittoConfig = {
      poolBufferPct: BigInt(resource.data.pool_buffer_pct),
      poolBufferFeeIncreaseThresholdPct: BigInt(
        resource.data.pool_buffer_fee_increase_threshold_pct
      ),
      rewardsFeePct: BigInt(resource.data.rewards_fee_pct),
      protocolFeeSharePct: BigInt(resource.data.protocol_fee_share_pct),
      minInstantUnstakeFeeBps: BigInt(
        resource.data.min_instant_unstake_fee_bps
      ),
      maxInstantUnstakeFeeBps: BigInt(
        resource.data.max_instant_unstake_fee_bps
      ),
      requireValidatorWhitelist: resource.data.require_validator_whitelist,
      maxNValidators: resource.data.max_n_validators,
    };
  }

  public async refreshValidatorWhitelist() {
    const resource: any = await this._aptosClient.getAccountResource(
      this._contractAddress,
      `${this._contractAddress}::${types.DittoModule.staking}::ValidatorWhitelist`
    );
    if (resource == null) {
      throw Error("Validator whitelist fetch returned null");
    }

    this._validatorWhitelist = {
      whitelistTableHandle: resource.data.whitelist.handle,
    };
  }

  public async refreshValidatorLockupBuffer() {
    const resource: any = await this._aptosClient.getAccountResource(
      this._contractAddress,
      `${this._contractAddress}::${types.DittoModule.validatorBuffer}::ValidatorLockupBuffer`
    );
    if (resource == null) {
      throw Error("Validator lockup buffer fetch returned null");
    }

    let validatorAddrs: HexString[] = [];
    for (let i = 0; i < resource.data.validator_addrs.length; i++) {
      let key = new HexString(resource.data.validator_addrs[i]);
      validatorAddrs.push(key);
    }

    this._validatorLockupBuffer = {
      validatorAddrs,
      head: BigInt(resource.data.head),
      cachedHeadLockupRemainingSecs: BigInt(
        resource.data.cached_head_lockup_remaining_secs
      ),
    };
  }

  public async refreshDittoResources() {
    await this.refreshDittoPool();
    await this.refreshDittoConfig();
    await this.refreshValidatorWhitelist();
    await this.refreshValidatorLockupBuffer();
    if (this._isInitialized == false) {
      this._isInitialized = true;
    }
  }

  public async getValidatorStateFromTable(
    validatorKey: HexString
  ): Promise<programTypes.ValidatorState> {
    let tableItemReq: Types.TableItemRequest = {
      key_type: "address",
      value_type: `${this._contractAddress.toString()}::${
        types.DittoModule.staking
      }::ValidatorState`,
      key: validatorKey.toString(),
    };

    let item = await this._aptosClient.getTableItem(
      this._dittoPool.validatorStates.handle,
      tableItemReq
    );

    return {
      ownerCapability: {
        poolAddress: new HexString(item.owner_capability.pool_address),
      },
      startOfEpochBalance: BigInt(item.start_of_epoch_balance),
      distributedBalance: BigInt(item.distributed_balance),
    };
  }

  public async getDelayedUnstakeTicketsFromTable(
    validatorKey: HexString
  ): Promise<programTypes.DelayedUnstakeTicket[]> {
    let tableItemReq: Types.TableItemRequest = {
      key_type: "address",
      value_type: `vector<${this._contractAddress.toString()}::${
        types.DittoModule.staking
      }::DelayedUnstakeTicket>`,
      key: validatorKey.toString(),
    };

    let item = await this._aptosClient.getTableItem(
      this._dittoPool.validatorTicketsTableHandle,
      tableItemReq
    );

    let delayedUnstakeTickets: programTypes.DelayedUnstakeTicket[] = [];

    for (let i = 0; i < item.length; i++) {
      delayedUnstakeTickets.push({
        user: new HexString(item[0].user),
        aptosToReceive: BigInt(item[0].aptos_to_receive),
      });
    }
    return delayedUnstakeTickets;
  }

  public async getUserClaimStateFromTable(
    userKey: HexString
  ): Promise<programTypes.UserClaimState> {
    let tableItemReq: Types.TableItemRequest = {
      key_type: "address",
      value_type: `${this._contractAddress.toString()}::${
        types.DittoModule.staking
      }::UserClaimState`,
      key: userKey.toString(),
    };

    let item = await this._aptosClient.getTableItem(
      this._dittoPool.userClaimState.handle,
      tableItemReq
    );

    return {
      availableClaim: BigInt(item.available_claim),
      pendingClaim: BigInt(item.pending_claim),
    };
  }

  public async getValidatorWhitelistFromTable(
    validatorKey: HexString
  ): Promise<boolean> {
    let tableItemReq: Types.TableItemRequest = {
      key_type: "address",
      value_type: "bool",
      key: validatorKey.toString(),
    };

    let item = await this._aptosClient.getTableItem(
      this._validatorWhitelist.whitelistTableHandle,
      tableItemReq
    );

    return item;
  }

  public async getEvents(
    eventType: types.DittoEventType
  ): Promise<
    | programTypes.StakeEvent[]
    | programTypes.InstantUnstakeEvent[]
    | programTypes.DelayedUnstakeEvent[]
    | programTypes.ClaimAptosEvent[]
  > {
    let events = await this._aptosClient.getEventsByEventHandle(
      this._contractAddress,
      `${this._contractAddress}::${types.DittoModule.staking}::DittoPool`,
      eventType
    );
    let readableEvents = [];
    for (let i = 0; i < events.length; i++) {
      switch (eventType) {
        case types.DittoEventType.stake:
          readableEvents.push({
            user: new HexString(events[i].data.user),
            aptAmountStaked: BigInt(events[i].data.apt_amount_staked),
            staptAmountRcvd: BigInt(events[i].data.stapt_amount_rcvd),
          });
          break;
        case types.DittoEventType.instant_unstake:
          readableEvents.push({
            user: new HexString(events[i].data.user),
            staptAmountExchanged: BigInt(events[i].data.stapt_amount_exchanged),
            aptAmountRcvd: BigInt(events[i].data.apt_amount_rcvd),
          });
          break;
        case types.DittoEventType.delayed_unstake:
          readableEvents.push({
            user: new HexString(events[i].data.user),
            staptAmountExchanged: BigInt(events[i].data.stapt_amount_exchanged),
            aptAmountToRcv: BigInt(events[i].data.apt_amount_to_rcv),
          });
          break;
        case types.DittoEventType.claim_aptos:
          readableEvents.push({
            user: new HexString(events[i].data.user),
            aptAmountRcvd: BigInt(events[i].data.apt_amount_rcvd),
          });
          break;
      }
    }
    return readableEvents;
  }

  public setVerifyTxnTimeoutMs(newValue: number) {
    this._verifyTxnTimeoutMs = newValue;
  }

  public async staptosIndex(): Promise<number> {
    let staptosInfo = await utils.getStaptosInfo();
    if (staptosInfo == null) throw new Error("Fetch error!");
    return Number(this.dittoPool.totalAptos) / Number(staptosInfo.supply);
  }
}

// Ditto singleton.
export const ditto = new Ditto();
