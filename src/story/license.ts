import { Address } from "viem";
import { StoryClient, AttachLicenseTermsResponse } from "@story-protocol/core-sdk";

/**
 * Attaches a license to an IP asset.
 *
 * @param client - The StoryClient instance used to interact with the Story Protocol.
 * @param ipId - The address of the IP asset to which the license will be attached.
 * @param termId - The ID of the license terms to be attached.
 * @param template - Optional. The address of the license template.
 * @returns A Promise that resolves to an AttachLicenseTermsResponse object containing the transaction details.
 *
 * @example
 * ```typescript
 * const client = getStoryClient(account);
 * const ipId = "0x963BBe38f76F60bA682b62B91965AdbEbD2c575F";
 * const termId = 152;
 * const template = "0x91f6F05B08c16769d3c85867548615d270C42fC7";
 * const response = await attachLicense(client, ipId, termId, template);
 * ```
 */
const attachLicense = async (
  client: StoryClient,
  ipId: Address,
  termId: number,
  template?: Address
): Promise<AttachLicenseTermsResponse> => {
  const response = await client.license.attachLicenseTerms({
    ipId: ipId,
    licenseTemplate: template,
    licenseTermsId: termId,
    txOptions: { waitForTransaction: true },
  });
  return response;
};

export { attachLicense };
