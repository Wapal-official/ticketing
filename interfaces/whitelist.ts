import Collection from "@/interfaces/collection";

export default interface Whitelist {
    _id: string;
    whitelist_id: Collection;
    name: string;
    whitelist_start: string;
    whitelist_end: string;
}
