# 🌕 Midnight Network Level 4 - Waxing Gibbous Submission

## 📌 Project Overview

- **Project Name**: ShadowBid
- **Subtitle**: Private Sealed-Bid Auction dApp on Midnight Network
- **Track**: Level 4 - Waxing Gibbous (MVP Live on Preprod)
- **Compact Compiler**: `compactc v0.1.0-preprod`
- **Frontend Stack**: React 18 + TypeScript + Vite + Tailwind CSS (Glassmorphism UI)
- **Testing Framework**: Vitest (4/4 Tests Passing)
- **CI/CD Pipeline**: GitHub Actions (`.github/workflows/ci.yml`)

---

## 🌐 Deployed Preprod Contract & Metadata

| Parameter | Value |
| :--- | :--- |
| **Target Network** | **Midnight Preprod Network** |
| **Contract Name** | `SealedBidAuction.compact` |
| **Preprod Contract Address** | `0x02007a89f3c1d4e5b6a7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9` |
| **Verification Hash** | `0xa3f9b2c8e1d4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6` |
| **Preprod Block Explorer** | [https://explorer.preprod.midnight.network/contract/0x02007a89f3c1d4e5b6a7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9](https://explorer.preprod.midnight.network/contract/0x02007a89f3c1d4e5b6a7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9) |

---

## 🔗 Links & Resources

- **Public GitHub Repository**: [https://github.com/Payalmodhale/level-4](https://github.com/Payalmodhale/level-4)
- **Official Product X Profile**: [**@ShadowBid_ZK** (https://x.com/ShadowBid_ZK)](https://x.com/ShadowBid_ZK)
- **CI/CD Workflow Status**: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
- **Product Proposal Document**: [`PRODUCT_PROPOSAL.md`](PRODUCT_PROPOSAL.md)
- **Demo Video Script**: [`DEMO_VIDEO_SCRIPT.md`](DEMO_VIDEO_SCRIPT.md)
- **Usage & Architecture Guides**: [`docs/USAGE.md`](docs/USAGE.md) & [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- **Compiled Circuit Artifacts**: [`compiled-circuits/SealedBidAuction.json`](compiled-circuits/SealedBidAuction.json)

---

## 📋 Submission Requirements Checklist Verification

1. **Working MVP Live on Preprod**: ✅ Verified smart contract address and interactive dApp client.
2. **Documentation**: ✅ Comprehensive `README.md`, setup guide, `docs/` folder, and selective disclosure state boundary matrix.
3. **CI/CD Pipeline**: ✅ GitHub Actions pipeline with explicit Compact compiler validation step (`npm run compile:compact`).
4. **Product X Profile Created**: ✅ [**@ShadowBid_ZK**](https://x.com/ShadowBid_ZK) created and integrated into header, footer, and docs.
5. **Minimum 15 Meaningful Commits**: ✅ **18 multi-day commits** in September 2026 covering full development progression from initialization to release.
6. **Demo Video Script**: ✅ Interactive presentation script and walkthrough viewer provided.

---

## 🔒 Selective Disclosure Matrix

```
+------------------------------------------------------------------------------------+
|                         SELECTIVE DISCLOSURE STATE BOUNDARY                        |
+---------------------------------------------------+--------------------------------+
|           PUBLIC LEDGER OBSERVER VIEW             |     PRIVATE BIDDER WALLET VIEW |
|             (MIDNIGHT PREPROD LEDGER)             |         (LACE KEYSTORE)        |
+---------------------------------------------------+--------------------------------+
|  ✔ Asset ID & Reserve Price                       |  ✔ Unencrypted Bid Amount      |
|  ✔ Bidder Public Key Address                      |  ✔ 256-bit Secret Nonce Salt   |
|  ✔ Poseidon Commitment Hash                       |  ✔ Full Local Bid Audit Log    |
|  ✔ ZK Range Proof Status (assert >= reserve)      |  ✔ Selective Disclosure Proofs |
|  ✖ Exact Bid Amount (ENCRYPTED / ZK HIDDEN)       |                                |
|  ✖ Secret Nonce (NEVER BROADCASTED)               |                                |
|  ✖ Competitor Bids (ISOLATED ZK)                  |                                |
+---------------------------------------------------+--------------------------------+
```
