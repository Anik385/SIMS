import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../core/services/customer.service';
import { CustomerRequest, CustomerResponse } from '../../shared/models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  customers: CustomerResponse[] = [];
  selected: CustomerResponse | null = null;
  showModal = false;

  constructor(private service: CustomerService, private toastr: ToastrService) {}

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data) => (this.customers = data),
      error: () => this.toastr.error('Failed to load customers')
    });
  }

  openAdd() { this.selected = null; this.showModal = true; }
  openEdit(c: CustomerResponse) { this.selected = c; this.showModal = true; }
  close() { this.showModal = false; this.selected = null; }

  handleSave(event: { id?: number; data: CustomerRequest }) {
    const action = event.id
      ? this.service.update(event.id, event.data)
      : this.service.create(event.data);

    action.subscribe({
      next: () => {
        this.toastr.success(event.id ? 'Customer updated' : 'Customer created');
        this.load();
        this.close();
      },
      error: (e) => this.toastr.error(e.error?.message || 'Operation failed')
    });
  }

  delete(c: CustomerResponse) {
    if (confirm(`Delete customer "${c.name}"?`)) {
      this.service.delete(c.id).subscribe({
        next: () => { this.toastr.success('Deleted'); this.load(); },
        error: () => this.toastr.error('Delete failed')
      });
    }
  }
}
