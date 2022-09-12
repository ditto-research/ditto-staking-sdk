import { ditto as Ditto } from "./ditto";
import { MaybeHexString, FaucetClient, HexString } from "aptos";
import { EntryFunctionPayload, Transaction } from "aptos/dist/generated";
import { Wallet } from "./wallet";
import * as types from "./types";
import * as programTypes from "./program-types";
import * as errors from "./errors";

export async function processTxn(
  wallet: Wallet,
  payload: EntryFunctionPayload,
  _timeoutMs: number = 5000
): Promise<types.TxnResponse> {
  const txnHash = await wallet.signAndSubmitTransaction(payload);
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

  let msg = (txnInfo as any).vm_status;
  let response: types.TxnResponse = {
    hash: txnHash.hash,
    msg,
  };

  if (msg.startsWith("Move abort in")) {
    throw parseError(msg);
  }

  return response;
}

export function parseError(errorMsg: string): Error {
  "Move abort in 0x82038eeccf810b5cf24643515afac90442b4215b0c59fe1afae52203de036ccb::ditto_config: ERR_INVALID_CONFIG(0x66): ";
  try {
    let cleanedErrMsg = errorMsg.replace("Move abort in ", "");

    let logs: string[] = cleanedErrMsg.split(" ").filter((s) => s);

    // Example logs: string[] = [
    // "SMART_CONTRACT_ADDRESS::MODULE_NAME:",
    // "MOVE_ERROR_MSG(MOVE_ERROR_CODE):"
    // ]

    let module = logs[0].slice(0, -1).split("::")[1];
    let errCodeHexStr = logs[1].split(/[()]/)[1];
    return new errors.DittoError(
      errCodeHexStr,
      cleanedErrMsg,
      errors.ERROR_MAP[module][Number(errCodeHexStr)]
    );
  } catch (e) {
    return Error(errorMsg);
  }
}

export async function getAccountAptosBalance(
  accountAddr: MaybeHexString
): Promise<number | null> {
  try {
    const resource = await Ditto.aptosClient.getAccountResource(
      accountAddr,
      "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
    );
    if (resource == null) {
      return null;
    }

    return parseInt((resource.data as any)["coin"]["value"]);
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function getAccountStaptosBalance(
  accountAddr: MaybeHexString
): Promise<number | null> {
  try {
    const resource = await Ditto.aptosClient.getAccountResource(
      accountAddr,
      `0x1::coin::CoinStore<${Ditto.contractAddress}::staked_coin::StakedAptos>`
    );
    if (resource == null) {
      return null;
    }

    return parseInt((resource.data as any)["coin"]["value"]);
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function getStaptosInfo(): Promise<programTypes.CoinInfo> {
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
    supply: BigInt(resource.data.supply.vec[0].integer.vec[0].value),
    symbol: resource.data.symbol,
  };
}

export async function fundAccount(
  faucetClient: FaucetClient,
  aptosAccount: MaybeHexString,
  amount: number = 1000000
): Promise<string[]> {
  const tnxHashes = await faucetClient.faucetRequester.request<Array<string>>({
    method: "POST",
    url: "mint",
    query: {
      address: HexString.ensure(aptosAccount).noPrefix(),
      amount,
    },
  });

  const promises: Promise<void>[] = [];
  for (let i = 0; i < tnxHashes.length; i += 1) {
    const tnxHash = tnxHashes[i];
    promises.push(faucetClient.waitForTransaction(tnxHash));
  }
  await Promise.all(promises);
  return tnxHashes;
}

// Raw JSON objects from Aptos REST endpoint

export async function getStakePoolResource(
  validatorKey: HexString
): Promise<any> {
  let validatorStakePool = await Ditto.aptosClient.getAccountResource(
    validatorKey,
    "0x1::stake::StakePool"
  );
  return validatorStakePool.data;
}

export async function getValidatorSetResource(): Promise<any> {
  let validatorStakePool = await Ditto.aptosClient.getAccountResource(
    "0x1",
    "0x1::stake::ValidatorSet"
  );
  return validatorStakePool.data;
}

export async function getStakingConfigResource(): Promise<any> {
  let validatorStakePool = await Ditto.aptosClient.getAccountResource(
    "0x1",
    "0x1::staking_config::StakingConfig"
  );
  return validatorStakePool.data;
}
