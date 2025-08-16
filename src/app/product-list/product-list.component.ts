import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products:Product[]=[];

  constructor(private productService:ProductService,private router:Router){}

  ngOnInit(): void {
    this.loadproducts();
  }

  loadproducts(){
   this.products=this.productService.getall();
  }
  addproduct(){
    this.router.navigate(['/products/new']);
  }

  editproduct(id:number){
    this.router.navigate(['/products/edit',id]);
  }

  deleteproduct(id:number){
    if(confirm('are you sure to delete product?')){
      this.productService.delete(id);
      this.loadproducts();
    }
  }

  trackByIndex(index: number, item: any): number {
  return index;
}


}
