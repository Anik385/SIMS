import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ProductRequest, ProductResponse } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: ProductResponse[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  selectedProduct: ProductResponse | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.page, this.size).subscribe({
      next: (pageData) => {
        this.products = pageData.content;
        this.totalPages = pageData.totalPages;
      }
    });
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  openModal(product?: ProductResponse) {
    this.selectedProduct = product || null;
  }

  closeModal() {
    this.selectedProduct = null;
  }

  saveProduct(product: ProductRequest) {
    if (this.selectedProduct && this.selectedProduct.id) {
      this.productService.updateProduct(this.selectedProduct.id, product).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
        }
      });
    } else {
      this.productService.createProduct(product).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
        }
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts()
      });
    }
  }
}