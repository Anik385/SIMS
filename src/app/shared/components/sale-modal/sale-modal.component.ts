import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../../core/services/customer.service';
import { ProductService } from '../../../core/services/product.service';
import { CustomerResponse } from '../../models/customer.model';
import { ProductResponse } from '../../models/product.model';
import { PaymentMethod, SaleItemRequest, SaleRequest } from '../../models/sale.model';

@Component({
  selector: 'app-sale-modal',
  templateUrl: './sale-modal.component.html'
})
export class SaleModalComponent implements OnInit {
  @Output() save = new EventEmitter<SaleRequest>();
  @Output() close = new EventEmitter<void>();

  customers: CustomerResponse[] = [];
  products: ProductResponse[] = [];

  customerId: number | null = null;
  paymentMethod: PaymentMethod = 'CASH';
  discount = 0;
  tax = 0;
  notes = '';
  items: SaleItemRequest[] = [];

  paymentMethods: PaymentMethod[] = ['CASH', 'CARD', 'ONLINE', 'BANK_TRANSFER'];

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.customerService.getAll().subscribe(data => this.customers = data);
    this.productService.getProducts(0, 500).subscribe(page => this.products = page.content);
    this.addItem();
  }

  addItem() {
    this.items.push({ productId: 0, quantity: 1, unitPrice: undefined });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  getProduct(id: number): ProductResponse | undefined {
    return this.products.find(p => p.id === id);
  }

  getStock(productId: number): number {
    return this.getProduct(productId)?.quantity ?? 0;
  }

  get subtotal(): number {
    return this.items.reduce((sum, i) => sum + (i.unitPrice || 0) * i.quantity, 0);
  }

  get total(): number {
    return this.subtotal - this.discount + this.tax;
  }

  submit() {
    if (this.items.length === 0 || this.items.some(i => !i.productId || i.quantity <= 0)) {
      this.toastr.warning('Please add valid items');
      return;
    }

    // Check stock availability
    for (const item of this.items) {
      if (item.quantity > this.getStock(item.productId)) {
        this.toastr.error(`Not enough stock for ${this.getProduct(item.productId)?.name}`);
        return;
      }
    }

    const request: SaleRequest = {
      customerId: this.customerId || undefined,
      paymentMethod: this.paymentMethod,
      discount: this.discount || 0,
      tax: this.tax || 0,
      notes: this.notes,
      items: this.items
    };

    this.save.emit(request);
  }

  cancel() { this.close.emit(); }
}