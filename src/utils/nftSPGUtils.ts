import { Address } from "viem";
import {
  CreateIpAssetWithPilTermsResponse,
  CreateNFTCollectionResponse,
  PIL_TYPE,
  StoryClient,
} from "@story-protocol/core-sdk";
import { getMetadata } from "./metadataUtils";
import { mintAndRegisterIp } from "../story/ipAsset";

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
  nftContractAddress: Address,
  pilType: PIL_TYPE,
  mintingFee?: string,
  currency?: Address
): Promise<CreateIpAssetWithPilTermsResponse> => {
  const metadata = await getMetadata();
  const response = await mintAndRegisterIp(client, nftContractAddress, pilType, metadata, mintingFee, currency);
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
  nftContractAddress: Address,
  parentIpIds: Address[],
  licenseTermsIds: string[],
  ipMetadata?: Record<string, string>
) => {
  const response = await client.ipAsset.mintAndRegisterIpAndMakeDerivative({
    nftContract: nftContractAddress,
    derivData: {
      parentIpIds: parentIpIds,
      licenseTermsIds: licenseTermsIds,
    },
    ipMetadata: ipMetadata,
    txOptions: { waitForTransaction: true },
  });
  return response;
};

export { createDummyNftCollection, mintNftAndRegister, mintNftAndRegisterAndDerivative };
