
export class CategoryItem  {
    constructor(text: string, id: string, orderNr: number = 1) {
        this.text = text;
        this.id = id;
        this.orderNr = orderNr;
    }
    text: string = ''; 
    id: string;
    orderNr: number;
}