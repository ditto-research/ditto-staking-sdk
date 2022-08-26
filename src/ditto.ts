import { AptosClient, HexString } from "aptos";
import * as types from "./types";
import * as programTypes from "./program-types";
import * as payload from "./payload";
import * as utils from "./utils";
import { Wallet, DummyWallet } from "./wallet";
import { TableItemRequest } from "aptos/dist/generated";

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

  public get DittoConfig(): programTypes.DittoConfig {
    return this._DittoConfig;
  }
  private _DittoConfig: programTypes.DittoConfig = null;

  public get DittoPool(): programTypes.DittoPool {
    return this._DittoPool;
  }
  private _DittoPool: programTypes.DittoPool = null;

  public get ValidatorWhitelist(): programTypes.ValidatorWhitelist {
    return this._ValidatorWhitelist;
  }
  private _ValidatorWhitelist: programTypes.ValidatorWhitelist = null;

  public get verifyTxnTimeoutMs(): number {
    return this._verifyTxnTimeoutMs;
  }
  private _verifyTxnTimeoutMs: number;

  public async load(
    network: types.Network,
    nodeUrl: string,
    contractAddress: HexString,
    verifyTxnTimeoutMs: number,
    wallet: Wallet = new DummyWallet()
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

  public async updateDittoConfig(
    paramToUpdate: types.UpdateDittoConfigParam,
    newValue: bigint | boolean
  ): Promise<types.TxnResponse> {
    let updateDittoConfigPayload = payload.updateDittoConfigPayload(
      paramToUpdate,
      newValue
    );
    const txnRes = await utils.processTxn(
      this._wallet,
      updateDittoConfigPayload,
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

    this._DittoPool = {
      total_aptos: BigInt(resource.data.total_aptos),
      aptos_buffer_amount: BigInt(resource.data.aptos_buffer.value),
      pending_stake_amount: BigInt(resource.data.pending_stake.value),
      treasury_amount: BigInt(resource.data.treasury.value),
      validator_states: {
        keys: validatorStatesTableKeys,
        handle: resource.data.validator_states.table.handle,
      },
      last_update_timestamp: BigInt(resource.data.last_update_timestamp),
      total_pending_claim: BigInt(resource.data.total_pending_claim),
      claim_pool_amount: BigInt(resource.data.claim_pool.value),
      user_claim_state: {
        keys: userClaimStateTableKeys,
        handle: resource.data.user_claim_state.table.handle,
      },
      validator_tickets_table_handle: resource.data.validator_tickets.handle,
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

    this._DittoConfig = {
      pool_buffer_pct: BigInt(resource.data.pool_buffer_pct),
      rewards_fee_pct: BigInt(resource.data.rewards_fee_pct),
      protocol_fee_share_pct: BigInt(resource.data.protocol_fee_share_pct),
      instant_unstake_fee_bps: BigInt(resource.data.instant_unstake_fee_bps),
      require_validator_whitelist: resource.data.require_validator_whitelist,
    };
  }

  public async refreshValidatorWhitelist() {
    const resource: any = await this._aptosClient.getAccountResource(
      this._contractAddress,
      `${this._contractAddress}::${types.DittoModule.staking}::ValidatorWhitelist`
    );
    if (resource == null) {
      throw Error("UnstakeTracker fetch returned null");
    }

    this._ValidatorWhitelist = {
      whitelist_table_handle: resource.data.whitelist.handle,
    };
  }

  public async refreshDittoResources() {
    await this.refreshDittoPool();
    await this.refreshDittoConfig();
    await this.refreshValidatorWhitelist();
    if (this._isInitialized == false) {
      this._isInitialized = true;
    }
  }

  public async getValidatorStateFromTable(
    validatorKey: HexString
  ): Promise<programTypes.ValidatorState> {
    let tableItemReq: TableItemRequest = {
      key_type: "address",
      value_type: `${this._contractAddress.toString()}::${
        types.DittoModule.staking
      }::ValidatorState`,
      key: validatorKey.toString(),
    };

    let item = await this._aptosClient.getTableItem(
      this._DittoPool.validator_states.handle,
      tableItemReq
    );

    return {
      owner_capability: {
        pool_address: new HexString(item.owner_capability.pool_address),
      },
      start_of_epoch_balance: BigInt(item.start_of_epoch_balance),
      distributed_balance: BigInt(item.distributed_balance),
    };
  }

  public async getDelayedUnstakeTicketsFromTable(
    validatorKey: HexString
  ): Promise<programTypes.DelayedUnstakeTicket[]> {
    let tableItemReq: TableItemRequest = {
      key_type: "address",
      value_type: `vector<${this._contractAddress.toString()}::${
        types.DittoModule.staking
      }::DelayedUnstakeTicket>`,
      key: validatorKey.toString(),
    };

    let item = await this._aptosClient.getTableItem(
      this._DittoPool.validator_tickets_table_handle,
      tableItemReq
    );

    let delayedUnstakeTickets: programTypes.DelayedUnstakeTicket[] = [];

    for (let i = 0; i < item.length; i++) {
      delayedUnstakeTickets.push({
        user: new HexString(item[0].user),
        aptos_to_receive: BigInt(item[0].aptos_to_receive),
      });
    }
    return delayedUnstakeTickets;
  }

  public async getUserClaimStateFromTable(
    userKey: HexString
  ): Promise<programTypes.UserClaimState> {
    let tableItemReq: TableItemRequest = {
      key_type: "address",
      value_type: `${this._contractAddress.toString()}::${
        types.DittoModule.staking
      }::UserClaimState`,
      key: userKey.toString(),
    };

    let item = await this._aptosClient.getTableItem(
      this._DittoPool.user_claim_state.handle,
      tableItemReq
    );

    return {
      available_claim: BigInt(item.available_claim),
      pending_claim: BigInt(item.pending_claim),
    };
  }

  public async getValidatorWhitelistFromTable(
    validatorKey: HexString
  ): Promise<boolean> {
    let tableItemReq: TableItemRequest = {
      key_type: "address",
      value_type: "bool",
      key: validatorKey.toString(),
    };

    let item = await this._aptosClient.getTableItem(
      this._ValidatorWhitelist.whitelist_table_handle,
      tableItemReq
    );

    return item;
  }

  public setVerifyTxnTimeoutMs(newValue: number) {
    this._verifyTxnTimeoutMs = newValue;
  }
}

// Ditto singleton.
export const ditto = new Ditto();
