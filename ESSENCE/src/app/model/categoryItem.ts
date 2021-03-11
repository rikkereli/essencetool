
export class CategoryItem  {
    constructor(text: string, id: string, orderNr: number = 1, localOnly: boolean = false) {
        this.text = text;
        this.id = id;
        this.orderNr = orderNr;
        this.localOnly = localOnly;
    }
    text: string = ''; 
    id: string;
    orderNr: number;
    localOnly: boolean;
}