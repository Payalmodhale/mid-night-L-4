import { describe, it, expect, beforeEach } from 'vitest';
import { MidnightAuctionClient } from '../src/contracts/auctionContract';
import {
  computePoseidonCommitment,
  generateZkRangeProof,
  verifyZkProof,
  generateSecretNonce,
  PrivateBidState
} from '../src/zk/proofEngine';

describe('Midnight Level 3 dApp - Sealed-Bid Auction Test Suite', () => {
  let client: MidnightAuctionClient;

  beforeEach(() => {
    client = new MidnightAuctionClient();
  });

  it('Test 1: Generates valid Poseidon Bid Commitment preserving private state privacy', () => {
    const bidAmount = BigInt(5000);
    const secretNonce = generateSecretNonce();
    const bidderAddress = '0x1234567890abcdef1234567890abcdef12345678';

    const commitment = computePoseidonCommitment(bidAmount, secretNonce, bidderAddress);

    // Assert commitment formatting
    expect(commitment).toMatch(/^0x[a-f0-9]{64}$/);
    
    // Assert deterministic hash: Same inputs produce exact same commitment
    const repeatCommitment = computePoseidonCommitment(bidAmount, secretNonce, bidderAddress);
    expect(commitment).toBe(repeatCommitment);

    // Assert opacity: Commitment does NOT reveal bidAmount directly in string or bytes
    expect(commitment).not.toContain('5000');
    expect(commitment).not.toContain(bidAmount.toString());
  });

  it('Test 2: Generates and verifies Zero-Knowledge Range Proof (bid >= reservePrice)', () => {
    const reservePrice = BigInt(2500);
    const privateState: PrivateBidState = {
      bidAmount: BigInt(3500), // Valid bid > reserve
      secretNonce: generateSecretNonce(),
      bidderAddress: '0x9876543210fedcba9876543210fedcba98765432',
      timestamp: Date.now(),
    };

    const zkProof = generateZkRangeProof(privateState, reservePrice, 'auc_midnight_001');

    // Assert ZK proof fields structure
    expect(zkProof.circuitName).toBe('SealedBidAuction.submitBid');
    expect(zkProof.publicInputs.isAboveReserve).toBe(true);
    expect(zkProof.pi_a).toHaveLength(2);
    expect(zkProof.pi_b).toHaveLength(2);

    // Verify proof
    const isValid = verifyZkProof(zkProof);
    expect(isValid).toBe(true);
  });

  it('Test 3: Verifies Sealed-Bid Resolution & Verifiable Winner Settlement', () => {
    const auctions = client.getAuctions();
    const activeAuction = auctions[0];
    expect(activeAuction.isFinalized).toBe(false);

    // Submit private bid
    const { commitment } = client.submitPrivateBid(
      activeAuction.id,
      BigInt(6000),
      '0x555566667777888899990000aaaabbbbccccdddd'
    );

    expect(commitment.commitmentHash).toBeDefined();

    // Finalize auction
    const result = client.finalizeAuction(activeAuction.id);
    const updatedAuction = client.getAuctionById(activeAuction.id);

    expect(updatedAuction?.isFinalized).toBe(true);
    expect(updatedAuction?.status).toBe('CLOSED');
    expect(updatedAuction?.highestBidCommitment).toBe(result.winningCommitment);
    expect(updatedAuction?.winningBidderAddress).toBe('0x555566667777888899990000aaaabbbbccccdddd');
  });

  it('Test 4: Privacy Leak Prevention & Invalid Low Bid ZK Circuit Rejection', () => {
    const reservePrice = BigInt(10000);
    const lowPrivateState: PrivateBidState = {
      bidAmount: BigInt(4500), // INVALID bid below reserve (4500 < 10000)
      secretNonce: generateSecretNonce(),
      bidderAddress: '0x1111222233334444555566667777888899990000',
      timestamp: Date.now(),
    };

    // Expect ZK range proof generator to fail assertion
    expect(() => {
      generateZkRangeProof(lowPrivateState, reservePrice, 'auc_midnight_002');
    }).toThrowError(/ZK Circuit Assertion Failed/);
  });
});
