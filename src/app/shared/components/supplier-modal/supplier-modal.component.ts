import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { SupplierRequest, SupplierResponse } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-modal.component.html'
})
export class SupplierModalComponent implements OnChanges {
  @Input() supplier: SupplierResponse | null = null;
  @Output() save = new EventEmitter<{ id?: number; data: SupplierRequest }>();
  @Output() close = new EventEmitter<void>();

  form: SupplierRequest = {
    name: '', email: '', phone: '', address: '', contactPerson: '', isActive: true
  };

  get isEdit() { return !!this.supplier; }

  ngOnChanges() {
    if (this.supplier) {
      this.form = {
        name: this.supplier.name,
        email: this.supplier.email,
        phone: this.supplier.phone,
        address: this.supplier.address,
        contactPerson: this.supplier.contactPerson,
        isActive: this.supplier.isActive
      };
    } else {
      this.form = { name: '', email: '', phone: '', address: '', contactPerson: '', isActive: true };
    }
  }

  submit() { this.save.emit({ id: this.supplier?.id, data: this.form }); }
  cancel() { this.close.emit(); }
}