import { Item } from "./item";

export class Criteria extends Item{
    getFirestoreRep() {
        return {status: this.status, text: this.text, orderNr: this.orderNr}
    }
    createNew(orderNr) { return new Criteria(orderNr)}
    
}