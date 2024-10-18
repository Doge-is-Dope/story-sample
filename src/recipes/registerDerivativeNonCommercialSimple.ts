import { Address } from "viem";
import { getDummyAccount, ACCOUNT_TYPE } from "../utils/account";
import { getStoryClient } from "../story/client";
import { registerDerivativeIp, registerIp } from "../story/ipAsset";
import { AZUKI_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS } from "../utils/constants";
import { getMetadata } from "../utils/metadataUtils";
import { mintNFT } from "../utils/erc721Utils";
import { mintNftAndRegisterAndDerivative } from "../utils/nftSPGUtils";

const main = async () => {
  const account = getDummyAccount(ACCOUNT_TYPE.WALLET);
  console.log(`Current Account: ${account.address}`);

  // 1. Create Story Client
  const client = getStoryClient(account);

  // 2. Register existing NFT as Root IP Asset
  const registerRootRes = await registerIp(client, AZUKI_CONTRACT_ADDRESS, 6);
  const rootIpId = registerRootRes.ipId as Address;
  console.log(`Root IP Asset registered`);
  console.log(`- Transaction Hash: ${registerRootRes.txHash}`);
  console.log(`- IPA ID: ${rootIpId}`);

  // Prepare IP asset metadata
  const { ipIpfsHash, ipHash, nftIpfsHash, nftHash } = await getMetadata();
  const ipMetadata = {
    ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
    ipMetadataHash: `0x${ipHash}`,
    nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
    nftMetadataHash: `0x${nftHash}`,
  };

  // 3a. Mint an NFT, register IP Asset, and link as Derivative
  const res3a = await mintNftAndRegisterAndDerivative(
    client,
    "0x518823E6139048fD0e7757580ce4D9FF8f46D419", // SPG ERC-721
    [rootIpId],
    ["1"],
    ipMetadata
  );
  console.log(`Derivative IP Asset registered`);
  console.log(`- Transaction Hash: ${res3a.txHash}`);
  console.log(`- IPA ID: ${res3a.childIpId}`);

  // 3b. Register Pre-minted NFT as IP Asset and Link as Derivative
  const mintNftRes = await mintNFT(account.address, `https://ipfs.io/ipfs/${nftIpfsHash}`);
  const tokenId = mintNftRes as number; // NFT tokenId
  const res3b = await registerDerivativeIp(client, ERC721_CONTRACT_ADDRESS, tokenId, rootIpId, 1, ipMetadata);
  console.log(`Derivative IP Asset registered`);
  console.log(`- Transaction Hash: ${res3b.txHash}`);
  console.log(`- IPA ID: ${res3b.ipId}`);
};

// Current Account: 0x9fD042a18E90Ce326073fA70F111DC9D798D9a52
// Root IP Asset registered
// - Transaction Hash: 0x259ddc0611f8bee7b73b18b837b558e0b398a52f0d193d88bca58888c093a48c
// - IPA ID: 0x4f5EbEe5181e794B62F186237996d3e89cb3Fb72
// Derivative IP Asset registered
// - Transaction Hash: 0xa7653f9861ed48330b630c4f7bee8bd356809abccb90ed6c434a67ad0214da1f
// - IPA ID: 0x8D4543e285FaccFBa455D79B27A3115cbDa3054E
main();
