import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private storagekey='invoices';

  constructor() { }

  getall():Invoice[]{
    const raw=localStorage.getItem(this.storagekey);
    return raw ? JSON.parse(raw):[];
  }

  setall(invoices:Invoice[]){
    localStorage.setItem(this.storagekey,JSON.stringify(invoices));
  }

  add(invoice:Invoice){
    const invoices=this.getall();
    invoice.id=invoices.length ? invoices[invoices.length-1].id+1:1;
    invoices.push(invoice);
    this.setall(invoices);
  }

  update(invoice:Invoice){
    const invoices=this.getall();
    const index=invoices.findIndex(i=>i.id===invoice.id);
    if(index!==-1)
    {
      invoices[index]=invoice;
      this.setall(invoices);
    }
  }

  delete(id:number){
    let invoices=this.getall();
    invoices=invoices.filter(i=>i.id!==id);
     invoices = invoices.map((inv, i) => ({
    ...inv,
    id: i + 1
  }));
    this.setall(invoices);
  }

  getbyid(id:number):Invoice|undefined{
    return this.getall().find(i=>i.id===id);
  }
}
