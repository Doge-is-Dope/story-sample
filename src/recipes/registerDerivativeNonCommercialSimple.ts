import { Address } from "viem";
import { getDummyAccount, ACCOUNT_TYPE } from "../utils/account";
import { getStoryClient } from "../story/client";
import { registerIp } from "../story/ipAsset";
import { AZUKI_CONTRACT_ADDRESS } from "../utils/constants";
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

  // 3. Mint and register Derivative IP Asset
  const RegisterDerivRes = await mintNftAndRegisterAndDerivative(client, [rootIpId], ["1"]);
  console.log(`Derivative IP Asset registered`);
  console.log(`- Transaction Hash: ${RegisterDerivRes.txHash}`);
  console.log(`- IPA ID: ${RegisterDerivRes.childIpId}`);
};

// Current Account: 0x9fD042a18E90Ce326073fA70F111DC9D798D9a52
// Root IP Asset registered
// - Transaction Hash: 0x259ddc0611f8bee7b73b18b837b558e0b398a52f0d193d88bca58888c093a48c
// - IPA ID: 0x4f5EbEe5181e794B62F186237996d3e89cb3Fb72
// Derivative IP Asset registered
// - Transaction Hash: 0xa7653f9861ed48330b630c4f7bee8bd356809abccb90ed6c434a67ad0214da1f
// - IPA ID: 0x8D4543e285FaccFBa455D79B27A3115cbDa3054E
main();
