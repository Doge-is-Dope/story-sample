import { createPublicClient, defineChain, http } from "viem";

export const storyTestnet = defineChain({
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

export const publicClient = createPublicClient({
  chain: storyTestnet,
  transport: http(),
});
