import "dotenv/config";
import { http, createWalletClient, createPublicClient } from "viem";
import { sepolia } from "viem/chains";
import { Address } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { getDummyAccount } from "./account";

const mintContractAbi = {
  inputs: [{ internalType: "address", name: "to", type: "address" }],
  name: "mint",
  outputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
  stateMutability: "nonpayable",
  type: "function",
};

// const walletClient = createWalletClient({
//   account,
//   chain: sepolia,
//   transport: http("https://rpc.ankr.com/eth_sepolia"),
// });
// const publicClient = createPublicClient({
//   chain: sepolia,
//   transport: http("https://rpc.ankr.com/eth_sepolia"),
// });

// async function mintNFT(): Promise<string> {
//   const { request } = await publicClient.simulateContract({
//     address: "0x7ee32b8b515dee0ba2f25f612a04a731eec24f49" as Address,
//     functionName: "mint",
//     args: [account.address],
//     abi: [mintContractAbi],
//   });
//   const hash = await walletClient.writeContract(request);
//   const receipt = await publicClient.waitForTransactionReceipt({ hash });
//   const tokenId = Number(receipt.logs[0].topics[3]).toString();
//   return tokenId;
// }

// async function registerIPAsset() {
//   const tokenId = await mintNFT();
//   const registeredIpAssetResponse = await client.ipAsset.register({
//     nftContract: "0x7ee32b8b515dee0ba2f25f612a04a731eec24f49" as Address,
//     tokenId,
//     txOptions: { waitForTransaction: true },
//   });
//   console.log(
//     `Root IPA created at transaction hash ${registeredIpAssetResponse.txHash}, IPA ID: ${registeredIpAssetResponse.ipId}`
//   );
// }

// registerIPAsset();

const account = getDummyAccount();
console.log(account.address);
