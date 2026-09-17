import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../../core/services/supplier.service';
import { SupplierRequest, SupplierResponse } from '../../shared/models/supplier.model';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html'
})
export class SuppliersComponent implements OnInit {
  suppliers: SupplierResponse[] = [];
  selected: SupplierResponse | null = null;
  showModal = false;

  constructor(private service: SupplierService, private toastr: ToastrService) {}

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data) => (this.suppliers = data),
      error: () => this.toastr.error('Failed to load suppliers')
    });
  }

  openAdd() { this.selected = null; this.showModal = true; }
  openEdit(s: SupplierResponse) { this.selected = s; this.showModal = true; }
  close() { this.showModal = false; this.selected = null; }

  handleSave(event: { id?: number; data: SupplierRequest }) {
    const action = event.id
      ? this.service.update(event.id, event.data)
      : this.service.create(event.data);

    action.subscribe({
      next: () => {
        this.toastr.success(event.id ? 'Supplier updated' : 'Supplier created');
        this.load();
        this.close();
      },
      error: (e) => this.toastr.error(e.error?.message || 'Operation failed')
    });
  }

  delete(s: SupplierResponse) {
    if (confirm(`Delete supplier "${s.name}"?`)) {
      this.service.delete(s.id).subscribe({
        next: () => { this.toastr.success('Deleted'); this.load(); },
        error: () => this.toastr.error('Delete failed')
      });
    }
  }
}