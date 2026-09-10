# ShadowBid Usage & User Guide

Welcome to **ShadowBid**, the privacy-focused decentralized sealed-bid auction platform built on the **Midnight Preprod Network**. This guide explains step-by-step how to interact with the application, participate in private auctions, generate Zero-Knowledge (ZK) proofs, and verify selective disclosure settlement.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Browser**: Chrome, Brave, Edge, or Firefox
- **Wallet**: Lace Wallet (or simulated Lace Keystore built into the dApp UI)

### 2. Running Locally

```bash
# Clone the repository
git clone https://github.com/Payalmodhale/level-4.git
cd level-4

# Install dependencies
npm install

# Compile Compact smart contract & ZK circuits
npm run compile:compact

# Run Vitest test suite
npm test

# Launch local development web server
npm run dev
```

Open your browser to `http://localhost:5173`.

---

## 💡 How to Use ShadowBid (Step-by-Step)

### Step 1: Connect Your Midnight Wallet
1. Click **Connect Wallet** in the top right header navigation.
2. Select **Midnight Lace Wallet Simulator** (or connect your browser extension).
3. Confirm connection. Your address (`0x7a89...3f4a`) and test DUST balance (`10,000 tDUST`) will be displayed.

---

### Step 2: Browse Active Auctions
1. On the main **Auctions** dashboard, browse available sealed-bid auctions.
2. Each auction card displays:
   - **Asset Name & ID**
   - **Seller Public Key**
   - **Reserve Price** (minimum bid threshold)
   - **Auction Deadline**
   - **Total Bids Tally** (number of cryptographic commitments submitted)

---

### Step 3: Submit a Private Sealed Bid
1. Click **Submit Private Bid** on any active auction card.
2. Enter your **Bid Amount** (must be greater than or equal to the Reserve Price).
3. The dApp client will automatically:
   - Generate a 256-bit **Secret Salt Nonce** locally inside your wallet keystore.
   - Compute a **Poseidon Commitment Hash**: `Poseidon(bidAmount, secretNonce, bidderPk)`.
   - Synthesize a **Zero-Knowledge Range Proof** proving that `bidAmount >= reservePrice` without disclosing `bidAmount` to observers.
4. Click **Confirm & Sign Transaction**.
5. The commitment hash and ZK proof will be broadcast to the **Midnight Preprod Network**.

---

### Step 4: Inspect Selective Disclosure Bounds
1. Click the **Privacy Inspector** tab in the navigation bar.
2. Compare side-by-side:
   - **Public Observer View** (Midnight Preprod Ledger): Only sees commitment hash, reserve price bound, public key, and valid proof status.
   - **Private Wallet View** (Local Lace Keystore): Holds unencrypted bid amount, secret nonce, and local audit trail.

---

### Step 5: Auction Finalization & Settlement
1. Once the auction deadline expires, the seller triggers **Finalize Auction**.
2. The winning bidder presents a **Selective Disclosure Proof** matching the top commitment hash.
3. The Midnight smart contract verifies the proof and finalizes settlement without exposing losing bid valuations.

---

## 🧪 Running Automated Tests

To execute the Vitest unit test suite covering Poseidon hash generation, ZK range proof verification, multi-bid commitment resolution, and selective disclosure settlement:

```bash
npm test
```

Or run tests directly inside the live dApp UI under the **Vitest Suite** tab!
