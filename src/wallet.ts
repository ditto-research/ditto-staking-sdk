import { ditto as Ditto } from "./ditto";
import {
  HexEncodedBytes,
  TransactionPayload,
  SubmitTransactionRequest,
} from "aptos/dist/generated";
import { AptosAccount, HexString, MaybeHexString } from "aptos";
import * as types from "./types";

export type PublicKey = MaybeHexString;
export type Address = MaybeHexString;
export type AuthKey = MaybeHexString;

export interface AccountKeys {
  publicKey: PublicKey | null;
  address: Address | null;
  authKey: AuthKey | null;
}

export interface Wallet {
  account: AccountKeys;
  signAndSubmitTransaction(transaction: any): Promise<any>;
  signTransaction(transaction: any): Promise<any>;
}

export class DummyWallet implements Wallet {
  constructor() {}

  account: AccountKeys = null;

  async signAndSubmitTransaction(
    _transaction: TransactionPayload
  ): Promise<{ hash: string }> {
    throw Error("Not supported by dummy wallet!");
  }

  async signTransaction(
    _transaction: TransactionPayload
  ): Promise<SubmitTransactionRequest> {
    throw Error("Not supported by dummy wallet!");
  }
}

export class DittoWallet implements Wallet {
  public get aptosAccount(): AptosAccount {
    return this._aptosAccount;
  }
  private _aptosAccount: AptosAccount;

  public get aptosTxnConfig(): types.AptosTxnConfig {
    return this._aptosTxnConfig;
  }
  private _aptosTxnConfig: types.AptosTxnConfig;

  public get account(): AccountKeys {
    return this._account;
  }
  private _account: AccountKeys;

  public get address(): Address {
    return this.account.address;
  }

  public constructor(
    signerPrivateKey: HexString,
    aptosTxnConfig: types.AptosTxnConfig
  ) {
    this._aptosAccount = new AptosAccount(signerPrivateKey.toBuffer());
    this._aptosTxnConfig = aptosTxnConfig;
    this._account = {
      publicKey: this._aptosAccount.pubKey(),
      address: this._aptosAccount.address(),
      authKey: this._aptosAccount.authKey(),
    };
  }

  public async signAndSubmitTransaction(
    transaction: TransactionPayload
  ): Promise<{ hash: string }> {
    const signedTransaction = await this.signTransaction(transaction);
    const response = await Ditto.aptosClient.submitTransaction(
      signedTransaction
    );
    return response;
  }

  public async signTransaction(
    transaction: TransactionPayload
  ): Promise<SubmitTransactionRequest> {
    const address = this._aptosAccount.address();
    const txn = await Ditto.aptosClient.generateTransaction(
      address,
      transaction as TransactionPayload
      // {
      //   max_gas_amount: this._aptosTxnConfig.maxGasAmount.toString(),
      //   gas_unit_price: this._aptosTxnConfig.gasUnitPrice.toString(),
      //   expiration_timestamp_secs: (
      //     BigInt(Math.floor(Date.now() / 1000)) +
      //     this._aptosTxnConfig.txnExpirationOffset
      //   ).toString(),
      // }
    );
    return await Ditto.aptosClient.signTransaction(this._aptosAccount, txn);
  }
}
