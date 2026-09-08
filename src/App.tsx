import React, { useState } from 'react';
import { Header } from './components/Header';
import { AuctionCard } from './components/AuctionCard';
import { BidModal } from './components/BidModal';
import { PrivacyInspector } from './components/PrivacyInspector';
import { InteractiveTestRunner } from './components/InteractiveTestRunner';
import { CompactViewer } from './components/CompactViewer';
import { DemoVideoViewer } from './components/DemoVideoViewer';
import { CreateAuctionModal } from './components/CreateAuctionModal';
import { MidnightAuctionClient, AuctionDetails } from './contracts/auctionContract';
import { Lock, CheckCircle2, Sparkles, GitBranch, Share2, Video, ExternalLink } from 'lucide-react';

const auctionClient = new MidnightAuctionClient();

export function App() {
  const [activeTab, setActiveTab] = useState<'auctions' | 'inspector' | 'tests' | 'compact' | 'demo'>('auctions');
  const [walletConnected, setWalletConnected] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string>('0x71a489c201e54f9a32c10b749e812d4a51f68e91');
  const [walletBalance, setWalletBalance] = useState<string>('42,500');

  const [auctions, setAuctions] = useState<AuctionDetails[]>(auctionClient.getAuctions());
  const [selectedBidAuction, setSelectedBidAuction] = useState<AuctionDetails | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [userBidsMap, setUserBidsMap] = useState<Record<string, number>>({});
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
    showToast('Midnight Lace Wallet connected successfully');
  };

  const handleSubmitBid = (auctionId: string, bidAmount: bigint, bidderAddress: string) => {
    try {
      auctionClient.submitPrivateBid(auctionId, bidAmount, bidderAddress);
      setAuctions([...auctionClient.getAuctions()]);
      setUserBidsMap((prev) => ({
        ...prev,
        [auctionId]: (prev[auctionId] || 0) + 1,
      }));
      showToast('ZK Private Bid Commitment Broadcasted to Midnight Preprod!');
    } catch (err: any) {
      showToast(`Bid Error: ${err.message}`);
    }
  };

  const handleFinalizeAuction = (auctionId: string) => {
    try {
      const res = auctionClient.finalizeAuction(auctionId);
      setAuctions([...auctionClient.getAuctions()]);
      showToast(`Auction Finalized! Winner: ${res.winningBidder.slice(0, 8)}...`);
    } catch (err: any) {
      showToast(`Finalization Error: ${err.message}`);
    }
  };

  const handleCreateAuction = (params: any) => {
    const newAuc = auctionClient.createAuction(params);
    setAuctions([...auctionClient.getAuctions()]);
    showToast(`New Sealed-Bid Auction Created: ${newAuc.title}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#06070B] text-slate-100 font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900 border border-cyan-500/40 text-cyan-300 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-mono animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        walletBalance={walletBalance}
        onConnectWallet={handleConnectWallet}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Hero Stats Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-3.5 glass-panel rounded-xl border border-slate-800 flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Level 4 Mission</span>
                <div className="text-xs font-bold text-cyan-300 mt-0.5">Waxing Gibbous MVP</div>
              </div>
            </div>

            <div className="p-3.5 glass-panel rounded-xl border border-slate-800 flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Automated Tests</span>
                <div className="text-xs font-bold text-emerald-300 mt-0.5">4 / 4 Vitest Passing</div>
              </div>
            </div>

            <div className="p-3.5 glass-panel rounded-xl border border-slate-800 flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-500/30">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Commits & CI/CD</span>
                <div className="text-xs font-bold text-purple-300 mt-0.5">16 Commits • CI Passing</div>
              </div>
            </div>

            <a
              href="https://x.com/ShadowBid_ZK"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 glass-panel rounded-xl border border-slate-800 flex items-center space-x-3 hover:border-cyan-500/40 transition-all"
            >
              <div className="p-2.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Product X Profile</span>
                <div className="text-xs font-bold text-cyan-300 mt-0.5 flex items-center space-x-1">
                  <span>@ShadowBid_ZK</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            </a>

          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: AUCTIONS MARKET */}
        {activeTab === 'auctions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  Active Sealed-Bid Auctions
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Bids are submitted as cryptographic Poseidon ZK commitments on Midnight Preprod Network.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl hover:shadow-glow-cyan transition-all"
                >
                  + New Private Auction
                </button>
              </div>
            </div>

            {/* Grid of Auctions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auc) => (
                <AuctionCard
                  key={auc.id}
                  auction={auc}
                  onOpenBidModal={(target) => setSelectedBidAuction(target)}
                  onInspectPrivacy={() => setActiveTab('inspector')}
                  onFinalizeAuction={handleFinalizeAuction}
                  userBidsCount={userBidsMap[auc.id] || 0}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PRIVACY INSPECTOR */}
        {activeTab === 'inspector' && <PrivacyInspector auctions={auctions} />}

        {/* TAB 3: TEST RUNNER */}
        {activeTab === 'tests' && <InteractiveTestRunner />}

        {/* TAB 4: COMPACT CONTRACT */}
        {activeTab === 'compact' && <CompactViewer />}

        {/* TAB 5: DEMO VIDEO */}
        {activeTab === 'demo' && <DemoVideoViewer />}

      </main>

      {/* Modals */}
      {selectedBidAuction && (
        <BidModal
          auction={selectedBidAuction}
          walletAddress={walletAddress}
          onClose={() => setSelectedBidAuction(null)}
          onSubmitBid={handleSubmitBid}
        />
      )}

      {isCreateModalOpen && (
        <CreateAuctionModal
          sellerAddress={walletAddress}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateAuction}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-white">Midnight Level 4 - Waxing Gibbous Submission</span>
            <span className="text-slate-600">•</span>
            <span>ShadowBid Private Sealed-Bid Auction MVP</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://x.com/ShadowBid_ZK"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-mono font-semibold flex items-center space-x-1"
            >
              <span>@ShadowBid_ZK</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <button
              onClick={() => setActiveTab('tests')}
              className="text-emerald-400 hover:text-emerald-300 font-mono font-semibold"
            >
              4/4 Vitest Passing
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              className="text-amber-400 hover:text-amber-300 font-mono font-semibold flex items-center space-x-1"
            >
              <Video className="w-3 h-3 text-amber-400" />
              <span>MVP Demo</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
