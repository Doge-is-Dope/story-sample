import { Account, Address, createPublicClient, createWalletClient, defineChain, http } from "viem";
import { ACCOUNT_TYPE, getDummyAccount } from "./account.js";
import { AZUKI_CONTRACT_ADDRESS } from "./constants.js";
// Use Clement Dev account to create NFT
const account: Account = getDummyAccount(ACCOUNT_TYPE.CLEMENT);

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
  account,
  chain: storyTestnet,
  transport: http(),
});
const publicClient = createPublicClient({
  chain: storyTestnet,
  transport: http(),
});

const abi = [
  {
    constant: false,
    inputs: [
      {
        name: "to",
        type: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeMint",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const mintNFT = async (amount: number): Promise<string> => {
  const { request } = await publicClient.simulateContract({
    address: AZUKI_CONTRACT_ADDRESS as Address,
    abi: abi,
    functionName: "safeMint",
    args: [account.address, amount],
  });

  const hash = await walletClient.writeContract(request);
  console.log("Transaction hash:", hash);
  return hash;
};

const getTokenUri = async (tokenId: number): Promise<string> => {
  const uri = await publicClient.readContract({
    address: AZUKI_CONTRACT_ADDRESS as Address,
    abi: abi,
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
  });
  return uri as string;
};

const transferNFT = async (to: Address, tokenId: number): Promise<string> => {
  const { request } = await publicClient.simulateContract({
    address: AZUKI_CONTRACT_ADDRESS as Address,
    abi: abi,
    functionName: "safeTransferFrom",
    args: [account.address, to, tokenId],
  });
  const hash = await walletClient.writeContract(request);
  console.log("Transaction hash:", hash);
  return hash;
};

export { mintNFT, getTokenUri, transferNFT };
