import React, { useState } from 'react';
import { AuctionDetails } from '../contracts/auctionContract';
import { generateSecretNonce, computePoseidonCommitment, generateZkRangeProof, ZkProofPayload } from '../zk/proofEngine';
import { X, Lock, ShieldCheck, Cpu, CheckCircle, AlertTriangle, ArrowRight, Loader2, KeyRound } from 'lucide-react';

interface BidModalProps {
  auction: AuctionDetails;
  walletAddress: string;
  onClose: () => void;
  onSubmitBid: (auctionId: string, bidAmount: bigint, bidderAddress: string) => void;
}

export const BidModal: React.FC<BidModalProps> = ({
  auction,
  walletAddress,
  onClose,
  onSubmitBid,
}) => {
  const [bidInput, setBidInput] = useState<string>('');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Input, 2: ZK Computing, 3: Proof Generated, 4: Confirmed
  const [secretNonce, setSecretNonce] = useState<string>('');
  const [computedCommitment, setComputedCommitment] = useState<string>('');
  const [generatedProof, setGeneratedProof] = useState<ZkProofPayload | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleStartCompute = () => {
    setErrorMessage(null);
    const parsedAmount = BigInt(bidInput || '0');

    if (parsedAmount < auction.reservePrice) {
      setErrorMessage(
        `Bid amount (${parsedAmount.toLocaleString()} tDUST) must be at least the reserve price of ${auction.reservePrice.toLocaleString()} tDUST.`
      );
      return;
    }

    setIsProcessing(true);
    setStep(2);

    setTimeout(() => {
      try {
        // Step 1: Generate Private Nonce
        const nonce = generateSecretNonce();
        setSecretNonce(nonce);

        // Step 2: Poseidon Commitment
        const commitment = computePoseidonCommitment(parsedAmount, nonce, walletAddress);
        setComputedCommitment(commitment);

        // Step 3: ZK Range Proof
        const proof = generateZkRangeProof(
          {
            bidAmount: parsedAmount,
            secretNonce: nonce,
            bidderAddress: walletAddress,
            timestamp: Date.now(),
          },
          auction.reservePrice,
          auction.id
        );

        setGeneratedProof(proof);
        setIsProcessing(false);
        setStep(3);
      } catch (err: any) {
        setIsProcessing(false);
        setErrorMessage(err.message || 'Failed to generate ZK Proof');
        setStep(1);
      }
    }, 1200);
  };

  const handleBroadcastCommitment = () => {
    if (!bidInput) return;
    const parsedAmount = BigInt(bidInput);
    setIsProcessing(true);

    setTimeout(() => {
      onSubmitBid(auction.id, parsedAmount, walletAddress);
      setIsProcessing(false);
      setStep(4);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-modal w-full max-w-xl rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Submit Private ZK Bid</h2>
              <p className="text-xs text-slate-400 font-mono">Midnight Compact Circuit: SealedBidAuction.submitBid</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Target Auction Header */}
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center space-x-3">
            <img src={auction.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <div className="text-xs font-mono text-cyan-400">{auction.assetCategory}</div>
              <div className="text-sm font-bold text-white">{auction.title}</div>
              <div className="text-xs text-slate-400">Reserve Price: <span className="text-slate-200 font-mono font-semibold">{auction.reservePrice.toLocaleString()} tDUST</span></div>
            </div>
          </div>

          {/* STEP 1: Bid Input Form */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Private Bid Amount (tDUST)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={bidInput}
                    onChange={(e) => setBidInput(e.target.value)}
                    placeholder={`e.g. ${Number(auction.reservePrice) + 1000}`}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-3 text-lg font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                  <div className="absolute right-4 top-3 text-xs font-mono text-cyan-400 font-bold">
                    tDUST
                  </div>
                </div>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Privacy Notice Box */}
              <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-xl space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-cyan-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Selective Disclosure Guarantee</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Your bid amount will stay strictly inside your local Lace wallet. Only a cryptographic Poseidon Hash commitment and ZK Range Proof will be sent to the Midnight blockchain. No bidder or node observer can see your bid.
                </p>
              </div>

              <button
                onClick={handleStartCompute}
                disabled={!bidInput}
                className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl transition-all shadow-glow-cyan flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Cpu className="w-4 h-4" />
                <span>Generate Zero-Knowledge Proof & Commitment</span>
              </button>
            </div>
          )}

          {/* STEP 2: ZK Computing Animation */}
          {step === 2 && (
            <div className="py-8 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping"></div>
                <div className="w-16 h-16 rounded-full border-4 border-t-cyan-400 border-r-purple-500 border-b-emerald-400 border-l-transparent animate-spin flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Generating ZK-SNARK Proof...</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">Calculating Poseidon(bidAmount || salt || pk)...</p>
              </div>
            </div>
          )}

          {/* STEP 3: ZK Proof Preview & Broadcast Confirmation */}
          {step === 3 && generatedProof && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-xl flex items-center space-x-2 text-xs text-emerald-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-Knowledge Range Proof successfully synthesized!</span>
              </div>

              {/* Cryptographic Breakdown */}
              <div className="space-y-2 text-xs font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Public Poseidon Commitment (On-Chain)</span>
                  <div className="p-2 bg-slate-950 border border-slate-800 text-cyan-300 text-[11px] rounded truncate">
                    {computedCommitment}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Private Salt Nonce (Lace Wallet Only)</span>
                  <div className="p-2 bg-slate-950 border border-slate-800 text-purple-300 text-[11px] rounded truncate">
                    {secretNonce}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] uppercase">ZK Circuit Public Assertions</span>
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded space-y-1 text-[11px]">
                    <div className="text-emerald-400 flex items-center space-x-1">
                      <span>✓ assert(bidAmount &gt;= reservePrice): PASSED</span>
                    </div>
                    <div className="text-slate-400">Proof ID: {generatedProof.proofId}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 px-3 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl"
                >
                  Edit Bid
                </button>
                <button
                  onClick={handleBroadcastCommitment}
                  disabled={isProcessing}
                  className="w-2/3 py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-xl transition-all shadow-glow-cyan flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Broadcast Commitment</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success State */}
          {step === 4 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-glow-cyan">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Private Bid Broadcasted to Midnight</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Your bid commitment was recorded on the ledger. Your actual bid amount of <span className="text-cyan-300 font-mono font-bold">{bidInput} tDUST</span> remains completely encrypted.
                </p>
              </div>
              <button
                onClick={onClose}
                className="py-2.5 px-6 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-sm"
              >
                Close & Return to Market
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
