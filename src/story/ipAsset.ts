import { Address } from "viem";
import {
  StoryClient,
  PIL_TYPE,
  CreateIpAssetWithPilTermsResponse,
  CreateNFTCollectionResponse,
  RegisterIpResponse,
  IpMetadata,
  RegisterIpAndMakeDerivativeResponse,
} from "@story-protocol/core-sdk";
import { getMetadata } from "../utils/metadataUtils";

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
const mintAndRegisterIp = async (
  client: StoryClient,
  nftContractAddress: Address,
  pilType: PIL_TYPE,
  metadata: Record<string, string>,
  mintingFee?: string,
  currency?: Address
): Promise<CreateIpAssetWithPilTermsResponse> => {
  const response: CreateIpAssetWithPilTermsResponse = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
    spgNftContract: nftContractAddress as Address,
    pilType: pilType,
    ipMetadata: {
      ipMetadataURI: `https://ipfs.io/ipfs/${metadata.ipIpfsHash}`,
      ipMetadataHash: `0x${metadata.ipHash}`,
      nftMetadataURI: `https://ipfs.io/ipfs/${metadata.nftIpfsHash}`,
      nftMetadataHash: `0x${metadata.nftHash}`,
    },
    mintingFee: mintingFee,
    currency: currency,
    txOptions: { waitForTransaction: true },
  });
  return response;
};

/**
 * Registers an IP asset with the provided token ID.
 * This is used when the NFT is already minted and we want to register it as an IP asset.
 *
 * @param {StoryClient} client - The StoryClient instance to use for registering the IP asset.
 * @param {Address} nftContractAddress - The address of the NFT contract.
 * @param {number} tokenId - The token ID of the NFT.
 * @returns {Promise<RegisterIpResponse>} The response containing the transaction hash and the IP asset ID.
 */
const registerIp = async (
  client: StoryClient,
  nftContractAddress: Address,
  tokenId: number,
  ipMetadata?: Record<string, string>
): Promise<RegisterIpResponse> => {
  const response = await client.ipAsset.register({
    nftContract: nftContractAddress as Address,
    tokenId: tokenId,
    ipMetadata: ipMetadata,
    txOptions: { waitForTransaction: true },
  });
  return response;
};

/**
 * Registers an IP asset with the provided token ID and attaches PIL (Programmable Intellectual License) terms.
 * This function is used when an NFT is already minted and we want to register it as an IP asset with specific license terms.
 *
 * @param {StoryClient} client - The StoryClient instance to use for registering the IP asset.
 * @param {Address} nftContractAddress - The address of the NFT contract.
 * @param {number} tokenId - The token ID of the NFT.
 * @param {PIL_TYPE} pilType - The type of Programmable Intellectual License to attach.
 * @param {string} mintingFee - The fee for minting, as a string representation of the amount.
 * @param {Address} currency - The address of the currency contract to use for the minting fee.
 * @returns {Promise<RegisterIpResponse>} A promise that resolves to the response containing the transaction hash and the IP asset ID.
 * @example
 * ```typescript
 * const response = await registerIpWithLicense(
 *   client,
 *   AZUKI_CONTRACT_ADDRESS,
 *   5,
 *   PIL_TYPE.COMMERCIAL_USE,
 *   "100",
 *   SUSD_ADDRESS
 * );
 * ```
 */
const registerIpWithLicense = async (
  client: StoryClient,
  nftContractAddress: Address,
  tokenId: number,
  pilType: PIL_TYPE,
  mintingFee: string,
  currency: Address
): Promise<RegisterIpResponse> => {
  const response = await client.ipAsset.registerIpAndAttachPilTerms({
    nftContract: nftContractAddress as Address,
    tokenId: tokenId,
    pilType: pilType,
    mintingFee: mintingFee,
    currency: currency,
    txOptions: { waitForTransaction: true },
  });
  return response;
};

const registerDerivativeIp = async (
  client: StoryClient,
  nftContractAddress: Address,
  tokenId: number,
  parentIpId: Address,
  licenseTermsId: number,
  ipMetadata?: Record<string, string>
): Promise<RegisterIpAndMakeDerivativeResponse> => {
  const response = await client.ipAsset.registerDerivativeIp({
    nftContract: nftContractAddress as Address,
    tokenId: tokenId,
    derivData: {
      parentIpIds: [parentIpId as Address],
      licenseTermsIds: [licenseTermsId],
    },
    ipMetadata: ipMetadata,
    txOptions: { waitForTransaction: true },
  });
  return response;
};

export { mintAndRegisterIp, registerIp, registerIpWithLicense, registerDerivativeIp };
