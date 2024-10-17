import { Address, createWalletClient, http } from "viem";
import { ACCOUNT_TYPE, getDummyAccount } from "./account";
import { nftContractAbi } from "./nftContractAbi";
import { publicClient, storyTestnet } from "./utils";
import { ERC721_CONTRACT_ADDRESS } from "./constants";

const walletClient = createWalletClient({
  account: getDummyAccount(ACCOUNT_TYPE.WALLET),
  chain: storyTestnet,
  transport: http(),
});

export async function mintNFT(to: Address, uri: string): Promise<number | undefined> {
  const { request } = await publicClient.simulateContract({
    address: ERC721_CONTRACT_ADDRESS as Address,
    abi: nftContractAbi,
    functionName: "mintNFT",
    args: [to, uri],
  });

  const hash = await walletClient.writeContract(request);
  const { logs } = await publicClient.waitForTransactionReceipt({
    hash,
  });
  if (logs && logs[0] && logs[0].topics && logs[0].topics[3]) {
    return parseInt(logs[0].topics[3], 16);
  }
}
