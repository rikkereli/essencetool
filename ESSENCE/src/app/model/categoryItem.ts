import { Item } from "./item";


export class CategoryItem extends Item  {

    // If it is related to a subcateogry
    subcategory: string;
    createNew(orderNr) { return new CategoryItem(orderNr)}

    getFirestoreRep() {
        if(this.subcategory) {
            return {status: this.status, text: this.text, orderNr: this.orderNr, subcategory: this.subcategory}
        }
        else {
            return {status: this.status, text: this.text, orderNr: this.orderNr}
        }
    }
}
