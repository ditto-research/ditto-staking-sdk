import { ditto as Ditto } from "./ditto";
import { TransactionPayload } from "aptos/dist/generated";
import { HexString } from "aptos";
import * as programTypes from "./program-types";
import * as types from "./types";

const PAYLOAD_TYPE = "entry_function_payload";

export function initializePayload(
  args: programTypes.DittoConfig
): TransactionPayload {
  return {
    type: PAYLOAD_TYPE,
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::initialize`,
    arguments: [
      args.pool_buffer_pct.toString(),
      args.rewards_fee_pct.toString(),
      args.protocol_fee_share_pct.toString(),
      args.instant_unstake_fee_bps.toString(),
      args.require_validator_whitelist,
    ],
    type_arguments: [],
  };
}

export function stakeAptosPayload(amount: bigint): TransactionPayload {
  return {
    type: PAYLOAD_TYPE,
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::stake_aptos`,
    arguments: [amount.toString()],
    type_arguments: [],
  };
}

export function instantUnstakePayload(amount: bigint): TransactionPayload {
  return {
    type: PAYLOAD_TYPE,
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::instant_unstake`,
    arguments: [amount.toString()],
    type_arguments: [],
  };
}

export function delayedUnstakePayload(amount: bigint): TransactionPayload {
  return {
    type: PAYLOAD_TYPE,
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::delayed_unstake`,
    arguments: [amount.toString()],
    type_arguments: [],
  };
}

export function claimAptosPayload(): TransactionPayload {
  return {
    type: PAYLOAD_TYPE,
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::claim_aptos`,
    arguments: [],
    type_arguments: [],
  };
}

export function addValidatorPayload(): TransactionPayload {
  return {
    type: PAYLOAD_TYPE,
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::add_validator`,
    arguments: [],
    type_arguments: [],
  };
}

export function updateDittoStatePayload(): TransactionPayload {
  return {
    type: PAYLOAD_TYPE,
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.staking
    }::update_ditto_state`,
    arguments: [],
    type_arguments: [],
  };
}

export function distributeUnstakedCoinsPayload(): TransactionPayload {
  return {
    type: PAYLOAD_TYPE,
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
    type: PAYLOAD_TYPE,
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
    type: PAYLOAD_TYPE,
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
) {
  let arg = typeof newValue === "bigint" ? newValue.toString() : newValue;
  return {
    type: PAYLOAD_TYPE,
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.config
    }::${paramToUpdate}`,
    arguments: [arg],
    type_arguments: [],
  };
}

export function registerStAptosPayload(): TransactionPayload {
  return {
    type: PAYLOAD_TYPE,
    function: `${Ditto.contractAddress.toString()}::${
      types.DittoModule.coin
    }::register`,
    arguments: [],
    type_arguments: [],
  };
}
