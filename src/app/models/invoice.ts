export interface Invoiceitem{
    productid:number;
    quantity:number;
}

export interface Invoice {
    id:number;
    customerid:number;
    date:string;
    items:Invoiceitem[];
}
