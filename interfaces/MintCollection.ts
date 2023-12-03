export default interface MintCollectionInterface {
  candy_machine_id: string;
  candy_object: string;
  amount?: number;
  publicMint?: boolean;
  proof?: string;
  mint_limit?: number;
}
