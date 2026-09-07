import React from 'react';
import { AuctionDetails } from '../contracts/auctionContract';
import { Lock, Shield, Clock, Hash, Trophy, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface AuctionCardProps {
  auction: AuctionDetails;
  onOpenBidModal: (auction: AuctionDetails) => void;
  onInspectPrivacy: (auction: AuctionDetails) => void;
  onFinalizeAuction: (auctionId: string) => void;
  userBidsCount: number;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({
  auction,
  onOpenBidModal,
  onInspectPrivacy,
  onFinalizeAuction,
  userBidsCount,
}) => {
  const isClosed = auction.isFinalized || auction.status === 'CLOSED';
  
  // Format deadline countdown
  const timeRemainingMs = Math.max(0, auction.auctionDeadline - Date.now());
  const hoursLeft = Math.floor(timeRemainingMs / (1000 * 60 * 60));
  const daysLeft = Math.floor(hoursLeft / 24);

  return (
    <div className="glass-panel-interactive rounded-2xl overflow-hidden flex flex-col h-full border border-slate-800/80 hover:border-cyan-500/40 group">
      
      {/* Image Thumbnail & Category */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-[#0B0D14]/40 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-slate-950/80 text-cyan-300 backdrop-blur-md rounded-lg border border-cyan-500/30 shadow-sm flex items-center space-x-1">
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>{auction.assetCategory}</span>
          </span>

          <span
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg backdrop-blur-md flex items-center space-x-1 ${
              isClosed
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isClosed ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`}></span>
            <span>{isClosed ? 'Finalized' : 'Private Bidding Active'}</span>
          </span>
        </div>

        {/* User Has Bid Tag */}
        {userBidsCount > 0 && (
          <div className="absolute bottom-3 left-3 bg-purple-950/90 text-purple-300 border border-purple-500/40 text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center space-x-1 backdrop-blur-md">
            <Lock className="w-3 h-3 text-purple-400" />
            <span>You hold {userBidsCount} private bid{userBidsCount > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Main Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors line-clamp-1">
            {auction.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {auction.description}
          </p>
        </div>

        {/* On-Chain Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Reserve Price</span>
            <div className="font-bold text-white font-mono mt-0.5">
              {auction.reservePrice.toLocaleString()} <span className="text-[10px] text-cyan-400">tDUST</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Active Bids</span>
            <div className="font-bold text-slate-200 font-mono mt-0.5 flex items-center space-x-1">
              <Hash className="w-3 h-3 text-purple-400" />
              <span>{auction.totalBidsCount} ZK Commitments</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Current Highest</span>
            <div className="font-bold text-amber-300 font-mono mt-0.5 flex items-center space-x-1">
              <Lock className="w-3 h-3 text-amber-400" />
              <span className="text-[11px] truncate">{isClosed ? 'Verifiable Winner' : 'HIDDEN (ZK)'}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Time Remaining</span>
            <div className="font-semibold text-slate-300 font-mono mt-0.5 flex items-center space-x-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{isClosed ? 'Ended' : `${daysLeft}d ${hoursLeft % 24}h`}</span>
            </div>
          </div>
        </div>

        {/* Winner Highlight if Finalized */}
        {isClosed && auction.winningBidderAddress && (
          <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl">
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Verified Settlement Winner</span>
            </div>
            <div className="text-[11px] font-mono text-slate-300 truncate mt-1">
              Bidder: {auction.winningBidderAddress}
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
              Winning Hash: {auction.highestBidCommitment?.slice(0, 20)}...
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex items-center space-x-2">
          {!isClosed ? (
            <button
              onClick={() => onOpenBidModal(auction)}
              className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-xl transition-all shadow-glow-cyan transform active:scale-98"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Submit Private Bid</span>
            </button>
          ) : (
            <button
              disabled
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-500 bg-slate-900 border border-slate-800 rounded-xl cursor-not-allowed text-center"
            >
              Auction Sealed & Finalized
            </button>
          )}

          <button
            onClick={() => onInspectPrivacy(auction)}
            title="Inspect Selective Disclosure Privacy Model"
            className="p-2.5 text-slate-400 hover:text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 rounded-xl transition-all"
          >
            <Eye className="w-4 h-4" />
          </button>

          {!isClosed && (
            <button
              onClick={() => onFinalizeAuction(auction.id)}
              title="Finalize Auction and Verify Top Winner Commitment"
              className="p-2.5 text-slate-400 hover:text-amber-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/30 rounded-xl transition-all"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
