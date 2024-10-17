# Story Protocol Sample

This is a sample project to demonstrate how to use the Story Protocol to register IP.

### Set up

1. Set up `.env` file with the following environment variables:

```bash
WALLET_PRIVATE_KEY=
PINATA_JWT=
PINATA_GATEWAY=
RPC_PROVIDER_URL=

```

2. Install dependencies

```bash
yarn install
```

3. Create a dummy NFT collection

```bash
yarn create-collection
```

4. Once the collection is created, add `DUMMY_NFT_COLLECTION_CONTRACT` to `.env`

```bash
DUMMY_NFT_COLLECTION_CONTRACT=0x...
```

### Recipes

**Register Derivative IP Asset with Commercial Terms**

```bash
# Mint and register
yarn register-deriv-noncom-simple

# Full example
yarn register-deriv-noncom
```
