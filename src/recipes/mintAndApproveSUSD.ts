import "dotenv/config";
import { ACCOUNT_TYPE, getDummyAccount } from "../utils/account";
import { approve, mintSUSD } from "../utils/erc20Utils";
import { ROYALTY_POLICY_LAP_ADDRESS, SUSD_ADDRESS } from "../utils/constants";

const main = async () => {
  const account = getDummyAccount(ACCOUNT_TYPE.WALLET);
  console.log(`Account: ${account.address}`);

  const mintTxHash = await mintSUSD(account, 5000n * 10n ** 18n);
  console.log(`SUSD minted`);
  console.log(`- Transaction Hash: ${mintTxHash}`);

  const MAX_UINT256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  const approveTxHash = await approve(account, SUSD_ADDRESS, ROYALTY_POLICY_LAP_ADDRESS, MAX_UINT256);
  console.log(`SUSD approved`);
  console.log(`- Transaction Hash: ${approveTxHash}`);
};

main();
