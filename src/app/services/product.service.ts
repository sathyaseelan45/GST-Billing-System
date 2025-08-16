import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private storagekey='products';

  constructor() { }

  getall():Product[]{
    const raw =localStorage.getItem(this.storagekey);
    return raw ? JSON.parse(raw):[];
  }

  saveall(products:Product[]){
    localStorage.setItem(this.storagekey,JSON.stringify(products));
  }

  add(product:Product){
    const products=this.getall();
    product.id=products.length ? products[products.length-1].id+1:1;
    products.push(product);
    this.saveall(products);
  }

  update(product:Product){
    const products=this.getall();
    const index=products.findIndex(p=>p.id===product.id);
    if(index!==-1){
      products[index]=product;
      this.saveall(products);
    }
  }
  delete(id:number){
    let products=this.getall();
    products=products.filter(p=>p.id!==id);
     products = products.map((inv, i) => ({
    ...inv,
    id: i + 1
  }));
    this.saveall(products);
  }

  getbyid(id:number):Product|undefined{
    return this.getall().find(p=>p.id===id);
  }
}
