import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseOrderService } from '../../core/services/purchase-order.service';
import { PurchaseOrderResponse } from '../../shared/models/purchase-order.model';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html'
})
export class PurchaseOrderDetailComponent implements OnInit {
  order: PurchaseOrderResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: PurchaseOrderService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe({
      next: (data) => this.order = data,
      error: () => this.toastr.error('Failed to load order')
    });
  }

  goBack() { this.router.navigate(['/purchase-orders']); }
}