import { privateKeyToAccount, Address, Account } from "viem/accounts";

export enum ACCOUNT_TYPE {
  WALLET = "wallet",
  SEAFOOD = "seafood",
}

/**
 * Retrieves a dummy account using the private key from the environment variables.
 *
 * @returns {Account} An Account object created from the private key.
 */
export const getDummyAccount = (type: ACCOUNT_TYPE): Account => {
  let privateKey: Address;
  switch (type) {
    case ACCOUNT_TYPE.WALLET:
      privateKey = `0x${process.env.WALLET_PRIVATE_KEY}`;
      break;
    case ACCOUNT_TYPE.SEAFOOD:
      privateKey = `0x${process.env.SEAFOOD_PRIVATE_KEY}`;
      break;
  }
  return privateKeyToAccount(privateKey);
};
