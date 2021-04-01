import { Status } from "./categoryItem";
import { Item } from "./item";

export class Criteria implements Item{
    text: string;
    status: Status;
    id: string;
    orderNr: number;
    localOnly: boolean;
}