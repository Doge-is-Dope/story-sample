import { Address } from "viem";
import { getDummyAccount, ACCOUNT_TYPE } from "../utils/account";
import { getStoryClient } from "../story/client";
import { registerIp, registerDerivativeIp } from "../story/ipAsset";
import { ERC721_CONTRACT_ADDRESS } from "../utils/constants";
import { mintNFT } from "../utils/erc721Utils";
import { getMetadata } from "../utils/metadataUtils";

const main = async () => {
  const account = getDummyAccount(ACCOUNT_TYPE.WALLET);
  console.log(`Current Account: ${account.address}`);

  // 1. Create Story Client
  const client = getStoryClient(account);

  // 2. Create Root NFT & IP Metadata
  const { ipIpfsHash, ipHash, nftIpfsHash, nftHash } = await getMetadata();

  // Prepare IP asset metadata
  const ipMetadata = {
    ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
    ipMetadataHash: `0x${ipHash}`,
    nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
    nftMetadataHash: `0x${nftHash}`,
  };

  // 3. Mint Root NFT (if needed)
  const mintRootNftRes = await mintNFT(account.address, `https://ipfs.io/ipfs/${nftIpfsHash}`);
  const rootTokenId = mintRootNftRes as number;
  console.log(`Root NFT minted`);
  console.log(`- Token ID: ${rootTokenId}`);

  // 4. Register Root IP Asset
  const registerRootRes = await registerIp(client, ERC721_CONTRACT_ADDRESS, rootTokenId, ipMetadata);
  const rootIpId = registerRootRes.ipId as Address;
  console.log(`Root IP Asset registered`);
  console.log(`- Transaction Hash: ${registerRootRes.txHash}`);
  console.log(`- IPA ID: ${rootIpId}`);

  // 5. Mint Derivative NFT (if needed)
  const mintDerivativeNftRes = await mintNFT(account.address, `https://ipfs.io/ipfs/${nftIpfsHash}`);
  const derivativeTokenId = mintDerivativeNftRes as number;
  console.log(`Derivative NFT minted`);
  console.log(`- Token ID: ${derivativeTokenId}`);
  // 6. Register Derivative NFT
  const registerDerivativeRes = await registerDerivativeIp(
    client,
    ERC721_CONTRACT_ADDRESS,
    derivativeTokenId,
    rootIpId,
    1,
    ipMetadata // For demo, use the same metadata for both root and derivative
  );
  console.log(`Derivative IP Asset registered`);
  console.log(`- Transaction Hash: ${registerDerivativeRes.txHash}`);
  console.log(`- Derivative IPA ID: ${registerDerivativeRes.ipId}`);
};

// Current Account: 0x9fD042a18E90Ce326073fA70F111DC9D798D9a52
// Root NFT minted
// - Token ID: 105
// Root IP Asset registered
// - Transaction Hash: 0xef5021ace2c5681f4c5dfa2be8a410e3de79abb1ca6486b6965218ed51499ff4
// - IPA ID: 0xd38a9d2f9156ce95bf4AB6D0D08e223a1C9067B9
// Derivative NFT minted
// - Token ID: 106
// Derivative IP Asset registered
// - Transaction Hash: 0x524f4484430f7ef72cabaf6550161e6e153c62bd8f8f2ed82c9b69b6ad363bf7
// - Derivative IPA ID: 0x007b1204dD593577258972BC647215bd6E891924
main();
