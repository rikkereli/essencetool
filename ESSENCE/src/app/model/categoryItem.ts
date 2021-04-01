import { Item } from "./item";

export enum Status {
     inactive = 0, active = 1
}

export class CategoryItem implements Item  {

    getStatus() {
        if(this.status === Status.active) {
            return "active";
        }
        else {
            return "inactive";
        }
    }
    constructor(text: string, id: string, orderNr: number = 1, localOnly: boolean = false, subCategory: string, status: Status) {
        this.text = text;
        this.id = id;
        this.orderNr = orderNr;
        this.localOnly = localOnly;
        this.subcategory = subCategory;
        this.status = status;
        this.statusString = this.getStatus();
    }
    text: string = ''; 
    id: string;
    orderNr: number;
    // True if it is temporary empty. False if it is in database
    localOnly: boolean;
    status: Status = Status.active;
    // If it is related to a subcateogry
    subcategory: string;
    toogleStatus() {
        if(this.status === Status.active) {
            this.status = Status.inactive;
        }
        else {
            this.status = Status.active;
        }
        this.statusString = this.getStatus();
    }
    statusString = "active";
    updateItemValue(newValues) {
        if(newValues.orderNr) {
            this.orderNr = newValues.orderNr;
        }
        if(newValues.status) {
            this.status = newValues.status;
        }
        if(newValues.text) {
            this.text = newValues.text;
        }
    }
    addToLocalStorage() {
        
    }

}