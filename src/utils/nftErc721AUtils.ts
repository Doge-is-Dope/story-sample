import { Address, createPublicClient, createWalletClient, defineChain, http } from "viem";
import { ACCOUNT_TYPE, getDummyAccount } from "./account";
import { AZUKI_CONTRACT_ADDRESS } from "./constants";
import { nftContractAbi } from "./nftContractAbi";

const storyTestnet = defineChain({
  id: 1513,
  name: "Story Testnet",
  nativeCurrency: {
    name: "IP",
    symbol: "IP",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://testnet.storyrpc.io"] },
    public: { http: ["https://testnet.storyrpc.io"] },
  },
});

const walletClient = createWalletClient({
  account: getDummyAccount(ACCOUNT_TYPE.WALLET),
  chain: storyTestnet,
  transport: http(),
});

const publicClient = createPublicClient({
  chain: storyTestnet,
  transport: http(),
});

/**
 * Mint NFT to another address
 */
const mintNFT = async (to: Address, amount: number): Promise<string> => {
  const { request } = await publicClient.simulateContract({
    address: AZUKI_CONTRACT_ADDRESS as Address,
    abi: nftContractAbi,
    functionName: "safeMint",
    args: [to, amount],
  });

  const hash = await walletClient.writeContract(request);
  console.log("Transaction hash:", hash);
  return hash;
};

const getTokenUri = async (tokenId: number): Promise<string> => {
  const uri = await publicClient.readContract({
    address: AZUKI_CONTRACT_ADDRESS as Address,
    abi: nftContractAbi,
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
  });
  return uri as string;
};

/**
 * Transfer Azuki to another address
 */
const transferNFT = async (from: Address, to: Address, tokenId: number): Promise<string> => {
  const { request } = await publicClient.simulateContract({
    address: AZUKI_CONTRACT_ADDRESS as Address,
    abi: nftContractAbi,
    functionName: "safeTransferFrom",
    args: [walletClient.account.address, to, tokenId],
  });
  const hash = await walletClient.writeContract(request);
  console.log("Transaction hash:", hash);
  return hash;
};

const getTotalSupply = async (): Promise<number> => {
  const totalSupply = await publicClient.readContract({
    address: AZUKI_CONTRACT_ADDRESS as Address,
    abi: nftContractAbi,
    functionName: "totalSupply",
  });
  return totalSupply as number;
};

export { mintNFT, getTokenUri, transferNFT, getTotalSupply };
