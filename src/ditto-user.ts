import { ditto as Ditto } from "./ditto";
import * as types from "./types";
import { Wallet } from "./wallet";
import * as payload from "./payload";
import * as utils from "./utils";

export class DittoUser {
  public get network(): types.Network {
    return this._network;
  }
  private _network: types.Network;

  public get wallet(): Wallet {
    return this._wallet;
  }
  private _wallet: Wallet;

  public get verifyTxnTimeoutMs(): number {
    return this._verifyTxnTimeoutMs;
  }
  private _verifyTxnTimeoutMs: number;

  private constructor(
    network: types.Network,
    verifyTxnTimeoutMs: number,
    wallet: Wallet
  ) {
    this._network = network;
    this._verifyTxnTimeoutMs = verifyTxnTimeoutMs;
    this._wallet = wallet;
  }

  public static load(
    network: types.Network,
    verifyTxnTimeoutMs: number,
    wallet: Wallet
  ): DittoUser {
    return new DittoUser(network, verifyTxnTimeoutMs, wallet);
  }

  public async stakeAptos(amount: bigint): Promise<types.TxnResponse> {
    let stakeAptosPayload = payload.stakeAptosPayload(amount);
    const txnRes = await utils.processTxn(
      this._wallet,
      stakeAptosPayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public async instantUnstake(amount: bigint): Promise<types.TxnResponse> {
    let instantUnstakePayload = payload.instantUnstakePayload(amount);
    const txnRes = await utils.processTxn(
      this._wallet,
      instantUnstakePayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public async delayedUnstake(amount: bigint): Promise<types.TxnResponse> {
    let delayedUnstakePayload = payload.delayedUnstakePayload(amount);
    const txnRes = await utils.processTxn(
      this._wallet,
      delayedUnstakePayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public async claimAptos(): Promise<types.TxnResponse> {
    let claimAptosPayload = payload.claimAptosPayload();
    const txnRes = await utils.processTxn(
      this._wallet,
      claimAptosPayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public async addValidator(): Promise<types.TxnResponse> {
    let addValidatorPayload = payload.addValidatorPayload();
    const txnRes = await utils.processTxn(
      this._wallet,
      addValidatorPayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public async registerStAptos(): Promise<types.TxnResponse> {
    let registerStAptosPayload = payload.registerStAptosPayload();
    const txnRes = await utils.processTxn(
      this._wallet,
      registerStAptosPayload,
      this._verifyTxnTimeoutMs
    );
    return txnRes;
  }

  public setVerifyTxnTimeoutMs(newValue: number) {
    this._verifyTxnTimeoutMs = newValue;
  }
}
