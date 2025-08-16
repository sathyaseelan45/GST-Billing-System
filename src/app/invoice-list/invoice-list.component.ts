import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { Invoice } from '../models/invoice';
import { Customer } from '../models/customer';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-invoice-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent implements OnInit{
  invoices:Invoice[]=[];
  customers:Customer[]=[];
  products:Product[]=[];

  constructor(
      private invoiceService:InvoiceService,
      private customerService:CustomerService,
      private productService:ProductService,
      public router:Router
  ){}

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.invoices=this.invoiceService.getall();
    this.customers=this.customerService.getall();
    this.products=this.productService.getall();
  }

  customername(id:number){
    return this.customers.find(c=>c.id===id)?.name ?? '-';
  }

  viewinvoice(id:number){
    this.router.navigate(['/invoices/edit',id]);
  }

  deleteinvoice(id:number){
    if(confirm('are you sure to delete invoice?')){
      this.invoiceService.delete(id);
      this.load();
    }
  }

   printinvoice(id: number) {
    const invoice = this.invoices.find(i => i.id === id);
      if (invoice) {
       const printContent = `
         <html>
           <head>
              <title>Invoice</title>
               <style>
                 h2 { text-align: center; }
                 p { font-size: 14px; }
               </style>
            </head>
             <body>
               <h2>Invoice #${invoice.id}</h2>
             <p>Customer: ${this.customername(invoice.customerid)}</p>
             <p>Date: ${invoice.date}</p>
             <p>Items: ${invoice.items.length}</p>
             </body>
         </html>
          `;

       const printWindow = window.open('', '', 'width=800,height=600');
       if (printWindow) {
           printWindow.document.open();
           printWindow.document.write(printContent);
           printWindow.document.close();
           printWindow.print();
           }
     }
  }


  printall(){
    let content=`<h1>Invoices List</h1><ul>`;

    this.invoices.forEach(inv=>{ content+=`<li>${inv.id} - ${this.customername(inv.customerid)}(${inv.date}) - Items(${inv.items.length})</li>`});

    content+=`</ul>`;

    const printWindow=window.open('','','width=800,height=600');
    if(printWindow){
      printWindow.document.write(content);      
      printWindow.document.close();      
      printWindow.print();      

    }
  }

  exportcsv(){
     const headers = ['ID', 'Customer', 'Date', 'Items'];

  const rows = this.invoices.map(inv => [
    inv.id,
    this.customername(inv.customerid),
    inv.date,
    inv.items.length
  ]);

  let csv =
    headers.join(',') + '\n' +
    rows.map(e => e.join(',')).join('\n');


    const blob=new Blob([csv],{type:'text/csv'});
    const link=document.createElement('a');
    link.href=window.URL.createObjectURL(blob);
    link.download='invoices.csv';
    link.click();
  }

  exportpgf(){
    const doc=new jsPDF();

    doc.text('Invoices List',14,10);

    const tabledata=this.invoices.map(inv=>[
      inv.id,
      this.customername(inv.customerid),
      inv.date,
      inv.items.length
    ]);

    autoTable(doc,{
      head:[['Id','Customer','Date','Items']],
      body:tabledata,
      startY:20
    });

    doc.save('invoices.pdf');
  }

  trackByIndex(index: number, item: any): number {
  return index;
}

}
