import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit {

  customerform!:FormGroup;
  editingid:number|null=null;

  constructor(
    private customerService:CustomerService,
    private fb:FormBuilder,
    public router:Router,
    private route:ActivatedRoute)
    {}


    ngOnInit(): void {
      this.customerform=this.fb.group({
        name:['',Validators.required],
        gstin:['',Validators.required],
        state:['',Validators.required],
        address:['']
      });

      const id=this.route.snapshot.paramMap.get('id');
      if(id&&id!=='0'){
        this.editingid=+id;
        const customer =this.customerService.getbyid(this.editingid);
        if(customer){
          this.customerform.patchValue(customer);
        }
      }
    }

    onsubmit(){
      if(this.customerform.invalid){
        this.customerform.markAllAsTouched();
        return
       }

      const customer:Customer={id:this.editingid??0,...this.customerform.value};
      if(this.editingid){
        this.customerService.update(customer);
      }else{
        this.customerService.add(customer);
      }
      alert('customer saved!');
      this.router.navigate(['/customers'])
    }
}