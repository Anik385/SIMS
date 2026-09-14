import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../core/services/location.service';
import { LocationRequest, LocationResponse } from '../../shared/models/location.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {
  locations: LocationResponse[] = [];
  selected: LocationResponse | null = null;
  showModal = false;

  constructor(private service: LocationService, private toastr: ToastrService) {}

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({
      next: (data) => (this.locations = data),
      error: () => this.toastr.error('Failed to load locations')
    });
  }

  openAdd() { this.selected = null; this.showModal = true; }
  openEdit(l: LocationResponse) { this.selected = l; this.showModal = true; }
  close() { this.showModal = false; this.selected = null; }

  handleSave(event: { id?: number; data: LocationRequest }) {
    if (event.id) {
      this.service.update(event.id, event.data).subscribe({
        next: () => { this.toastr.success('Updated'); this.load(); this.close(); },
        error: () => this.toastr.error('Failed')
      });
    } else {
      this.service.create(event.data).subscribe({
        next: () => { this.toastr.success('Created'); this.load(); this.close(); },
        error: () => this.toastr.error('Failed')
      });
    }
  }

  delete(l: LocationResponse) {
    if (confirm(`Delete location ${l.aisle}-${l.shelf}-${l.bin}?`)) {
      this.service.delete(l.id).subscribe({
        next: () => { this.toastr.success('Deleted'); this.load(); },
        error: () => this.toastr.error('Delete failed')
      });
    }
  }
}