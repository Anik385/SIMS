import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { ProductRequest, ProductResponse } from '../../models/product.model';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html'
})
export class ProductModalComponent implements OnChanges {
  @Input() product: ProductResponse | null = null;
  @Output() save = new EventEmitter<ProductRequest>();
  @Output() close = new EventEmitter<void>();

  form: ProductRequest = {
    sku: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    quantity: 0,
    reorderThreshold: 5
  };

  get visible(): boolean {
    return this.product !== null;
  }

  ngOnChanges() {
    if (this.product) {
      this.form = {
        sku: this.product.sku,
        name: this.product.name,
        description: this.product.description || '',
        category: this.product.category || '',
        price: this.product.price,
        quantity: this.product.quantity,
        reorderThreshold: this.product.reorderThreshold
      };
    } else {
      this.form = {
        sku: '',
        name: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        reorderThreshold: 5
      };
    }
  }

  saveProduct() {
    this.save.emit(this.form);
  }

  closeModal() {
    this.close.emit();
  }
}

// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { ProductRequest, ProductResponse } from '../../models/product';

// @Component({
//   selector: 'app-product-modal',
//   template: `
//     <div class="modal show d-block" *ngIf="visible" style="background: rgba(0,0,0,0.5);">
//       <div class="modal-dialog">
//         <div class="modal-content">
//           <div class="modal-header">
//             <h5 class="modal-title">{{ product?.id ? 'Edit' : 'Add' }} Product</h5>
//             <button type="button" class="btn-close" (click)="closeModal()"></button>
//           </div>
//           <div class="modal-body">
//             <div class="mb-2">
//               <label>SKU</label>
//               <input class="form-control" [(ngModel)]="form.sku" placeholder="P-001" />
//             </div>
//             <div class="mb-2">
//               <label>Name</label>
//               <input class="form-control" [(ngModel)]="form.name" placeholder="Product Name" />
//             </div>
//             <div class="mb-2">
//               <label>Category</label>
//               <input class="form-control" [(ngModel)]="form.category" placeholder="Electronics" />
//             </div>
//             <div class="mb-2">
//               <label>Price</label>
//               <input class="form-control" type="number" [(ngModel)]="form.price" />
//             </div>
//             <div class="mb-2">
//               <label>Quantity</label>
//               <input class="form-control" type="number" [(ngModel)]="form.quantity" />
//             </div>
//             <div class="mb-2">
//               <label>Reorder Threshold</label>
//               <input class="form-control" type="number" [(ngModel)]="form.reorderThreshold" />
//             </div>
//           </div>
//           <div class="modal-footer">
//             <button class="btn btn-secondary" (click)="closeModal()">Cancel</button>
//             <button class="btn btn-primary" (click)="saveProduct()">Save</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   `
// })
// export class ProductModalComponent {
//   @Input() product: ProductResponse | null = null;
//   @Output() save = new EventEmitter<ProductRequest>();
//   @Output() close = new EventEmitter<void>();

//   form: ProductRequest = {
//     sku: '',
//     name: '',
//     description: '',
//     category: '',
//     price: 0,
//     quantity: 0,
//     reorderThreshold: 5
//   };

//   get visible(): boolean {
//     return this.product !== null;
//   }

//   ngOnChanges() {
//     if (this.product) {
//       this.form = {
//         sku: this.product.sku,
//         name: this.product.name,
//         description: this.product.description,
//         category: this.product.category,
//         price: this.product.price,
//         quantity: this.product.quantity,
//         reorderThreshold: this.product.reorderThreshold
//       };
//     } else {
//       this.form = { sku: '', name: '', category: '', price: 0, quantity: 0, reorderThreshold: 5, description: '' };
//     }
//   }

//   saveProduct() {
//     this.save.emit(this.form);
//   }

//   closeModal() {
//     this.close.emit();
//   }
// }