export const ERROR_MAP = {
  ditto_staking: {
    100: "Signer is not the Ditto admin.",
    101: "Ditto Pool has already been initialized.",
    102: "Ditto Pool has not been initialized.",
    103: "User has no registered Staptos account",
    104: "Insufficient aptos in instant unstake buffer.",
    105: "Invalid validator state in update_ditto_state.",
    106: "Validator has pending inactive stake",
    107: "Invalid unstake amount.",
    108: "Invalid unstake state.",
    109: "User has no claim state.",
    110: "User has 0 claimable balance.",
    111: "Validator has already been whitelisted.",
    112: "Validator has not been whitelisted.",
    113: "Validator is not part of Ditto Pool.",
    114: "Validator is not inactive.",
    115: "Ditto Admin is not allowed to perform this action.",
    116: "Exceeded maximum number of validators in Ditto Pool.",
    117: "There are no validators in Ditto Pool.",
  },
  ditto_config: {
    100: "Signer is not the Ditto admin.",
    101: "Ditto Config has already been initialized",
    102: "Invalid Ditto Config parameters.",
  },
  staked_coin: {
    100: "Signer is not the Ditto admin.",
  },
  table_with_keys: {
    100: "Key was not found in the table.",
  },
  validator_lockup_buffer: {
    100: "Signer is not the Ditto admin.",
    101: "Attempting to remove a validator that does not exist.",
    102: "There are no validators in Ditto Pool.",
  },
};

export class DittoError extends Error {
  public code(): string {
    return this._code;
  }
  private _code: string;

  public nativeMsg(): string {
    return this._nativeMsg;
  }
  private _nativeMsg: string;

  constructor(code: string, nativeMsg: string, message: string) {
    super(message);
    this.name = "DittoError";
    this._code = code;
    this._nativeMsg = nativeMsg;
  }
}
