import { ditto as Ditto } from "./ditto";
import { TransactionPayload } from "aptos/dist/generated";
import { HexString } from "aptos";
import * as programTypes from "./program-types";
import * as types from "./types";

export function initializePayload(
  args: programTypes.DittoConfig
): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::initialize`,
    arguments: [
      args.poolBufferPct.toString(),
      args.rewardsFeePct.toString(),
      args.protocolFeeSharePct.toString(),
      args.instantUnstakeFeeBps.toString(),
      args.requireValidatorWhitelist,
    ],
    type_arguments: [],
  };
}

export function stakeAptosPayload(amount: bigint): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::stake_aptos`,
    arguments: [amount.toString()],
    type_arguments: [],
  };
}

export function instantUnstakePayload(amount: bigint): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::instant_unstake`,
    arguments: [amount.toString()],
    type_arguments: [],
  };
}

export function delayedUnstakePayload(amount: bigint): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::delayed_unstake`,
    arguments: [amount.toString()],
    type_arguments: [],
  };
}

export function claimAptosPayload(): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::claim_aptos`,
    arguments: [],
    type_arguments: [],
  };
}

export function addValidatorPayload(): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::add_validator`,
    arguments: [],
    type_arguments: [],
  };
}

export function updateDittoStatePayload(): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::update_ditto_state`,
    arguments: [],
    type_arguments: [],
  };
}

export function distributeUnstakedCoinsPayload(): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::distribute_unstaked_coins`,
    arguments: [],
    type_arguments: [],
  };
}

export function whitelistValidatorPayload(
  validator: HexString
): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::whitelist_validator`,
    arguments: [validator.toString()],
    type_arguments: [],
  };
}

export function joinValidatorSetPayload(
  poolAddress: HexString
): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::whitelist_validator`,
    arguments: [poolAddress.toString()],
    type_arguments: [],
  };
}

export function updateDittoConfigPayload(
  paramToUpdate: types.UpdateDittoConfigParam,
  newValue: bigint | boolean
): TransactionPayload {
  let arg = typeof newValue === "bigint" ? newValue.toString() : newValue;
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.config
    }::${paramToUpdate}`,
    arguments: [arg],
    type_arguments: [],
  };
}

export function registerStAptosPayload(): TransactionPayload {
  return {
    type: "entry_function_payload",
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.coin
    }::register`,
    arguments: [],
    type_arguments: [],
  };
}
