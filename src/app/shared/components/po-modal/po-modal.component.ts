import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../core/services/product.service';
import { SupplierService } from '../../../core/services/supplier.service';
import { ProductResponse } from '../../models/product.model';
import { SupplierResponse } from '../../models/supplier.model';
import { PurchaseOrderItemRequest, PurchaseOrderRequest } from '../../models/purchase-order.model';

@Component({
  selector: 'app-po-modal',
  templateUrl: './po-modal.component.html'
})
export class PoModalComponent implements OnInit {
  @Output() save = new EventEmitter<PurchaseOrderRequest>();
  @Output() close = new EventEmitter<void>();

  suppliers: SupplierResponse[] = [];
  products: ProductResponse[] = [];

  supplierId: number | null = null;
  expectedDelivery = '';
  notes = '';
  items: PurchaseOrderItemRequest[] = [];

  constructor(
    private supplierService: SupplierService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.supplierService.getActive().subscribe(data => this.suppliers = data);
    this.productService.getProducts(0, 500).subscribe(page => this.products = page.content);
    this.addItem();
  }

  addItem() {
    this.items.push({ productId: 0, quantity: 1, unitPrice: undefined });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  get total(): number {
    return this.items.reduce((sum, i) => sum + (i.unitPrice || 0) * i.quantity, 0);
  }

  submit() {
    if (!this.supplierId) { this.toastr.warning('Select a supplier'); return; }
    if (this.items.length === 0 || this.items.some(i => !i.productId || i.quantity <= 0)) {
      this.toastr.warning('Add valid items'); return;
    }
    const request: PurchaseOrderRequest = {
      supplierId: this.supplierId,
      expectedDelivery: this.expectedDelivery || undefined,
      notes: this.notes,
      items: this.items
    };
    this.save.emit(request);
  }

  cancel() { this.close.emit(); }
}