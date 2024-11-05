import { http, Account } from "viem";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";

/**
 * Creates and returns a new StoryClient instance.
 *
 * @param {Account} account - The account to be used for the StoryClient.
 * @returns {StoryClient} A new StoryClient instance configured with the provided account and environment settings.
 */
const getStoryClient = (account: Account) => {
  const config: StoryConfig = {
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chainId: "odyssey",
  };
  return StoryClient.newClient(config);
};

export { getStoryClient };
