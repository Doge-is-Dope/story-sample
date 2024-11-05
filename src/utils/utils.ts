import { createPublicClient, defineChain, http } from "viem";

export const storyTestnet = defineChain({
  id: 1516,
  name: "Story Odyssey Testnet",
  nativeCurrency: {
    name: "IP",
    symbol: "IP",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [process.env.RPC_PROVIDER_URL ?? "https://odyssey.storyrpc.io"] },
    public: { http: [process.env.RPC_PROVIDER_URL ?? "https://odyssey.storyrpc.io"] },
  },
});

export const publicClient = createPublicClient({
  chain: storyTestnet,
  transport: http(),
});
