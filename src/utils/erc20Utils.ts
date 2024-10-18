import { Account, Address, createWalletClient, http } from "viem";
import { ACCOUNT_TYPE, getDummyAccount } from "./account";
import { erc20Abi } from "./erc20Abi";
import { publicClient, storyTestnet } from "./utils";
import { SUSD_ADDRESS } from "./constants";

export async function getBalance(token: Address, owner: Address): Promise<BigInt> {
  const balance = await publicClient.readContract({
    address: token as Address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [owner],
  });
  return balance as BigInt;
}

export async function getAllowance(token: Address, owner: Address, spender: Address): Promise<BigInt> {
  const allowance = await publicClient.readContract({
    address: token as Address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [owner, spender],
  });
  return allowance as BigInt;
}

export async function approve(account: Account, token: Address, spender: Address, amount: BigInt): Promise<string> {
  const walletClient = createWalletClient({
    account: account,
    chain: storyTestnet,
    transport: http(),
  });

  const hash = await walletClient.writeContract({
    address: token,
    abi: erc20Abi,
    functionName: "approve",
    args: [spender, amount],
  });

  return hash;
}

// Only used for minting SUSD.
export async function mintSUSD(account: Account, amount: BigInt): Promise<string> {
  const walletClient = createWalletClient({
    account: account,
    chain: storyTestnet,
    transport: http(),
  });

  const { request } = await publicClient.simulateContract({
    address: SUSD_ADDRESS,
    abi: erc20Abi,
    functionName: "mint",
    args: [account.address, amount],
  });

  const hash = await walletClient.writeContract(request);
  return hash;
}
