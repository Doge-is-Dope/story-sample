import { createHash } from "crypto";

const hashMetadata = (metadata: Record<string, any>): string => {
  return createHash("sha256").update(JSON.stringify(metadata)).digest("hex");
};

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
  };
};

const getDummyNftMetadata = (): Record<string, any> => {
  return {
    name: "Doge",
    description: "Doge NFT",
    image: "https://emerald-hidden-crayfish-297.mypinata.cloud/ipfs/QmYE2o1jDkrHBoQK388h2NT7ckb95BMRsoVSDfcJoKq114",
  };
};

export { hashMetadata, getDummyIpMetadata, getDummyNftMetadata };
