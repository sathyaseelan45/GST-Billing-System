import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../models/customer';
import { Product } from '../models/product';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { InvoiceService } from '../services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../models/invoice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-form',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.css'
})
export class InvoiceFormComponent implements OnInit {
  form!:FormGroup;
  customers:Customer[]=[];
  products:Product[]=[];
  editid:number|null=null;

  private readonly SELLER_STATE='tamilnadu';

  constructor(
    private fb:FormBuilder,
    private customerService:CustomerService,
    private productService:ProductService,
    private invoiceService:InvoiceService,
    public router:Router,
    private route:ActivatedRoute
  ){}


  ngOnInit(): void {
    this.customers=this.customerService.getall();
    this.products=this.productService.getall();

    this.form=this.fb.group({
      customerid:[null,Validators.required],
      date:[new Date().toISOString().substring(0,10),Validators.required],
      items:this.fb.array([this.createitem()]),
    });

    const id=this.route.snapshot.paramMap.get('id');
    if(id&&id!=='0'){
      this.editid=+id;
      this.loadinvoice(this.editid);
    }
  }

  createitem():FormGroup{
  return  this.fb.group({
      productid:['',Validators.required],
      quantity:[1,[Validators.required,Validators.min(1)]]
    });
  }

  get items():FormArray{
    return this.form.get('items') as FormArray;
  }

  additem(){
    this.items.push(this.createitem());
  }

  removeitem(i:number){
    this.items.removeAt(i);
  }

  loadinvoice(id:number){
    const inv=this.invoiceService.getbyid(id);
    if(!inv)return;
    this.form.patchValue({customerid:inv.customerid,date:inv.date});
    this.items.clear();
    inv.items.forEach(it=>{
      this.items.push(this.fb.group({
        productid:[it.productid,Validators.required],
        quantity:[it.quantity,[Validators.required,Validators.min(1)]]
      }));
    });
  }

  getproductsbyid(id:number){
    return this.products.find(p=>p.id===id);
  }

  private round2(v:number){
  return Math.round((v+Number.EPSILON)*100)/100;
  }

  calculatetax(amount:number,rate:number,customerstate:string){
    if(!customerstate) return{cgst:0,sgst:0,igst:0};
    if(customerstate.trim().toLowerCase()===this.SELLER_STATE.trim().toLowerCase()){
     const halfrate=rate/2;
     const cgst=this.round2((amount*halfrate)/100);
     const sgst=this.round2((amount*halfrate)/100);
     return {cgst,sgst,igst:0};
    }else{
     const igst=this.round2((amount*rate)/100);
     return {igst,cgst:0,sgst:0};
    }
  }

  get totals(){
    const customerid=this.form.value.customerid;
    const customer=this.customers.find(c=>c.id===customerid);
    const state=customer?customer.state:'';
    let taxable=0;
    let cgst=0;
    let sgst=0;
    let igst=0;
    this.items.controls.forEach(ctrl=>{
      const pid=ctrl.get('productid')?.value;
      const qty=Number(ctrl.get('quantity')?.value);
      const pr=this.getproductsbyid(pid);
      if(pr&&qty){
        const lineamount=this.round2(pr.price*qty);
        taxable=this.round2(taxable+lineamount);
        const tax=this.calculatetax(lineamount,pr.gstrate,state);
        cgst=this.round2(cgst+tax.cgst);
        sgst=this.round2(sgst+tax.sgst);
        igst=this.round2(igst+tax.igst);
      }
    });
    const total=this.round2(taxable+sgst+cgst+igst);
    return {taxable,sgst,cgst,igst,total};
  }

  onsubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const invoice:Invoice= {
      id:this.editid??0,
      customerid:this.form.value.customerid,
      date:this.form.value.date,
      items:this.form.value.items};

      if(this.editid){
       this.invoiceService.update(invoice);
     }else{
        this.invoiceService.add(invoice);
     }

     alert('invoice saved!');
     this.router.navigate(['/invoices']);
  }

  
}
