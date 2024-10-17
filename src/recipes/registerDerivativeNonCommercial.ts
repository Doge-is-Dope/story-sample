import { Address } from "viem";
import { getDummyAccount, ACCOUNT_TYPE } from "../utils/account";
import { getStoryClient } from "../story/client";
import { registerIp, registerDerivativeIp } from "../story/ipAsset";
import { ERC721_CONTRACT_ADDRESS } from "../utils/constants";
import { mintNFT } from "../utils/nftErc721Utils";
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

main();
