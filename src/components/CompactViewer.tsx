import React from 'react';
import { Cpu, ShieldCheck, FileCode, Copy, Check, Sparkles } from 'lucide-react';

export const CompactViewer: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const compactSource = `// Midnight Network Compact Smart Contract
// Contract: SealedBidAuction
// Feature: Sealed-Bid Auction with Selective Disclosure & Zero-Knowledge Verification
// Mission: Half light, half shadow — Private bids with publicly verifiable settlement

pragma language_version >= 0.1.0;

import CompactStandardLibrary;

export ledger SealedBidAuction {
  // PUBLIC STATE (Visible on-chain to all observers)
  public seller: Bytes<32>;
  public assetId: Bytes<32>;
  public reservePrice: Uint<64>;
  public auctionDeadline: Uint<64>;
  public isFinalized: Boolean;
  public highestBidCommitment: Bytes<32>;
  public winningBidderCommitment: Bytes<32>;
  public totalBidsCount: Uint<32>;

  constructor(
    _seller: Bytes<32>,
    _assetId: Bytes<32>,
    _reservePrice: Uint<64>,
    _auctionDeadline: Uint<64>
  ) {
    seller = _seller;
    assetId = _assetId;
    reservePrice = _reservePrice;
    auctionDeadline = _auctionDeadline;
    isFinalized = false;
    highestBidCommitment = pad(32, "");
    winningBidderCommitment = pad(32, "");
    totalBidsCount = 0;
  }

  // CIRCUIT 1: Submit Private Bid Commitment
  // Private input: bidAmount (Uint64), secretNonce (Bytes32)
  // Public output: bidCommitment (Poseidon hash of bidAmount + secretNonce + bidderPk)
  export circuit submitBid(
    private bidAmount: Uint<64>,
    private secretNonce: Bytes<32>,
    public bidderPk: Bytes<32>,
    public timestamp: Uint<64>
  ): Bytes<32> {
    assert(timestamp <= auctionDeadline, "Auction has expired");
    assert(!isFinalized, "Auction is already finalized");

    // ZK Constraint: Bid must satisfy minimum reserve price without revealing exact amount
    assert(bidAmount >= reservePrice, "Bid amount must be at least the reserve price");

    // Compute cryptographic commitment using Poseidon ZK hash
    const commitment: Bytes<32> = poseidonHash3(
      u64ToBytes(bidAmount),
      secretNonce,
      bidderPk
    );

    totalBidsCount = totalBidsCount + 1;
    return commitment;
  }

  // CIRCUIT 2: Selective Disclosure - Verify Winner
  export circuit revealWinningBid(
    private winningBidAmount: Uint<64>,
    private winningNonce: Bytes<32>,
    public claimedCommitment: Bytes<32>,
    public bidderPk: Bytes<32>
  ): Boolean {
    assert(isFinalized, "Auction must be finalized before revealing");

    const recomputedCommitment: Bytes<32> = poseidonHash3(
      u64ToBytes(winningBidAmount),
      winningNonce,
      bidderPk
    );

    assert(recomputedCommitment == claimedCommitment, "ZK Proof mismatch: Private bid does not match public commitment");
    assert(claimedCommitment == highestBidCommitment, "Submitted proof does not match highest winning commitment");

    return true;
  }
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(compactSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Midnight Compact Smart Contract Language</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            SealedBidAuction.compact Specification
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Native smart contract code defining public ledger state, private off-chain state circuits, and ZK assertions.
          </p>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center space-x-2 px-4 py-2.5 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all shadow-sm"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
          <span>{copied ? 'Copied Compact Code' : 'Copy Contract Source'}</span>
        </button>
      </div>

      {/* Code Block */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs font-mono">
          <div className="flex items-center space-x-2 text-slate-400">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>contracts/SealedBidAuction.compact</span>
          </div>
          <span className="text-purple-400 text-[10px]">Midnight Compact v0.1.0</span>
        </div>

        <pre className="p-6 bg-[#06070B] text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
          <code>{compactSource}</code>
        </pre>
      </div>

    </div>
  );
};
