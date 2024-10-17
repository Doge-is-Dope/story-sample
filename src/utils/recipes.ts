import { Address } from "viem";
import { getDummyIpMetadata, getDummyNftMetadata, hashMetadata } from "./metadataUtils.js";
import { upload } from "./uploadToIpfs.js";
import { createNftCollection, mintAndRegisterIp, registerIp, registerIpWithLicense } from "../story/ipAsset.js";
import { CreateIpAssetWithPilTermsResponse, CreateNFTCollectionResponse, StoryClient } from "@story-protocol/core-sdk";

/**
 * Get the dummy metadata for the NFT collection.
 * @returns The IPFS hashes and hashes of the metadata.
 */
const getMetadata = async (): Promise<{
  ipIpfsHash: string;
  ipHash: string;
  nftIpfsHash: string;
  nftHash: string;
}> => {
  const ipMetadata = getDummyIpMetadata();
  const ipIpfsHash = await upload(ipMetadata);
  const ipHash = hashMetadata(ipMetadata);

  const nftMetadata = getDummyNftMetadata();
  const nftIpfsHash = await upload(nftMetadata);
  const nftHash = hashMetadata(nftMetadata);
  return { ipIpfsHash, ipHash, nftIpfsHash, nftHash };
};

/**
 * Create dummy NFT collection.
 * @returns The response from creating the NFT collection.
 */
const createDummyNftCollection = async (client: StoryClient): Promise<CreateNFTCollectionResponse> => {
  const result = await createNftCollection(client, "Meme", "MEME");
  return result;
};

/**
 * Mints an NFT and registers an IP asset.
 * @returns The response from minting and registering the IP asset.
 */
const mintNftAndRegister = async (client: StoryClient): Promise<CreateIpAssetWithPilTermsResponse> => {
  const { ipIpfsHash, ipHash, nftIpfsHash, nftHash } = await getMetadata();
  const nftCollection = await createDummyNftCollection(client);
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

export { getMetadata, createDummyNftCollection, mintNftAndRegister };
