import React, { useState } from 'react';
import { X, Sparkles, Shield, DollarSign, Image as ImageIcon, FileText, CheckCircle2 } from 'lucide-react';

interface CreateAuctionModalProps {
  sellerAddress: string;
  onClose: () => void;
  onCreate: (params: {
    title: string;
    description: string;
    assetName: string;
    assetCategory: string;
    imageUrl: string;
    sellerAddress: string;
    reservePrice: bigint;
    durationDays: number;
  }) => void;
}

export const CreateAuctionModal: React.FC<CreateAuctionModalProps> = ({
  sellerAddress,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assetCategory, setAssetCategory] = useState('Privacy Assets');
  const [reservePrice, setReservePrice] = useState('5000');
  const [durationDays, setDurationDays] = useState('3');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reservePrice) return;

    onCreate({
      title,
      description: description || 'Encrypted Midnight asset with selective disclosure rights.',
      assetName: title,
      assetCategory,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      sellerAddress,
      reservePrice: BigInt(reservePrice),
      durationDays: parseInt(durationDays) || 3,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-modal w-full max-w-lg rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Deploy Private Auction</h2>
              <p className="text-xs text-slate-400 font-mono">Midnight Contract Deployer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">
              Auction Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Midnight Zero-Knowledge Pass #108"
              className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-white font-sans text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Asset Category
              </label>
              <select
                value={assetCategory}
                onChange={(e) => setAssetCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 font-sans focus:outline-none"
              >
                <option value="Privacy Assets">Privacy Assets</option>
                <option value="RWA (Real World Asset)">RWA (Real World Asset)</option>
                <option value="Confidential Credentials">Confidential Credentials</option>
                <option value="ZK Governance Pass">ZK Governance Pass</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Reserve Price (tDUST)
              </label>
              <input
                type="number"
                required
                value={reservePrice}
                onChange={(e) => setReservePrice(e.target.value)}
                placeholder="5000"
                className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2.5 text-white font-mono text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe private item details and selective disclosure rights..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3.5 py-2 text-white font-sans focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">
              Cover Image URL (Optional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 px-4 text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-300 hover:to-indigo-300 rounded-xl shadow-glow-purple"
            >
              Deploy Contract to Midnight
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
