export enum Status {
    inactive = 0, active = 1
}
export abstract class Item {

    constructor(orderNr: number) {
        this.orderNr = orderNr;
    }
    subcategory?: string;

    abstract getFirestoreRep();
    abstract createNew(orderNr);
    text: string = ""; 
    id?: string;
    orderNr: number;
    // True if it is temporary empty. False if it is in database
    localOnly?: boolean = true;
    status: Status = Status.active;

    statusString = "active";

    getStatus() {
        if(this.status === Status.active) {
            return "active";
        }
        else {
            return "inactive";
        }
    }

    toogleStatus() {
        if(this.status === Status.active) {
            this.status = Status.inactive;
        }
        else {
            this.status = Status.active;
        }
        this.statusString = this.getStatus();
    }

    updateItemValue(obj) {
        this.localOnly = false;
        if(obj.text) {
            this.text = obj.text;
        }
        if(obj.status) {
            this.status = obj.status;
        }
        if(obj.id) {
            this.id = obj.id;
        }
        if(obj.orderNr) {
            this.orderNr = obj.orderNr;
        }
        if(obj.subcategory) {
            this.subcategory = obj.subcategory;
        }
    }
}