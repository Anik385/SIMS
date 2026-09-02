import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/services/product.service';
import { StockService } from '../../core/services/stock.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { Subscription } from 'rxjs';
import { ProductResponse } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnInit, OnDestroy {
  scannerEnabled = false;
  skuInput = '';
  product: ProductResponse | null = null;
  delta: number | null = null;
  reason: string = 'RECEIVED';
  message = '';
  error = '';
  private wsSubscription: Subscription | null = null;

  constructor(
    private productService: ProductService,
    private stockService: StockService,
    private webSocketService: WebSocketService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.webSocketService.connect();
    this.wsSubscription = this.webSocketService.getStockUpdates().subscribe({
      next: (update: any) => {
        this.toastr.info(
          `Product ${update.sku} updated to ${update.newQuantity} (delta: ${update.delta})`,
          'Stock Update'
        );
        if (this.product && this.product.id === update.productId) {
          this.product.quantity = update.newQuantity;
        }
      },
      error: (err: any) => console.error('WebSocket error', err)
    });
  }

  ngOnDestroy() {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.webSocketService.disconnect();
  }

  toggleScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

  onScanSuccess(scanResult: string) {
    this.skuInput = scanResult;
    this.searchBySku();
  }

  searchBySku() {
    if (!this.skuInput.trim()) {
      this.toastr.warning('Please enter a SKU');
      return;
    }
    this.productService.getProductBySku(this.skuInput.trim()).subscribe({
      next: (p: ProductResponse) => {
        this.product = p;
        this.error = '';
        this.message = '';
        this.toastr.success(`Found product: ${p.name}`);
      },
      error: () => {
        this.product = null;
        this.error = 'Product not found';
        this.toastr.error('Product not found');
      }
    });
  }

  adjustStock() {
    if (!this.product || this.delta === null) {
      this.toastr.warning('Select a product and enter a delta');
      return;
    }

    this.stockService.adjustStock({
      productId: this.product.id,
      delta: this.delta,
      reason: this.reason as any
    }).subscribe({
      next: () => {
        this.message = `Stock updated! New quantity: ${this.product!.quantity + this.delta!}`;
        this.product!.quantity = this.product!.quantity + this.delta!;
        this.error = '';
        this.delta = null;
        this.toastr.success('Stock adjusted successfully');
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Adjustment failed';
        this.message = '';
        this.toastr.error(this.error);
      }
    });
  }
}

// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { ProductService } from '../../core/services/product.service';
// import { StockService } from '../../core/services/stock.service';
// import { WebSocketService } from '../../core/services/websocket.service';
// import { Subscription } from 'rxjs';
// import { ProductResponse } from 'src/app/shared/models/product';
// import { BarcodeFormat } from '@zxing/library';

// @Component({
//   selector: 'app-stock',
//   template: `
//     <app-navbar></app-navbar>
//     <div class="container mt-4">
//       <h2>📊 Adjust Stock</h2>

//       <div class="row mt-3">
//         <div class="col-md-6">
//           <div class="card p-3">
//             <h5>Barcode Scanner</h5>
//             <div class="mb-2">
//               <button class="btn btn-primary" (click)="toggleScanner()">
//                 {{ scannerEnabled ? 'Stop' : 'Start' }} Camera
//               </button>
//             </div>
//             <div *ngIf="scannerEnabled" style="max-width: 400px;">
//               <zxing-scanner
//                 (scanSuccess)="onScanSuccess($event)"
//                 [formats]="barcodeFormats">
//               </zxing-scanner>
//             </div>
//             <div class="mt-2">
//               <label>Or enter SKU manually:</label>
//               <div class="input-group">
//                 <input class="form-control" [(ngModel)]="skuInput" placeholder="Enter SKU" />
//                 <button class="btn btn-outline-secondary" (click)="searchBySku()">Search</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="col-md-6" *ngIf="product">
//           <div class="card p-3">
//             <h5>{{ product.name }} ({{ product.sku }})</h5>
//             <p>Current Stock: <strong>{{ product.quantity }}</strong></p>
//             <p>Price: \${{ product.price }}</p>
//             <hr />
//             <div class="mb-2">
//               <label>Delta (positive = receive, negative = sell/lost)</label>
//               <input class="form-control" type="number" [(ngModel)]="delta" placeholder="e.g., 10 or -5" />
//             </div>
//             <div class="mb-2">
//               <label>Reason</label>
//               <select class="form-select" [(ngModel)]="reason">
//                 <option value="RECEIVED">Received</option>
//                 <option value="SOLD">Sold</option>
//                 <option value="ADJUSTED">Adjusted</option>
//                 <option value="RETURNED">Returned</option>
//                 <option value="LOST">Lost</option>
//               </select>
//             </div>
//             <button class="btn btn-success" (click)="adjustStock()" [disabled]="!delta">
//               Apply Adjustment
//             </button>
//             <div *ngIf="message" class="alert alert-info mt-2">{{ message }}</div>
//             <div *ngIf="error" class="alert alert-danger mt-2">{{ error }}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `
// })
// export class StockComponent implements OnInit, OnDestroy {
//   barcodeFormats: BarcodeFormat[] = [
//     BarcodeFormat.QR_CODE,
//     BarcodeFormat.EAN_13,
//     BarcodeFormat.CODE_128,
//     BarcodeFormat.EAN_8
//   ];
//   scannerEnabled = false;
//   skuInput = '';
//   product: ProductResponse | null = null;
//   delta: number | null = null;
//   reason: string = 'RECEIVED';
//   message = '';
//   error = '';
//   private wsSubscription: Subscription | null = null;

//   constructor(
//     private productService: ProductService,
//     private stockService: StockService,
//     private webSocketService: WebSocketService,
//     private toastr: ToastrService
//   ) {}

//   ngOnInit() {
//     this.webSocketService.connect();
//     this.wsSubscription = this.webSocketService.getStockUpdates().subscribe({
//       next: (update: any) => {
//         this.toastr.info(
//           `Product ${update.sku} updated to ${update.newQuantity} (delta: ${update.delta})`,
//           'Stock Update'
//         );
//         if (this.product && this.product.id === update.productId) {
//           this.product.quantity = update.newQuantity;
//         }
//       },
//       error: (err: any) => console.error('WebSocket error', err)
//     });
//   }

//   ngOnDestroy() {
//     if (this.wsSubscription) {
//       this.wsSubscription.unsubscribe();
//     }
//     this.webSocketService.disconnect();
//   }

//   toggleScanner() {
//     this.scannerEnabled = !this.scannerEnabled;
//   }

//   onScanSuccess(scanResult: string) {
//     this.skuInput = scanResult;
//     this.searchBySku();
//   }

//   searchBySku() {
//     if (!this.skuInput.trim()) {
//       this.toastr.warning('Please enter a SKU');
//       return;
//     }
//     this.productService.getProductBySku(this.skuInput.trim()).subscribe({
//       next: (p: ProductResponse) => {
//         this.product = p;
//         this.error = '';
//         this.message = '';
//         this.toastr.success(`Found product: ${p.name}`);
//       },
//       error: (err: any) => {
//         this.product = null;
//         this.error = 'Product not found';
//         this.toastr.error('Product not found');
//       }
//     });
//   }

//   adjustStock() {
//     if (!this.product || this.delta === null) {
//       this.toastr.warning('Select a product and enter a delta');
//       return;
//     }

//     this.stockService.adjustStock({
//       productId: this.product.id,
//       delta: this.delta,
//       reason: this.reason as any
//     }).subscribe({
//       next: (res: any) => {
//         this.message = `Stock updated! New quantity: ${this.product!.quantity + this.delta!}`;
//         this.product!.quantity = this.product!.quantity + this.delta!;
//         this.error = '';
//         this.delta = null;
//         this.toastr.success('Stock adjusted successfully');
//       },
//       error: (err: any) => {
//         this.error = err.error?.message || 'Adjustment failed';
//         this.message = '';
//         this.toastr.error(this.error);
//       }
//     });
//   }
// }