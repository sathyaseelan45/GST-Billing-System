import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  productform!:FormGroup;
  editproduct:number|null=null;

  constructor(
    private productService:ProductService,
    private fb:FormBuilder,
    public router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.productform=this.fb.group({
    name:['',Validators.required],
    hsn:['',Validators.required],
    price:[0,[Validators.required,Validators.min(0)]],
    gstrate:[18,Validators.required]

  })

  const id=this.route.snapshot.paramMap.get('id');
  if(id&&id!=='0'){
    this.editproduct=+id;
    const p=this.productService.getbyid(this.editproduct);
    if(p){
      this.productform.patchValue(p);
    }
  }
    
  }

  onsubmit(){
    if(this.productform.invalid){
      this.productform.markAllAsTouched();
      return;
    }

    const products:Product={id:this.editproduct??0,...this.productform.value};
    if(this.editproduct){
      this.productService.update(products);
    }else{
      this.productService.add(products);
    }

    alert('product saved!');
    this.router.navigate(['/products']);

  }

}
