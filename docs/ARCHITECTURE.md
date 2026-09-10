# ShadowBid System Architecture & Midnight Privacy Model

## 🏗️ Architectural Overview

**ShadowBid** leverages **Midnight Network's Compact Programming Language** and **Zero-Knowledge (ZK) Selective Disclosure** to achieve frontrunning-resistant, sealed-bid auctions.

```
+-----------------------------------------------------------------------------------+
|                            MIDNIGHT COMPACT dApp LAYER                            |
+------------------------------------+----------------------------------------------+
|     PUBLIC LEDGER STATE            |           PRIVATE KEYSTORE / ZK LAYER        |
|  (Midnight Preprod Consensus)      |            (Lace Wallet Keystore)            |
+------------------------------------+----------------------------------------------+
|  ✔ Asset ID & Reserve Price        |  ✔ Unencrypted Bid Amount (u64)              |
|  ✔ Bidder Public Key Address       |  ✔ Secret Salt Nonce (bytes32)               |
|  ✔ Poseidon Commitment Hash        |  ✔ R1CS ZK Proof Synthesizer                 |
|  ✔ ZK Range Proof Status           |  ✔ Selective Disclosure Verifier             |
|  ✖ Hidden Exact Bid Amounts        |                                              |
|  ✖ Hidden Secret Salt Nonces       |                                              |
+------------------------------------+----------------------------------------------+
```

---

## 🔒 Selective Disclosure State Machine

1. **Bidder Private State**:
   - `bidAmount`: Raw valuation input in tDUST.
   - `secretNonce`: Cryptographically secure 256-bit salt.
2. **Poseidon Commitment Circuit (`submitBid`)**:
   - Computes $H = \text{Poseidon}(bidAmount, secretNonce, bidderPk)$.
   - Generates Range Proof: $\text{assert}(bidAmount \ge reservePrice)$.
3. **Ledger Public Transition**:
   - Appends $H$ to `highestBidCommitment` array.
   - Increments `totalBidsCount`.
4. **Finalization & Verification (`finalizeAuction`)**:
   - Winning bidder reveals secret inputs to generate a selective disclosure proof matching top commitment hash.
   - Losing bids remain permanently zero-knowledge encrypted on-chain.
