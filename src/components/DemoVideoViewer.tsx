import React from 'react';
import { Play, Video, CheckCircle2, Share2, FileCode, Shield, ExternalLink, Sparkles } from 'lucide-react';

export const DemoVideoViewer: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 rounded-full text-xs text-cyan-300 font-mono mb-3">
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              <span>Level 4 - Waxing Gibbous Demo Video Walkthrough</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ShadowBid MVP Demonstration Script & Guide
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Complete 2-minute video presentation guide demonstrating private ZK bid commitments, Compact smart contract verification on Midnight Preprod, and selective disclosure inspectability.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://x.com/ShadowBid_ZK"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>@ShadowBid_ZK Profile</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Video Mockup Container */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-2xl">
        <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-slate-900/80 to-purple-950/30"></div>
          
          {/* Grid Overlay Effect */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 text-center px-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-cyan-500/20 border-2 border-cyan-400/80 flex items-center justify-center shadow-glow-cyan transform transition-transform group-hover:scale-110 cursor-pointer">
              <Play className="w-10 h-10 text-cyan-300 fill-cyan-400/30 ml-1" />
            </div>

            <h3 className="text-xl font-bold text-white mt-5 tracking-tight">
              ShadowBid Level 4 MVP Video Walkthrough
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Length: 02:15 • Resolution: 1080p60 • Verified Preprod Demo
            </p>

            <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-xs font-mono text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Preprod Contract Address: 0x02008f91a2b4e6c8d...b4c6</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Video Scenes Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>Demo Video Scene-by-Scene Script (120 Seconds)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 rounded">
                00:00 - 00:25 (Scene 1)
              </span>
              <span className="text-xs text-slate-400 font-medium">Problem Statement & Setup</span>
            </div>
            <h4 className="text-sm font-bold text-white">The Public Bidding Privacy Problem</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Highlighting how public blockchains expose bids, causing frontrunning and MEV exploitation. Intro to ShadowBid on Midnight Preprod with zero-knowledge selective disclosure.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-purple-950 text-purple-400 border border-purple-800 rounded">
                00:25 - 00:55 (Scene 2)
              </span>
              <span className="text-xs text-slate-400 font-medium">Poseidon ZK Commitment</span>
            </div>
            <h4 className="text-sm font-bold text-white">Submitting a Private Bid</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Demonstrating bid input in the dApp modal. Generating Poseidon commitments, range proofs (bid &ge; reserve), and Lace wallet signing without exposing unencrypted amounts.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                00:55 - 01:25 (Scene 3)
              </span>
              <span className="text-xs text-slate-400 font-medium">Preprod Verification</span>
            </div>
            <h4 className="text-sm font-bold text-white">Compact Smart Contract Execution</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspecting the live contract on Midnight Preprod Explorer (`0x0200...b4c6`). Verifying public state commitments vs. local zero-knowledge wallet state.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800 rounded">
                01:25 - 02:15 (Scene 4)
              </span>
              <span className="text-xs text-slate-400 font-medium">Settlement & Launch</span>
            </div>
            <h4 className="text-sm font-bold text-white">Auction Finalization & X Profile Launch</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Finalizing the auction with winning proof verification. Showing the GitHub Actions CI/CD pipeline passing and the official @ShadowBid_ZK product profile on X.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
