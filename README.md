# GstBilling

A simple Angular GST Billing application using Standalone Components, Reactive Forms, and localStorage for storing customers, products, and invoices.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

# Features

Manage Customers: Add, Edit, Delete

Manage Products: Add, Edit, Delete

Manage Invoices: Add, Edit, Delete

Reactive Form Validation for all input fields

Dynamic Tax Calculation (CGST, SGST, IGST) based on customer state

Print individual invoices or the entire list

Export invoices as CSV or PDF

Fully responsive UI with Bootstrap 5

Routing with lazy-loaded standalone components

# Technologies Used

Angular 19 (Standalone Components)

TypeScript

Reactive Forms

Bootstrap 5

localStorage for persistence

jsPDF and jspdf-autotable for PDF export

# Project Structure

```bash
src/
├─ app/
│  ├─ customer-form/
│  ├─ customer-list/
│  ├─ product-form/
│  ├─ product-list/
│  ├─ invoice-form/
│  ├─ invoice-list/
│  ├─ models/
│  │  ├─ customer.ts
│  │  ├─ product.ts
│  │  └─ invoice.ts
│  ├─ services/
│  │  ├─ customer.service.ts
│  │  ├─ product.service.ts
│  │  └─ invoice.service.ts
│  ├─ app-routing.ts
│  └─ app.component.ts / app.component.html
└─ assets/
```

# Setup & Installation

Clone the repository:

```bash
git clone <https://github.com/sathyaseelan45/GST-Billing-System.git>
cd gst-billing
```

Install dependencies:

```bash
npm install
```

Run the project:

```bash
ng serve
```

Open in browser: http://localhost:4200/

# Usage

Navigate between Customers, Products, and Invoices using the navbar.

Fill the forms to add new customers/products/invoices.

Edit or Delete existing entries using the buttons in the tables.

Add multiple items in an invoice dynamically.

Totals are automatically calculated including applicable taxes.

Export invoice list as CSV or PDF using the buttons in the invoice list page.

Print individual invoices or all invoices using the print buttons.

# Live Demo Link

https://gst-billing-system-e3ea4.web.app

# Notes

The app uses localStorage to persist data. Refreshing or closing the browser will retain your data.

Taxes are calculated based on Tamil Nadu as seller state:

CGST + SGST if customer is in Tamil Nadu

IGST if customer is in a different state


