import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../core/services/category.service';
import { CategoryRequest, CategoryResponse } from '../../shared/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories: CategoryResponse[] = [];
  selected: CategoryResponse | null = null;
  showModal = false;

  constructor(private service: CategoryService, private toastr: ToastrService) {}

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data) => (this.categories = data),
      error: () => this.toastr.error('Failed to load categories')
    });
  }

  openAdd() { this.selected = null; this.showModal = true; }
  openEdit(c: CategoryResponse) { this.selected = c; this.showModal = true; }
  close() { this.showModal = false; this.selected = null; }

  handleSave(event: { id?: number; data: CategoryRequest }) {
    if (event.id) {
      this.service.update(event.id, event.data).subscribe({
        next: () => { this.toastr.success('Updated'); this.load(); this.close(); },
        error: (e) => this.toastr.error(e.error?.message || 'Failed')
      });
    } else {
      this.service.create(event.data).subscribe({
        next: () => { this.toastr.success('Created'); this.load(); this.close(); },
        error: (e) => this.toastr.error(e.error?.message || 'Failed')
      });
    }
  }

  delete(c: CategoryResponse) {
    if (confirm(`Delete "${c.name}"?`)) {
      this.service.delete(c.id).subscribe({
        next: () => { this.toastr.success('Deleted'); this.load(); },
        error: () => this.toastr.error('Delete failed')
      });
    }
  }
}