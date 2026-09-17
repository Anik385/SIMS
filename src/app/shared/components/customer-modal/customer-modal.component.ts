import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CustomerRequest, CustomerResponse } from '../../models/customer.model';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html'
})
export class CustomerModalComponent implements OnChanges {
  @Input() customer: CustomerResponse | null = null;
  @Output() save = new EventEmitter<{ id?: number; data: CustomerRequest }>();
  @Output() close = new EventEmitter<void>();

  form: CustomerRequest = { name: '', email: '', phone: '', address: '', isActive: true };

  get isEdit() { return !!this.customer; }

  ngOnChanges() {
    if (this.customer) {
      this.form = {
        name: this.customer.name,
        email: this.customer.email,
        phone: this.customer.phone,
        address: this.customer.address,
        isActive: this.customer.isActive
      };
    } else {
      this.form = { name: '', email: '', phone: '', address: '', isActive: true };
    }
  }

  submit() { this.save.emit({ id: this.customer?.id, data: this.form }); }
  cancel() { this.close.emit(); }
}