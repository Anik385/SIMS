import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SaleService } from '../../core/services/sale.service';
import { SaleRequest, SaleResponse, SaleStatus } from '../../shared/models/sale.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html'
})
export class SalesComponent implements OnInit {
  sales: SaleResponse[] = [];
  showModal = false;

  constructor(private service: SaleService, private toastr: ToastrService) {}

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data) => (this.sales = data),
      error: () => this.toastr.error('Failed to load sales')
    });
  }

  openAdd() { this.showModal = true; }
  close() { this.showModal = false; }

  handleCreate(request: SaleRequest) {
    this.service.create(request).subscribe({
      next: () => {
        this.toastr.success('Sale completed');
        this.load();
        this.close();
      },
      error: (e) => this.toastr.error(e.error?.message || 'Sale failed')
    });
  }

  refund(sale: SaleResponse) {
    if (confirm(`Refund sale ${sale.saleNumber}? Stock will be restored.`)) {
      this.service.refund(sale.id).subscribe({
        next: () => { this.toastr.success('Refunded'); this.load(); },
        error: () => this.toastr.error('Refund failed')
      });
    }
  }

  getStatusClass(status: SaleStatus): string {
    const map: Record<SaleStatus, string> = {
      PENDING: 'bg-warning text-dark',
      COMPLETED: 'bg-success',
      REFUNDED: 'bg-info text-dark',
      CANCELLED: 'bg-danger'
    };
    return map[status];
  }
}