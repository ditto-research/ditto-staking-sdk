import { ditto as Ditto } from "./ditto";
import { MaybeHexString, FaucetClient, HexString } from "aptos";
import { Transaction, EntryFunctionPayload } from "aptos/dist/generated";
import { Wallet } from "./wallet";
import * as types from "./types";
import * as programTypes from "./program-types";

export async function processTxn(
  wallet: Wallet,
  payload: EntryFunctionPayload,
  _timeoutMs: number = 5000
): Promise<types.TxnResponse> {
  let txnHash: { hash: string } = await wallet.signAndSubmitTransaction(
    payload
  );
  await Ditto.aptosClient.waitForTransaction(txnHash.hash);
  let txnInfo: Transaction;
  try {
    txnInfo = await Ditto.aptosClient.getTransactionByHash(txnHash.hash);
  } catch (e) {
    throw Error("Transaction hash can't be found.");
  }

  if (txnInfo.type != "user_transaction") {
    throw Error("Transaction wasn't a user transaction.");
  }

  return {
    hash: txnHash.hash,
    msg: (txnInfo as any).vm_status,
  };
}

export async function getAccountAptosBalance(
  accountAddr: MaybeHexString
): Promise<number | null> {
  const resource = await Ditto.aptosClient.getAccountResource(
    accountAddr,
    "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
  );
  if (resource == null) {
    return null;
  }

  return parseInt((resource.data as any)["coin"]["value"]);
}

export async function getAccountStAptosBalance(
  accountAddr: MaybeHexString
): Promise<number | null> {
  const resource = await Ditto.aptosClient.getAccountResource(
    accountAddr,
    `0x1::coin::CoinStore<${Ditto.contractAddress}::staked_coin::StakedAptos>`
  );
  if (resource == null) {
    return null;
  }

  return parseInt((resource.data as any)["coin"]["value"]);
}

export async function getStAptosInfo(): Promise<programTypes.CoinInfo> {
  const resource = (await Ditto.aptosClient.getAccountResource(
    Ditto.contractAddress.toString(),
    `0x1::coin::CoinInfo<${Ditto.contractAddress}::staked_coin::StakedAptos>`
  )) as any;
  if (resource == null) {
    return null;
  }

  return {
    decimals: resource.data.decimals,
    name: resource.data.name,
    supply: BigInt(resource.data.supply.vec[0]),
    symbol: resource.data.symbol,
  };
}

export async function fundAccount(
  faucetClient: FaucetClient,
  aptosAccount: MaybeHexString,
  amount: number = 1000000
): Promise<string[]> {
  return await faucetClient.fundAccount(aptosAccount, amount);
}

export async function getStakePoolResource(
  validatorKey: HexString
): Promise<any> {
  let validatorStakePool = await Ditto.aptosClient.getAccountResource(
    validatorKey,
    "0x1::stake::StakePool"
  );
  return validatorStakePool.data;
}