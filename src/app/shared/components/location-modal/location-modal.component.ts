import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { LocationRequest, LocationResponse } from '../../models/location.model';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html'
})
export class LocationModalComponent implements OnChanges {
  @Input() location: LocationResponse | null = null;
  @Output() save = new EventEmitter<{ id?: number; data: LocationRequest }>();
  @Output() close = new EventEmitter<void>();

  aisle = '';
  shelf = '';
  bin = '';
  description = '';

  get isEdit() { return !!this.location; }

  ngOnChanges() {
    if (this.location) {
      this.aisle = this.location.aisle;
      this.shelf = this.location.shelf;
      this.bin = this.location.bin;
      this.description = this.location.description;
    } else {
      this.aisle = ''; this.shelf = ''; this.bin = ''; this.description = '';
    }
  }

  submit() {
    this.save.emit({
      id: this.location?.id,
      data: {
        aisle: this.aisle,
        shelf: this.shelf,
        bin: this.bin,
        description: this.description
      }
    });
  }

  cancel() { this.close.emit(); }
}