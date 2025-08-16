import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',redirectTo:'/customers',pathMatch:'full'},
    { 
    path: 'customers', 
    loadComponent: () => import('./customer-list/customer-list.component').then(c => c.CustomerListComponent)
  },
  { 
    path: 'customers/edit/:id', 
    loadComponent: () => import('./customer-form/customer-form.component').then(c => c.CustomerFormComponent)
  },
  { 
    path: 'products', 
    loadComponent: () => import('./product-list/product-list.component').then(p => p.ProductListComponent)
  },
  { 
    path: 'products/new', 
    loadComponent: () => import('./product-form/product-form.component').then(p => p.ProductFormComponent)
  },
  { 
    path: 'products/edit/:id', 
    loadComponent: () => import('./product-form/product-form.component').then(p => p.ProductFormComponent)
  },
  { 
    path: 'invoices', 
    loadComponent: () => import('./invoice-list/invoice-list.component').then(i => i.InvoiceListComponent)
  },
  { 
    path: 'invoices/new', 
    loadComponent: () => import('./invoice-form/invoice-form.component').then(i => i.InvoiceFormComponent)
  },
  { 
    path: 'invoices/edit/:id', 
    loadComponent: () => import('./invoice-form/invoice-form.component').then(i => i.InvoiceFormComponent)
  },
];
