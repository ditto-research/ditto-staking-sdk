# SDK

# Smart contract address

| Network |                                Value                                 |
| ------- | :------------------------------------------------------------------: |
| Devnet  | `0x31f90de455c87470b5beb98e219979c472e8b11c680140883d832c16a04da996` |

# How to use it

### Basic functionality

```ts
import \* as aptos from "aptos";
import { Ditto, DittoClient, types, utils, wallet, payload } from "@ditto-research/staking-sdk";

// Load the Ditto object singleton, needed to do all operations with the SDK
await Ditto.load(
new wallet.DummyWallet(), // Wallet object
types.Network.DEVNET,
"https://fullnode.devnet.aptoslabs.com/v1", // REST url endpoint
new aptos.HexString(SMART_CONTRACT_ADDRESS),
5000, // Txn confirmation timeout - unused for now
);

// This will refresh the smart contract's resources with up-to-date on chain data
await Ditto.refreshDittoResources();

// You can check Ditto's smart contract resources via the Ditto object
console.log(Ditto.dittoConfig);
console.log(Ditto.dittoPool);
console.log(Ditto.validatorWhitelist);

// There are several permissionless entry-points that can be called via the Ditto singleton
await Ditto.distributeUnstakedCoins(); // Distribute pending stake to validators
await Ditto.updateDittoState(); // Update Ditto's smart contract state on new epochs
await Ditto.joinValidatorSet(validatorPoolAddress); // Reactivate inactive validators

// You can query on chain state from Ditto as well- some examples
// This will get validator state for a certain validator
let validatorState = await Ditto.getValidatorStateFromTable(VALIDATOR_KEY);

// This will get how much aptos users can claim from their delayed unstake requests
let userClaimState = await Ditto.getUserClaimStateFromTable(USER_KEY);

// For the rest of Ditto functionality you can look at ditto-client.ts
// This inclues more available entry-points and on chain state queries
```

### Creating a ditto user

```ts
// Parameters for your aptos transactions
const DEFAULT_TXN_CONFIG: types.AptosTxnConfig = {
  maxGasAmount: 1000n,
  gasUnitPrice: 1n,
  txnExpirationOffset: 10n,
};

// Create a Ditto user wallet
let dittoUserWallet: wallet.DittoWallet = new wallet.DittoWallet(
  new aptos.HexString(USER_PRIVATE_KEY),
  DEFAULT_TXN_CONFIG
);

let dittoUser = new DittoClient(dittoUserWallet, types.Network.DEVNET, 5000);

// Example of how to stake aptos:
let stakeAptosTxnResponse = await dittoUser.stakeAptos(STAKE_AMOUNT);

// This will return an object of type -
// interface TxnResponse {
// hash: string; // The txn hash
// msg: string; // Whether the transaction was successful
// }
console.log(`Stake aptos txn reponse =`, stakeAptosTxnResponse);

// Example of how to instant unstake aptos:
await dittoUser.instantUnstake(InstantUnstakeAmount);

// Example of how to delayed unstake aptos:
await dittoUser.delayedUnstake(DelayedUnstakeAmount);

// Example of how to claim aptos from delayed unstakes:
await dittoUser.claimAptos();

// For the rest of the dittoUser functionality you can look at ditto-user.ts
```

### Getting payloads

```ts
// Example of creating an add validator payload
let addValidatorPayload = payload.addValidatorPayload();

// Example of creating a stake aptos payload
let stakeAptosPayload = payload.stakeAptosPayload(STAKE_AMOUNT);

// For the rest of the payload generation functionality you can look at payload.ts
```

Useful utility functions

```ts
// Get aptos balance for an account
let aptosBalance = await getAccountAptosBalance(ACCOUNT_ADDR);

// Get staked aptos balance for an account
let stAptosBalance = await getAccountStAptosBalance(ACCOUNT_ADDR);

// Get staked aptos coin info: returns CoinInfo
// interface CoinInfo {
// decimals: number;
// name: string;
// supply: bigint;
// symbol: string;
// }
let stAptosCoinInfo = await getStAptosInfo();

// For the rest of the utility functionality you can look at utils.ts
```
