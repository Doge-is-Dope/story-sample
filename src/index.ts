import "dotenv/config";
import { getDummyAccount, ACCOUNT_TYPE } from "./utils/account.js";
import { getStoryClient } from "./story/client.js";

const account = getDummyAccount(ACCOUNT_TYPE.SEAFOOD);
const owner = account.address === "0x9fD042a18E90Ce326073fA70F111DC9D798D9a52" ? "Clement" : "Seafood";
console.log(`=========== Account: ${owner} ============`);

const client = getStoryClient(account);
