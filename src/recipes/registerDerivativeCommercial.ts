import { Address } from "viem";
import { getDummyAccount, ACCOUNT_TYPE } from "../utils/account";
import { getStoryClient } from "../story/client";
import { registerIp } from "../story/ipAsset";
import { mintNftAndRegister, mintNftAndRegisterAndDerivative } from "../utils/nftSPGUtils";
import { getMetadata } from "../utils/metadataUtils";
import { SUSD_ADDRESS } from "../utils/constants";
import { PIL_TYPE } from "@story-protocol/core-sdk";
import { erc20Abi } from "../utils/erc20Abi";

const main = async () => {
  const account = getDummyAccount(ACCOUNT_TYPE.WALLET);
  console.log(`Current Account: ${account.address}`);

  // 1. Create Story Client
  const client = getStoryClient(account);

  // 2. Mint and register Root NFT with PIL Commercial Use
  const collectionContractAddress = process.env.DUMMY_NFT_COLLECTION_CONTRACT as Address;
  const currency = SUSD_ADDRESS;
  const RootRes = await mintNftAndRegister(client, collectionContractAddress, PIL_TYPE.COMMERCIAL_USE, "100", currency);
  console.log(`Root NFT minted and registered`);
  console.log(`- Transaction Hash: ${RootRes.txHash}`);
  console.log(`- Token ID: ${RootRes.tokenId}`);
  console.log(`- IPA ID: ${RootRes.ipId}`);
  console.log(`- License Terms ID: ${RootRes.licenseTermsId}`);

  // 3. Mint and register another NFT
  const DerivRes = await mintNftAndRegister(client, collectionContractAddress, PIL_TYPE.NON_COMMERCIAL_REMIX);
  console.log(`Derivative NFT minted and registered`);
  console.log(`- Transaction Hash: ${DerivRes.txHash}`);
  console.log(`- Token ID: ${DerivRes.tokenId}`);
  console.log(`- IPA ID: ${DerivRes.ipId}`);
  console.log(`- License Terms ID: ${DerivRes.licenseTermsId}`);

  // Make sure the account has enough SUSD and approve ROYALTY_POLICY_LAP_ADDRESS

  // 4. Make the Child IP Asset a Derivative of the Parent IP Asset
  const linkDerivativeRes = await client.ipAsset.registerDerivative({
    childIpId: DerivRes.ipId as Address,
    parentIpIds: [RootRes.ipId as Address],
    licenseTermsIds: [RootRes.licenseTermsId as bigint],
    txOptions: { waitForTransaction: true },
  });

  console.log(`Child IP Asset linked as a derivative of the Parent IP Asset`);
  console.log(`- Transaction Hash: ${linkDerivativeRes.txHash}`);
};

// Current Account: 0x9fD042a18E90Ce326073fA70F111DC9D798D9a52
// Root NFT minted and registered
// - Transaction Hash: 0xee6036462469ea0350c55bbfd3340ea0b9c5ddc304ccbe48e7e71c5c5dd835f4
// - Token ID: 10
// - IPA ID: 0x0780923C9b0F03fea47E09C47909E0082341d3b9
// - License Terms ID: 4
// Derivative NFT minted and registered
// - Transaction Hash: 0x9bfb3ff6ce0fa808b7352fb4b35c97e659af805d2c2b3eba1ea757a748d43697
// - Token ID: 11
// - IPA ID: 0x49ad1Be776D91Ba9E39751AEf84A5755b74914B0
// - License Terms ID: 1
// Child IP Asset linked as a derivative of the Parent IP Asset
// - Transaction Hash: 0x37e5fa714c15ff51055d4c8111c7fbebf914273d6a075ed7c5aa11c15f87d087
main();
