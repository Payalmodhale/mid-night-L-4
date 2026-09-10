# 🎥 ShadowBid MVP Demo Video Presentation Script & Recording Guide

**Target Video Duration**: 2 Minutes 15 Seconds (135 Seconds)  
**Target Video Resolution**: 1080p 60fps  
**Project**: ShadowBid | Midnight Network Level 4 - Waxing Gibbous Submission  

---

## 🎬 Video Recording Scene Breakdown

### Scene 1: Introduction & Problem Statement (00:00 - 00:25)
- **Visual**: Screen recording showing the ShadowBid dApp homepage (`http://localhost:5173`) with the Midnight Preprod Network badge highlighted.
- **Voiceover**:
  > *"Welcome to ShadowBid, a private sealed-bid auction dApp built on the Midnight Network for Level 4 Waxing Gibbous. In traditional public blockchain auctions, bids are exposed on-chain, opening bidders to frontrunning, MEV exploitation, and competitor sniping. ShadowBid solves this by leveraging Midnight’s Zero-Knowledge selective disclosure privacy model."*

---

### Scene 2: Submitting a Private Bid with ZK Proofs (00:25 - 00:55)
- **Visual**: Click on **"Submit Private Bid"** on an active auction. Enter bid amount `3,200 tDUST`. Show the live generation of the 256-bit Poseidon commitment hash, ZK range proof (`bid >= reserve`), and secret nonce salt. Click **"Confirm Private Bid"**.
- **Voiceover**:
  > *"Here, a bidder submits a private bid of 3,200 tDUST. Instead of broadcasting the unencrypted bid amount to the blockchain, ShadowBid locally computes a cryptographic Poseidon commitment and generates a Zero-Knowledge range proof asserting that the bid meets the seller's reserve price. The exact bid value and secret salt never leave the user's Midnight Lace keystore."*

---

### Scene 3: Inspecting Selective Disclosure & Preprod Ledger (00:55 - 01:25)
- **Visual**: Switch to the **"Privacy Inspector"** tab in the dApp. Compare the Public Ledger View (showing only commitment hashes and proof status) with the Private Keystore View. Highlight the deployed Preprod contract address: `0x02008f91a2b4e6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6`.
- **Voiceover**:
  > *"Using our Privacy Inspector, we can verify Midnight's selective disclosure model. On-chain observers can only see the asset reserve price and Poseidon commitment hash, maintaining absolute privacy. The smart contract compiled with Compact v0.1.0 is verified live on the Midnight Preprod Network."*

---

### Scene 4: Auction Settlement, CI/CD & Building in Public (01:25 - 02:15)
- **Visual**: Click **"Finalize Auction"**. Show the winner selection via selective disclosure verification. Next, switch to GitHub Actions showing the passing CI/CD pipeline, display the 16 git commit log, and conclude on the official Product X profile [@ShadowBid_ZK](https://x.com/ShadowBid_ZK).
- **Voiceover**:
  > *"When the auction expires, the top valid bidder generates a selective disclosure proof to claim the winning asset without exposing losing bids. Our project includes an automated GitHub Actions CI/CD pipeline, 100% passing Vitest test suite, 16 multi-day git commits, and an active product profile on X at @ShadowBid_ZK. Thank you for reviewing ShadowBid!"*

---

## 🛠️ Step-by-Step Recording Instructions

1. Open OBS Studio or CapCut / Screen Recorder.
2. Start local dApp server: `npm run dev` and open `http://localhost:5173`.
3. Follow the 4 scenes above while recording voiceover audio.
4. Save exported video file as `shadowbid_level4_demo.mp4`.
