import React, { useState } from 'react';
import { ShieldCheck, Wallet, Lock, Sparkles, CheckCircle2, ChevronDown, KeyRound, Cpu, Video, Share2, ExternalLink } from 'lucide-react';

interface HeaderProps {
  walletConnected: boolean;
  walletAddress: string;
  walletBalance: string;
  onConnectWallet: () => void;
  activeTab: 'auctions' | 'inspector' | 'tests' | 'compact' | 'demo';
  setActiveTab: (tab: 'auctions' | 'inspector' | 'tests' | 'compact' | 'demo') => void;
  onOpenCreateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  walletConnected,
  walletAddress,
  walletBalance,
  onConnectWallet,
  activeTab,
  setActiveTab,
  onOpenCreateModal,
}) => {
  const [showWalletDetails, setShowWalletDetails] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#06070B]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('auctions')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-700 p-0.5 shadow-glow-cyan">
              <div className="w-full h-full bg-[#06070B] rounded-[10px] flex items-center justify-center">
                <Lock className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  Shadow<span className="text-gradient-cyan-purple">Bid</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 rounded-full">
                  Level 4 • Waxing Gibbous
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Private Sealed-Bid Auction • Preprod: 0x0200...b4c6</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('auctions')}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'auctions'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              Auctions Market
            </button>

            <button
              onClick={() => setActiveTab('inspector')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'inspector'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>Privacy Inspector</span>
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'tests'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Test Runner (4/4)</span>
            </button>

            <button
              onClick={() => setActiveTab('compact')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'compact'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Compact Contract</span>
            </button>

            <button
              onClick={() => setActiveTab('demo')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'demo'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>MVP Demo Video</span>
            </button>
          </nav>

          {/* Action Buttons & X Profile & Wallet Connection */}
          <div className="flex items-center space-x-2.5">
            
            <a
              href="https://x.com/ShadowBid_ZK"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
              title="Official Product Profile on X"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>@ShadowBid_ZK</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              onClick={onOpenCreateModal}
              className="hidden lg:flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Create Auction</span>
            </button>

            {/* Wallet Button */}
            {walletConnected ? (
              <div className="relative">
                <button
                  onClick={() => setShowWalletDetails(!showWalletDetails)}
                  className="flex items-center space-x-2.5 px-3.5 py-2 text-xs font-mono font-medium text-slate-200 bg-slate-900/90 border border-cyan-500/40 rounded-xl hover:border-cyan-400 transition-all shadow-glow-cyan"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                  <span className="px-1.5 py-0.5 text-[10px] bg-cyan-950 text-cyan-300 rounded border border-cyan-800">
                    Lace Wallet
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {showWalletDetails && (
                  <div className="absolute right-0 mt-2 w-64 glass-modal rounded-xl p-4 shadow-2xl z-50 border border-slate-800">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold text-white">Midnight Lace Wallet</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Preprod</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px]">Private Balance</span>
                        <div className="text-lg font-bold text-cyan-300 font-mono">{walletBalance} tDUST</div>
                      </div>

                      <div>
                        <span className="text-slate-400 text-[11px]">Selective Disclosure Key</span>
                        <div className="text-[11px] font-mono text-slate-300 truncate bg-slate-950 p-1.5 rounded border border-slate-800">
                          {walletAddress}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                className="flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-xl hover:shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Wallet className="w-4 h-4 text-slate-950" />
                <span>Connect Lace Wallet</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
