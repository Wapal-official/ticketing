import CandyMachine from "@/interfaces/candymachine";
export default interface Collection {
  _id: string;
  name: string;
  description: string;
  image: string;
  baseURL: string;
  whitelist_sale_time: string;
  public_sale_time: string;
  candyMachine_id: CandyMachine;
}
