import { privateKeyToAccount, Address, Account } from "viem/accounts";

enum ACCOUNT_TYPE {
  DUMMY = "dummy",
  SEAFOOD = "seafood",
}

/**
 * Retrieves a dummy account using the private key from the environment variables.
 *
 * @returns {Account} An Account object created from the private key.
 */
const getDummyAccount = (type: ACCOUNT_TYPE): Account => {
  let privateKey: Address;
  switch (type) {
    case ACCOUNT_TYPE.DUMMY:
      privateKey = `0x${process.env.DUMMY_PRIVATE_KEY}`;
      break;
    case ACCOUNT_TYPE.SEAFOOD:
      privateKey = `0x${process.env.SEAFOOD_PRIVATE_KEY}`;
      break;
  }
  return privateKeyToAccount(privateKey);
};

export { ACCOUNT_TYPE, getDummyAccount };
