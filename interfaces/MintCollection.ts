export default interface MintCollectionInterface {
  candy_machine_id: string;
  candy_object: string;
  mint_price?: number;
  amount?: number;
  publicMint?: boolean;
  proof?: Uint8Array[];
  mint_limit?: number;
  coinType?: string;
  coinObject?: string;
  sender?: string;
  simulatedMerkleMint?: boolean;
}
