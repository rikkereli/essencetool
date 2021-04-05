import { Item, Status } from "./item";

export class Swotitem extends Item {

    constructor(orderNr) {
        super(orderNr);
        this.status = Status.inactive;
    }
    strength: number = 0;
    weaknesses: number = 0;
    oppotunities: number = 0; 
    threats: number = 0;
    
    getFirestoreRep() {
        return {status: this.status, text: this.text, orderNr: this.orderNr, strength: this.strength, weaknesses: this.weaknesses, oppotunities: this.oppotunities, threats: this.threats}
    }
    get total() {
        var sum = +this.strength - +this.weaknesses + +this.oppotunities - +this.threats;
        return  sum; 
    }
    createNew(orderNr) { return new Swotitem(orderNr)}

    updateItemValue(newValues) {
        super.updateItemValue(newValues);
        if(newValues.strength) {
            this.strength = newValues.strength;
        }
        if(newValues.weaknesses) {
            this.weaknesses = newValues.weaknesses;
        }
        if(newValues.oppotunites) {
            this.oppotunities = newValues.oppotunites;
        }
        if(newValues.threats) {
            this.threats = newValues.threats;
        }
    }
}