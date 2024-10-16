import "dotenv/config";
import { Address } from "viem";
import {
  CreateIpAssetWithPilTermsResponse,
  CreateNFTCollectionResponse,
  PIL_TYPE,
  StoryClient,
} from "@story-protocol/core-sdk";
import { hashMetadata, getDummyIpMetadata, getDummyNftMetadata } from "./utils/metadataUtils.js";
import { upload } from "./utils/uploadToIpfs.js";
import { getDummyAccount, ACCOUNT_TYPE } from "./utils/account.js";
import { getStoryClient, createNftCollection, mintAndRegister, registerWithLicense } from "./story/ipAsset.js";
import { AZUKI_CONTRACT_ADDRESS } from "./utils/nftUtils.js";
import { SUSD_ADDRESS } from "./story/license.js";

const account = getDummyAccount(ACCOUNT_TYPE.SEAFOOD);

const client = getStoryClient(account);

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
 * Sets up the NFT collection.
 * @returns The response from creating the NFT collection.
 */
const setUpNftCollection = async (client: StoryClient): Promise<CreateNFTCollectionResponse> => {
  const result = await createNftCollection(client, "Meme", "MEME");
  return result;
};

/**
 * Mints an NFT and registers an IP asset.
 * @returns The response from minting and registering the IP asset.
 */
const mintNftAndRegister = async (client: StoryClient): Promise<CreateIpAssetWithPilTermsResponse> => {
  const { ipIpfsHash, ipHash, nftIpfsHash, nftHash } = await getMetadata();
  const nftCollection = await setUpNftCollection(client);
  const response = await mintAndRegister(
    client,
    nftCollection.nftContract as Address,
    ipIpfsHash,
    ipHash,
    nftIpfsHash,
    nftHash
  );
  return response;
};
