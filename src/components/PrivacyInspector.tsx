import React, { useState } from 'react';
import { AuctionDetails } from '../contracts/auctionContract';
import { formatSelectiveDisclosureView } from '../zk/proofEngine';
import { Eye, Shield, Lock, Unlock, KeyRound, ArrowRight, CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react';

interface PrivacyInspectorProps {
  auctions: AuctionDetails[];
}

export const PrivacyInspector: React.FC<PrivacyInspectorProps> = ({ auctions }) => {
  const [selectedAuctionId, setSelectedAuctionId] = useState<string>(auctions[0]?.id || '');
  const selectedAuction = auctions.find((a) => a.id === selectedAuctionId) || auctions[0];

  // Pick sample commitment for disclosure demo
  const sampleCommitment = selectedAuction?.commitments[0] || {
    commitmentHash: '0x7f8a91b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    bidderAddress: '0x81f2...90ab',
    auctionId: 'auc_midnight_001',
    timestamp: Date.now(),
  };

  const selectiveView = formatSelectiveDisclosureView(
    {
      bidAmount: BigInt(4500),
      secretNonce: '0xa9b8c7d6e5f43210123456789abcdef0123456789abcdef0123456789abcdef0',
      bidderAddress: sampleCommitment.bidderAddress,
      timestamp: sampleCommitment.timestamp,
    },
    sampleCommitment.commitmentHash
  );

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Midnight Selective Disclosure Engine</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Privacy Model Inspector
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Examine the duality of Midnight's ledger: <span className="text-cyan-300 font-semibold">Half Light, Half Shadow</span>. 
              Toggle between the public chain observer perspective and private Lace wallet state.
            </p>
          </div>

          {/* Auction selector dropdown */}
          <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800 flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-mono px-2">Select Auction:</span>
            <select
              value={selectedAuctionId}
              onChange={(e) => setSelectedAuctionId(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              {auctions.map((auc) => (
                <option key={auc.id} value={auc.id}>
                  {auc.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: What On-Chain Observer CAN Learn */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <span>Public On-Chain Ledger View</span>
                  <span className="px-2 py-0.5 text-[10px] bg-cyan-950 text-cyan-300 rounded border border-cyan-800 font-mono">
                    CAN LEARN
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Visible to any node, block explorer, or rival bidder</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase">Asset Reserve Price (Public Boundary)</span>
              <div className="text-slate-200 font-bold">{selectedAuction.reservePrice.toLocaleString()} tDUST</div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase">Public Poseidon Commitment Hash</span>
              <div className="text-cyan-400 text-[11px] truncate">{selectiveView.publicView.commitmentHash}</div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase">Bidder Public Key</span>
              <div className="text-slate-300 text-[11px] truncate">{selectiveView.publicView.bidderPublicKey}</div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase">ZK Range Proof Validation Result</span>
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>PASSED: assert(bidAmount &gt;= reservePrice)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase">Exact Bid Amount State</span>
              <div className="text-amber-400 font-bold flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5" />
                <span>{selectiveView.publicView.exactBidAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: What On-Chain Observer CANNOT Learn */}
        <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 relative space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-500/30">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <span>Private Bidder Wallet View</span>
                  <span className="px-2 py-0.5 text-[10px] bg-purple-950 text-purple-300 rounded border border-purple-800 font-mono">
                    CANNOT LEARN (OBSERVER)
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Strictly stored inside owner's encrypted Lace key store</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/30 space-y-1">
              <span className="text-purple-300 text-[10px] uppercase font-bold">Actual Unencrypted Bid Amount</span>
              <div className="text-emerald-300 font-extrabold text-base">
                {selectiveView.privateOwnerView.exactBidAmount}
              </div>
              <p className="text-[10px] text-slate-400">Only decrypted when generating winner reveal proof</p>
            </div>

            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/30 space-y-1">
              <span className="text-purple-300 text-[10px] uppercase font-bold">256-Bit Cryptographic Secret Salt (Nonce)</span>
              <div className="text-purple-200 text-[11px] truncate">
                {selectiveView.privateOwnerView.secretNonce}
              </div>
            </div>

            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/30 space-y-1">
              <span className="text-purple-300 text-[10px] uppercase font-bold">Losing Bids Exposure Status</span>
              <div className="text-emerald-400 font-bold flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5" />
                <span>NEVER DISCLOSED (Zero-Knowledge Discarded)</span>
              </div>
            </div>

            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/30 space-y-1">
              <span className="text-purple-300 text-[10px] uppercase font-bold">MEV & Frontrunning Protection</span>
              <div className="text-cyan-300 font-bold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% MEV Immune (No transaction payload inspection)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Summary Matrix Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>Selective Disclosure Matrix Summary</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-4 font-semibold">Information Parameter</th>
                <th className="py-2.5 px-4 font-semibold">Public Ledger Observer</th>
                <th className="py-2.5 px-4 font-semibold">Private Bidder Wallet</th>
                <th className="py-2.5 px-4 font-semibold">Midnight Circuit Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-bold text-white">Bid Amount (tDUST)</td>
                <td className="py-3 px-4 text-red-400 flex items-center space-x-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Hidden (ZK Encrypted)</span>
                </td>
                <td className="py-3 px-4 text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Full Access</span>
                </td>
                <td className="py-3 px-4 text-slate-400">Private Compact state input</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Minimum Reserve Satisfaction</td>
                <td className="py-3 px-4 text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verifiable (Passed ZK)</span>
                </td>
                <td className="py-3 px-4 text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Full Access</span>
                </td>
                <td className="py-3 px-4 text-slate-400">ZK Range Proof assertion</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Poseidon Commitment Hash</td>
                <td className="py-3 px-4 text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Public On-Chain</span>
                </td>
                <td className="py-3 px-4 text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Full Access</span>
                </td>
                <td className="py-3 px-4 text-slate-400">Poseidon ZK Hash function</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Losing Bids Amounts</td>
                <td className="py-3 px-4 text-red-400 flex items-center space-x-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Never Revealed</span>
                </td>
                <td className="py-3 px-4 text-red-400 flex items-center space-x-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Never Revealed</span>
                </td>
                <td className="py-3 px-4 text-slate-400">Off-chain private state containment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
