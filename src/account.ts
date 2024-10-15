import { privateKeyToAccount, Address, Account } from "viem/accounts";

/**
 * Retrieves a dummy account using the private key from the environment variables.
 *
 * @returns {Account} An Account object created from the private key.
 */
const getDummyAccount = (): Account => {
  const privateKey: Address = `0x${process.env.WALLET_PRIVATE_KEY}`;
  return privateKeyToAccount(privateKey);
};

export { getDummyAccount };
