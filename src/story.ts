import { http, Account, Address } from "viem";
import {
  StoryClient,
  StoryConfig,
  PIL_TYPE,
  CreateIpAssetWithPilTermsRequest,
  CreateIpAssetWithPilTermsResponse,
  CreateNFTCollectionResponse,
} from "@story-protocol/core-sdk";

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
    chainId: "iliad",
  };
  return StoryClient.newClient(config);
};

/**
 * Creates a new SPG NFT collection using the provided StoryClient.
 *
 * @param {StoryClient} client - The StoryClient instance to use for creating the collection.
 * @param {string} name - The name of the NFT collection.
 * @param {string} symbol - The symbol for the NFT collection.
 * @returns {Promise<CreateNFTCollectionResponse>} A promise that resolves to the response of creating the NFT collection.
 */
const createNftCollection = async (
  client: StoryClient,
  name: string,
  symbol: string
): Promise<CreateNFTCollectionResponse> => {
  const newCollection = await client.nftClient.createNFTCollection({
    name: name,
    symbol: symbol,
    txOptions: { waitForTransaction: true },
  });
  return newCollection;
};

/**
 * Mints and registers an IP asset with the provided metadata.
 *
 * @param {StoryClient} client - The StoryClient instance to use for minting and registering the IP asset.
 * @param {Address} nftContractAddress - The address of the NFT contract.
 * @param {string} ipIpfsHash - The IPFS hash of the IP metadata.
 * @param {string} ipHash - The hash of the IP metadata.
 * @param {string} nftIpfsHash - The IPFS hash of the NFT metadata.
 * @param {string} nftHash - The hash of the NFT metadata.
 * @returns {Promise<CreateIpAssetWithPilTermsResponse>} A promise that resolves to the response of creating the IP asset.
 */
const mintAndRegisterIpAsset = async (
  client: StoryClient,
  nftContractAddress: Address,
  ipIpfsHash: string,
  ipHash: string,
  nftIpfsHash: string,
  nftHash: string
): Promise<CreateIpAssetWithPilTermsResponse> => {
  const response: CreateIpAssetWithPilTermsResponse = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
    nftContract: nftContractAddress as Address,
    pilType: PIL_TYPE.NON_COMMERCIAL_REMIX,
    ipMetadata: {
      ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
      ipMetadataHash: `0x${ipHash}`,
      nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
      nftMetadataHash: `0x${nftHash}`,
    },
    txOptions: { waitForTransaction: true },
  });
  return response;
};

export { getStoryClient, createNftCollection, mintAndRegisterIpAsset };
