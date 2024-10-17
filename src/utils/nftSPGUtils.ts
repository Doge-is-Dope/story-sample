import { Address, createPublicClient, createWalletClient, defineChain, http } from "viem";
import { CreateIpAssetWithPilTermsResponse, CreateNFTCollectionResponse, StoryClient } from "@story-protocol/core-sdk";
import { getMetadata } from "./metadataUtils";
import { mintAndRegisterIp } from "../story/ipAsset";
import { ACCOUNT_TYPE, getDummyAccount } from "./account";
import { nftContractAbi } from "./nftContractAbi";

/**
 * Create dummy NFT collection.
 * @returns The response from creating the NFT collection.
 */
const createDummyNftCollection = async (
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
 * Mints an NFT and registers an IP asset.
 * @returns The response from minting and registering the IP asset.
 */
const mintNftAndRegister = async (
  client: StoryClient,
  collectionName: string,
  collectionSymbol: string
): Promise<CreateIpAssetWithPilTermsResponse> => {
  const { ipIpfsHash, ipHash, nftIpfsHash, nftHash } = await getMetadata();
  const nftCollection = await createDummyNftCollection(client, collectionName, collectionSymbol);
  const response = await mintAndRegisterIp(
    client,
    nftCollection.nftContract as Address,
    ipIpfsHash,
    ipHash,
    nftIpfsHash,
    nftHash
  );
  return response;
};

/**
 * Mint an NFT from a collection and register it as a derivative IP without license tokens.
 *
 * @param client
 * @param parentIpIds
 * @param licenseTermsIds
 * @returns
 */
const mintNftAndRegisterAndDerivative = async (
  client: StoryClient,
  parentIpIds: Address[],
  licenseTermsIds: string[]
) => {
  const response = await client.ipAsset.mintAndRegisterIpAndMakeDerivative({
    nftContract: process.env.DUMMY_NFT_COLLECTION_CONTRACT as Address,
    derivData: {
      parentIpIds: parentIpIds,
      licenseTermsIds: licenseTermsIds,
    },
    txOptions: { waitForTransaction: true },
  });
  return response;
};

export { createDummyNftCollection, mintNftAndRegister, mintNftAndRegisterAndDerivative };
