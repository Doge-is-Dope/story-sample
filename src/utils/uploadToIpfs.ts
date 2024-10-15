import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_JWT,
});

/**
 * Uploads metadata to IPFS using Pinata SDK.
 *
 * @param {Record<string, any>} metadata - The metadata to be uploaded to IPFS.
 * @returns {Promise<string>} A promise that resolves to the IPFS hash of the uploaded metadata.
 * @throws {Error} If there's an error during the upload process.
 */
const upload = async (metadata: Record<string, any>): Promise<string> => {
  try {
    const upload = await pinata.upload.json(metadata);
    return upload.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
};

export { upload };
