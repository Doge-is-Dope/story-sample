import "dotenv/config";
import { Account, Address } from "viem";
import { getDummyAccount, ACCOUNT_TYPE } from "./utils/account";
import { getStoryClient } from "./story/client";
import { createDummyNftCollection } from "./utils/nftSPGUtils";
import { mintNFT } from "./utils/erc721Utils";
import { getMetadata } from "./utils/metadataUtils";
import { approve, mintSUSD } from "./utils/erc20Utils";
import { ROYALTY_POLICY_LAP_ADDRESS, SUSD_ADDRESS } from "./utils/constants";

const main = async () => {
  const account = getDummyAccount(ACCOUNT_TYPE.WALLET);
  console.log(`Account: ${account.address}`);

  // Create Story Protocol client
  const client = getStoryClient(account);

  // Create a dummy NFT collection
  const response = await createDummyNftCollection(client, "Dummy NFT Collection", "DUMMY");
  console.log(`SPG Collection created`);
  console.log(`- Transaction Hash: ${response.txHash}`);
  console.log(`- Contract: ${response.nftContract}`);
};

// Mint a Test ERC-721 NFT (Story NFT)
const mintTestNFT = async (to: Address, uri: string) => {
  const id = await mintNFT(to, uri);
  console.log(`NFT minted`);
  console.log(`- NFT ID: ${id}`);
};

const testMetadata = async () => {
  const { ipIpfsHash, ipHash, nftIpfsHash, nftHash } = await getMetadata();
  console.log(`IP Metadata: ${ipIpfsHash}, ${ipHash}`);
  console.log(`NFT Metadata: ${nftIpfsHash}, ${nftHash}`);
};
