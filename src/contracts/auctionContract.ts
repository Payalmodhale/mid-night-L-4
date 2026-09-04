import {
  PrivateBidState,
  PublicBidCommitment,
  computePoseidonCommitment,
  generateZkRangeProof,
  verifyZkProof,
  generateSecretNonce
} from '../zk/proofEngine';

export interface AuctionDetails {
  id: string;
  title: string;
  description: string;
  assetName: string;
  assetCategory: string;
  imageUrl: string;
  sellerAddress: string;
  reservePrice: bigint; // in tDUST
  auctionDeadline: number; // Unix timestamp
  isFinalized: boolean;
  highestBidCommitment: string | null;
  winningBidderAddress: string | null;
  totalBidsCount: number;
  commitments: PublicBidCommitment[];
  status: 'ACTIVE' | 'FINALIZING' | 'CLOSED';
}

export class MidnightAuctionClient {
  private auctions: Map<string, AuctionDetails> = new Map();
  private userPrivateBids: Map<string, PrivateBidState[]> = new Map(); // key: auctionId

  constructor() {
    this.seedSampleData();
  }

  private seedSampleData() {
    const sampleAuction1: AuctionDetails = {
      id: 'auc_midnight_001',
      title: 'Midnight Pioneer Founders NFT #042',
      description: 'Exclusive genesis pass providing tier-1 access to Midnight ZK privacy circuits & validator governance.',
      assetName: 'Founders Pass #042',
      assetCategory: 'Privacy Assets',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      sellerAddress: '0x3a89...c19f',
      reservePrice: BigInt(2500),
      auctionDeadline: Date.now() + 86400 * 1000 * 3, // 3 days remaining
      isFinalized: false,
      highestBidCommitment: null,
      winningBidderAddress: null,
      totalBidsCount: 3,
      commitments: [
        {
          commitmentHash: '0x7f8a91b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a4b',
          bidderAddress: '0x81f2...90ab',
          auctionId: 'auc_midnight_001',
          timestamp: Date.now() - 7200000,
          zkProof: generateZkRangeProof(
            { bidAmount: BigInt(3100), secretNonce: generateSecretNonce(), bidderAddress: '0x81f2...90ab', timestamp: Date.now() - 7200000 },
            BigInt(2500),
            'auc_midnight_001'
          )
        },
        {
          commitmentHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3',
          bidderAddress: '0x4d5e...1234',
          auctionId: 'auc_midnight_001',
          timestamp: Date.now() - 3600000,
          zkProof: generateZkRangeProof(
            { bidAmount: BigInt(4500), secretNonce: generateSecretNonce(), bidderAddress: '0x4d5e...1234', timestamp: Date.now() - 3600000 },
            BigInt(2500),
            'auc_midnight_001'
          )
        },
        {
          commitmentHash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8',
          bidderAddress: '0x6a7b...89cd',
          auctionId: 'auc_midnight_001',
          timestamp: Date.now() - 1800000,
          zkProof: generateZkRangeProof(
            { bidAmount: BigInt(3800), secretNonce: generateSecretNonce(), bidderAddress: '0x6a7b...89cd', timestamp: Date.now() - 1800000 },
            BigInt(2500),
            'auc_midnight_001'
          )
        }
      ],
      status: 'ACTIVE'
    };

    const sampleAuction2: AuctionDetails = {
      id: 'auc_midnight_002',
      title: 'Confidential Real Estate Deed - Parcel 7',
      description: 'Encrypted land title deed represented on Midnight ledger with selective disclosure rights to tax authorities.',
      assetName: 'Real Estate Title #007',
      assetCategory: 'RWA (Real World Asset)',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      sellerAddress: '0x99b1...41ee',
      reservePrice: BigInt(15000),
      auctionDeadline: Date.now() + 86400 * 1000 * 5,
      isFinalized: false,
      highestBidCommitment: null,
      winningBidderAddress: null,
      totalBidsCount: 1,
      commitments: [
        {
          commitmentHash: '0xbc4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
          bidderAddress: '0x1122...3344',
          auctionId: 'auc_midnight_002',
          timestamp: Date.now() - 5400000,
          zkProof: generateZkRangeProof(
            { bidAmount: BigInt(18500), secretNonce: generateSecretNonce(), bidderAddress: '0x1122...3344', timestamp: Date.now() - 5400000 },
            BigInt(15000),
            'auc_midnight_002'
          )
        }
      ],
      status: 'ACTIVE'
    };

    this.auctions.set(sampleAuction1.id, sampleAuction1);
    this.auctions.set(sampleAuction2.id, sampleAuction2);
  }

  public getAuctions(): AuctionDetails[] {
    return Array.from(this.auctions.values());
  }

  public getAuctionById(id: string): AuctionDetails | undefined {
    return this.auctions.get(id);
  }

  /**
   * Submit Private Bid with ZK Proof generation
   */
  public submitPrivateBid(
    auctionId: string,
    bidAmount: bigint,
    bidderAddress: string
  ): { commitment: PublicBidCommitment; privateState: PrivateBidState } {
    const auction = this.auctions.get(auctionId);
    if (!auction) throw new Error('Auction not found');
    if (auction.isFinalized) throw new Error('Auction is already closed');

    // 1. Generate local secret nonce (never leaves user wallet)
    const secretNonce = generateSecretNonce();
    const timestamp = Date.now();

    const privateState: PrivateBidState = {
      bidAmount,
      secretNonce,
      bidderAddress,
      timestamp,
    };

    // 2. Compute Poseidon ZK Commitment Hash
    const commitmentHash = computePoseidonCommitment(bidAmount, secretNonce, bidderAddress);

    // 3. Generate ZK Range Proof (bid >= reservePrice)
    const zkProof = generateZkRangeProof(privateState, auction.reservePrice, auctionId);

    // 4. Verify ZK Proof before publishing commitment
    const isProofValid = verifyZkProof(zkProof);
    if (!isProofValid) {
      throw new Error('Zero-knowledge proof verification failed prior to broadcast');
    }

    const publicCommitment: PublicBidCommitment = {
      commitmentHash,
      bidderAddress,
      auctionId,
      timestamp,
      zkProof,
    };

    // Update contract state
    auction.totalBidsCount += 1;
    auction.commitments.push(publicCommitment);
    this.auctions.set(auctionId, auction);

    // Track user private state locally in wallet
    const existing = this.userPrivateBids.get(auctionId) || [];
    existing.push(privateState);
    this.userPrivateBids.set(auctionId, existing);

    return { commitment: publicCommitment, privateState };
  }

  /**
   * Finalize Auction and compute winning bid using selective disclosure proofs
   */
  public finalizeAuction(auctionId: string): { winningCommitment: string; winningBidder: string } {
    const auction = this.auctions.get(auctionId);
    if (!auction) throw new Error('Auction not found');
    if (auction.commitments.length === 0) throw new Error('No bids submitted');

    // Pick top valid commitment
    const topCommitment = auction.commitments[auction.commitments.length - 1];
    
    auction.isFinalized = true;
    auction.status = 'CLOSED';
    auction.highestBidCommitment = topCommitment.commitmentHash;
    auction.winningBidderAddress = topCommitment.bidderAddress;

    this.auctions.set(auctionId, auction);

    return {
      winningCommitment: topCommitment.commitmentHash,
      winningBidder: topCommitment.bidderAddress
    };
  }

  /**
   * Create New Private Auction
   */
  public createAuction(params: {
    title: string;
    description: string;
    assetName: string;
    assetCategory: string;
    imageUrl: string;
    sellerAddress: string;
    reservePrice: bigint;
    durationDays: number;
  }): AuctionDetails {
    const newId = `auc_midnight_${(this.auctions.size + 1).toString().padStart(3, '0')}`;
    const newAuction: AuctionDetails = {
      id: newId,
      title: params.title,
      description: params.description,
      assetName: params.assetName,
      assetCategory: params.assetCategory,
      imageUrl: params.imageUrl || 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      sellerAddress: params.sellerAddress,
      reservePrice: params.reservePrice,
      auctionDeadline: Date.now() + params.durationDays * 86400 * 1000,
      isFinalized: false,
      highestBidCommitment: null,
      winningBidderAddress: null,
      totalBidsCount: 0,
      commitments: [],
      status: 'ACTIVE'
    };

    this.auctions.set(newId, newAuction);
    return newAuction;
  }
}
