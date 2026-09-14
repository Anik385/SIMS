import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CategoryRequest, CategoryResponse } from '../../models/category.model';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html'
})
export class CategoryModalComponent implements OnChanges {
  @Input() category: CategoryResponse | null = null;
  @Output() save = new EventEmitter<{ id?: number; data: CategoryRequest }>();
  @Output() close = new EventEmitter<void>();

  name = '';
  description = '';

  get isEdit() { return !!this.category; }

  ngOnChanges() {
    if (this.category) {
      this.name = this.category.name;
      this.description = this.category.description;
    } else {
      this.name = '';
      this.description = '';
    }
  }

  submit() {
    const data: CategoryRequest = { name: this.name, description: this.description };
    this.save.emit({ id: this.category?.id, data });
  }

  cancel() { this.close.emit(); }
}