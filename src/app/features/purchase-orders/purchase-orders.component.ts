import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PurchaseOrderService } from '../../core/services/purchase-order.service';
import { PurchaseOrderRequest, PurchaseOrderResponse, PurchaseOrderStatus } from '../../shared/models/purchase-order.model';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html'
})
export class PurchaseOrdersComponent implements OnInit {
  orders: PurchaseOrderResponse[] = [];
  showModal = false;

  constructor(private service: PurchaseOrderService, private toastr: ToastrService) {}

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data) => (this.orders = data),
      error: () => this.toastr.error('Failed to load purchase orders')
    });
  }

  openAdd() { this.showModal = true; }
  close() { this.showModal = false; }

  handleCreate(request: PurchaseOrderRequest) {
    this.service.create(request).subscribe({
      next: () => {
        this.toastr.success('Purchase order created');
        this.load();
        this.close();
      },
      error: (e) => this.toastr.error(e.error?.message || 'Create failed')
    });
  }

  updateStatus(order: PurchaseOrderResponse, status: PurchaseOrderStatus) {
    this.service.updateStatus(order.id, status).subscribe({
      next: () => {
        this.toastr.success(`Status changed to ${status}`);
        this.load();
      },
      error: () => this.toastr.error('Update failed')
    });
  }

  delete(order: PurchaseOrderResponse) {
    if (confirm(`Delete order ${order.orderNumber}?`)) {
      this.service.delete(order.id).subscribe({
        next: () => { this.toastr.success('Deleted'); this.load(); },
        error: (e) => this.toastr.error(e.error?.message || 'Delete failed')
      });
    }
  }

  getStatusClass(status: PurchaseOrderStatus): string {
    const map: Record<PurchaseOrderStatus, string> = {
      DRAFT: 'bg-secondary',
      PENDING_APPROVAL: 'bg-warning text-dark',
      APPROVED: 'bg-info text-dark',
      RECEIVED: 'bg-success',
      CANCELLED: 'bg-danger'
    };
    return map[status];
  }
}