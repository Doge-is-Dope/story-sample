import "dotenv/config";
import { ACCOUNT_TYPE, getDummyAccount } from "../utils/account";
import { approve, mintSUSD } from "../utils/erc20Utils";
import { CORE_1_1_ROYALTY_POLICY_LAP_ADDRESS, SUSD_ADDRESS } from "../utils/constants";

const main = async () => {
  const account = getDummyAccount(ACCOUNT_TYPE.WALLET);
  console.log(`Account: ${account.address}`);

  const mintTxHash = await mintSUSD(account, 5000n * 10n ** 18n);
  console.log(`SUSD minted`);
  console.log(`- Transaction Hash: ${mintTxHash}`);

  const MAX_UINT256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  const approveTxHash = await approve(account, SUSD_ADDRESS, CORE_1_1_ROYALTY_POLICY_LAP_ADDRESS, MAX_UINT256);
  console.log(`SUSD approved`);
  console.log(`- Transaction Hash: ${approveTxHash}`);
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
