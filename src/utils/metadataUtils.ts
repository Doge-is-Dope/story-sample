import { createHash } from "crypto";
import { upload } from "./uploadToIpfs";

const getDummyIpMetadata = (): Record<string, any> => {
  return {
    title: "Doge",
    description: "Doge is a playful wide-eyed Shiba Inu.",
    createdAt: "2013-11-01T00:00:00",
    creators: [
      {
        name: "Atsuko Sato",
        description: "The owner of Kabosu, the Shiba Inu dog. She took the iconic photograph in 2010.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCY3iSxHVUJ7oF_Ogbqx6d4opEkH3TT_1n-A&s",
        role: "Photographer and Dog Owner",
        contributionPercent: 40,
      },
      {
        name: "Reddit and Tumblr Communities",
        description: "The internet communities that spread and shaped the Doge meme through humor and creativity.",
        role: "Community Contributors",
        contributionPercent: 60,
      },
    ],
    attributes: [
      {
        key: "Breed",
        value: "Shiba Inu",
      },
      {
        key: "Color",
        value: "#d9bd62",
      },
    ],
  };
};

const getDummyNftMetadata = (): Record<string, any> => {
  return {
    name: "Doge",
    description: "Doge NFT",
    image: "ipfs://QmYE2o1jDkrHBoQK388h2NT7ckb95BMRsoVSDfcJoKq114",
    attributes: [
      {
        trait_type: "Background",
        value: "Meme Galaxy",
      },
      {
        trait_type: "Fur Color",
        value: "Silver Doge",
      },
      {
        trait_type: "Face Expression",
        value: "Wow Face",
      },
      {
        trait_type: "Eyes",
        value: "Laser Eyes",
      },
      {
        trait_type: "Headgear",
        value: "Crown",
      },
      {
        trait_type: "Clothing",
        value: "Hoodie",
      },
      {
        trait_type: "Mouth",
        value: "Tongue Out",
      },
      {
        trait_type: "Special Item",
        value: "Rocket",
      },
    ],
  };
};

const hashMetadata = (metadata: Record<string, any>): string => {
  return createHash("sha256").update(JSON.stringify(metadata)).digest("hex");
};

/**
 * Get the dummy metadata for the NFT collection.
 * @returns The IPFS hashes and hashes of the metadata.
 */
export const getMetadata = async (): Promise<{
  ipIpfsHash: string;
  ipHash: string;
  nftIpfsHash: string;
  nftHash: string;
}> => {
  const ipMetadata = getDummyIpMetadata();
  const ipIpfsHash = await upload(ipMetadata);
  const ipHash = hashMetadata(ipMetadata);

  const nftMetadata = getDummyNftMetadata();
  const nftIpfsHash = await upload(nftMetadata);
  const nftHash = hashMetadata(nftMetadata);
  return { ipIpfsHash, ipHash, nftIpfsHash, nftHash };
};
