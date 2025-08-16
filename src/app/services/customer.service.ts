import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private storagekey='customers';

  constructor() { }

  getall():Customer[]{
    const data=localStorage.getItem(this.storagekey);
    return data ? JSON.parse(data):[];
  }

  saveall(customers:Customer[]){
    localStorage.setItem(this.storagekey,JSON.stringify(customers));
  }

  add(customer:Customer){
    const customers=this.getall();
    customer.id=customers.length>0 ? customers[customers.length-1].id+1 : 1;
    customers.push(customer);
    this.saveall(customers);
  }
  update(customer:Customer){
    const customers=this.getall();
    const index=customers.findIndex(c=>c.id===customer.id);
    if(index!==-1)
    {
      customers[index]=customer;
      this.saveall(customers);
    }
   
  }
  delete(id:number){
    let customers=this.getall();
   customers= customers.filter(c=>c.id!==id);
    customers= customers.map((inv, i) => ({
    ...inv,
    id: i + 1
  }));
    this.saveall(customers);
  }

  getbyid(id:number):Customer|undefined{
    const customers=this.getall();
    return customers.find(c=>c.id===id);
  }
}
