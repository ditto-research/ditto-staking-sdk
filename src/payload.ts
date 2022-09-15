import { ditto as Ditto } from "./ditto";
import { HexString } from "aptos";
import { EntryFunctionPayload } from "aptos/src/generated";
import * as programTypes from "./program-types";
import * as types from "./types";

export function initializePayload(
  args: programTypes.DittoConfig
): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::initialize`,
    arguments: [
      args.poolBufferPct,
      args.rewardsFeePct,
      args.protocolFeeSharePct,
      args.instantUnstakeFeeBps,
      args.requireValidatorWhitelist,
    ],
    type_arguments: [],
  };
}

export function stakeAptosPayload(amount: bigint): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::stake_aptos`,
    arguments: [Number(amount)],
    type_arguments: [],
  };
}

export function instantUnstakePayload(amount: bigint): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::instant_unstake`,
    arguments: [Number(amount)],
    type_arguments: [],
  };
}

export function delayedUnstakePayload(amount: bigint): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::delayed_unstake`,
    arguments: [Number(amount)],
    type_arguments: [],
  };
}

export function claimAptosPayload(): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::claim_aptos`,
    arguments: [],
    type_arguments: [],
  };
}

export function addValidatorPayload(): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::add_validator`,
    arguments: [],
    type_arguments: [],
  };
}

export function updateDittoStatePayload(): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::update_ditto_state`,
    arguments: [],
    type_arguments: [],
  };
}

export function distributeUnstakedCoinsPayload(): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::distribute_unstaked_coins`,
    arguments: [],
    type_arguments: [],
  };
}

export function whitelistValidatorPayload(
  validator: HexString
): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::whitelist_validator`,
    arguments: [validator.toString()],
    type_arguments: [],
  };
}

export function joinValidatorSetPayload(
  poolAddress: HexString
): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::join_validator_set`,
    arguments: [poolAddress.toString()],
    type_arguments: [],
  };
}

export function fillDittoBuffer(): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::fill_ditto_buffer`,
    arguments: [],
    type_arguments: [],
  };
}

export function updateDittoConfigPayload(
  paramToUpdate: types.UpdateDittoConfigParam,
  newValue: bigint | boolean
): EntryFunctionPayload {
  let arg = typeof newValue === "bigint" ? Number(newValue) : newValue;
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.config
    }::${paramToUpdate}`,
    arguments: [arg],
    type_arguments: [],
  };
}

export function registerStAptosPayload(): EntryFunctionPayload {
  return {
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.coin
    }::register`,
    arguments: [],
    type_arguments: [],
  };
}
