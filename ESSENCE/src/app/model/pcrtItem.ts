import { Item, Status } from "./item";

export class PcrtItem extends Item {

    constructor(orderNr) {
        super(orderNr);
        this.status = Status.inactive;
    }
    power: number = 0;
    cost: number = 0;
    risk: number = 0; 
    time: number = 0;
    
    getFirestoreRep() {
        return {status: this.status, text: this.text, orderNr: this.orderNr, power: this.power, cost: this.cost, risk: this.risk, time: this.time}
    }
    get total() {
        var sum = +this.power - +this.cost - +this.risk - +this.time;
        return  sum; 
    }
    createNew(orderNr) { return new PcrtItem(orderNr)}

    updateItemValue(newValues) {
        super.updateItemValue(newValues);
        if(newValues.power) {
            this.power = newValues.power;
        }
        if(newValues.cost) {
            this.cost = newValues.cost;
        }
        if(newValues.risk) {
            this.risk = newValues.risk;
        }
        if(newValues.time) {
            this.time = newValues.time;
        }
    }
}