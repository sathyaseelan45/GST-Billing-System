import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  customers:Customer[]=[];

  constructor(private customerService:CustomerService,private router:Router){}

  ngOnInit(): void {
    this.loadcustomers();
  }
  loadcustomers(){
   this.customers= this.customerService.getall();
  }

  editcustomer(id:number){
    this.router.navigate(['/customers/edit',id]);
  }

  deletecustomer(id:number){
    if(confirm('are you sure to delete this customer?')){
      this.customerService.delete(id);
      this.loadcustomers();
    }
  }

  addcustomer(){
    this.router.navigate(['/customers/edit',0]);
  }

  trackByIndex(index: number, item: any): number {
  return index;
}

}
