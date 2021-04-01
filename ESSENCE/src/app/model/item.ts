import { Status } from "./categoryItem";

export interface Item {
    text: string; 
    id: string;
    orderNr: number;
    // True if it is temporary empty. False if it is in database
    localOnly: boolean;
    status: Status;
}