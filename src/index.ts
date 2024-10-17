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
import { createNftCollection, mintAndRegisterIp, registerIp, registerIpWithLicense } from "./story/ipAsset.js";
import { getStoryClient } from "./story/client.js";
import { AZUKI_CONTRACT_ADDRESS } from "./utils/nftUtils.js";
import { attachLicense } from "./story/license.js";
import { SUSD_ADDRESS } from "./utils/constants.js";

const account = getDummyAccount(ACCOUNT_TYPE.SEAFOOD);

const owner = account.address === "0x9fD042a18E90Ce326073fA70F111DC9D798D9a52" ? "Clement" : "Seafood";
console.log(`=========== Account: ${owner} ============`);

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
