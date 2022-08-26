# SDK

# Smart contract address

| Network |                                Value                                 |
| ------- | :------------------------------------------------------------------: |
| Devnet  | `0x6effdeb5d61295008a14f90db251d623ff3da749f82d7bc05b47838b1414362b` |

# How to use it

## Basic functionality

### Loading ditto state

```ts
import * as aptos from "aptos";
import { Ditto, Client, types, utils, wallet, payload } from "@ditto-research/staking-sdk";

// Load the Ditto object singleton, needed to do all operations with the SDK
await Ditto.load(
    new wallet.DummyWallet(), // Wallet object
    types.Network.DEVNET,
    "https://fullnode.devnet.aptoslabs.com/v1", // REST url endpoint
    new aptos.HexString(SMART_CONTRACT_ADDRESS),
    5000, // Txn confirmation timeout - unused for now
);
```

### Create a local node wallet
```ts
// Parameters for your aptos transactions.
const DEFAULT_TXN_CONFIG: types.AptosTxnConfig = {
  maxGasAmount: 1000n,
  gasUnitPrice: 1n,
  txnExpirationOffset: 10n,
};

let wallet: wallet.DittoWallet = new wallet.DittoWallet(
  new aptos.HexString(USER_PRIVATE_KEY),
  DEFAULT_TXN_CONFIG
);
```

### Using a wallet adapter

The SDK's DittoClient constructor just expects a wallet that implements this interface.

```ts
// All objects that implement this interface (including wallet adapter).
export interface Wallet {
  account: AccountKeys;
  signAndSubmitTransaction(transaction: any): Promise<any>;
  signTransaction(transaction: any): Promise<any>;
}
```

### Creating a ditto client

```ts
// Any wallet object implementing the interface can be passed in.
let client = new Client(wallet, types.Network.DEVNET, 5000);

// Example of how to stake aptos:
let txResponse = await client.stakeAptos(STAKE_AMOUNT);

// These functions will return an object of type -
// interface TxnResponse {
//  hash: string; // The txn hash
//  msg: string; // Whether the transaction was successful
// }

console.log(`Stake aptos txn reponse =`, txResponse);

// How to instant unstake stAPT (subject to instant unstake fee).
await client.instantUnstake(<amount>);

// *** Note delayed unstake and claim functionality is not available on devnet ***.
// How to delayed unstake stAPT.
await client.delayedUnstake(<amount>);

// View user delayed unstake state.
let userClaimState = await Ditto.getUserClaimStateFromTable(client.address);

// How to claim processed delayed unstake tickets.
await client.claimAptos();

// For the rest of the client functionality you can look at `client.ts`
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
// Get staked aptos index.
let index = await Ditto.staptosIndex();

// Get aptos balance for an account
let aptosBalance = await getAccountAptosBalance(ACCOUNT_ADDR);

// Get staked aptos balance for an account
let stAptosBalance = await getAccountStaptosBalance(ACCOUNT_ADDR);

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

### Extra state fetching
```ts
// This will refresh the smart contract's resources with up-to-date on chain data.
// This is called on load as well.
await Ditto.refreshDittoResources();

// You can check Ditto's smart contract resources via the Ditto object
console.log(Ditto.dittoConfig);
console.log(Ditto.dittoPool);
console.log(Ditto.validatorWhitelist);

// You can query on chain state from Ditto as well- some examples
// This will get validator state for a certain validator
let validatorState = await Ditto.getValidatorStateFromTable(VALIDATOR_KEY);

// This will get how much aptos users can claim from their delayed unstake requests
let userClaimState = await Ditto.getUserClaimStateFromTable(USER_KEY);

// For the rest of Ditto functionality you can look at client.ts
// This includes more available entry-points and on chain state queries
```

### Permissionless cranking
There are several permissionless entry-points that can be called via the Ditto singleton.
```ts
// Distribute pending stake to validators.
await Ditto.distributeUnstakedCoins();

// Update Ditto's smart contract state on new epochs.
await Ditto.updateDittoState();

// Reactive inactive validator.
await Ditto.joinValidatorSet(validatorPoolAddress);
```
