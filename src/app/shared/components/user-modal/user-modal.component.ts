import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CreateUserRequest, Role, UpdateUserRequest, UserResponse } from '../../models/user.model';

type SaveEvent =
  | { type: 'create'; data: CreateUserRequest }
  | { type: 'update'; id: number; data: UpdateUserRequest };

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html'
})
export class UserModalComponent implements OnChanges {
  @Input() user: UserResponse | null = null;
  @Output() save = new EventEmitter<SaveEvent>();
  @Output() close = new EventEmitter<void>();

  roles: Role[] = ['ADMIN', 'MANAGER', 'STAFF', 'VIEWER'];

  email = '';
  password = '';
  fullName = '';
  role: Role = 'STAFF';

  get isEditMode(): boolean {
    return !!this.user;
  }

  ngOnChanges() {
    if (this.user) {
      this.email = this.user.email;
      this.fullName = this.user.fullName;
      this.role = this.user.role;
      this.password = '';
    } else {
      this.email = '';
      this.password = '';
      this.fullName = '';
      this.role = 'STAFF';
    }
  }

  submit() {
    if (this.isEditMode && this.user) {
      this.save.emit({
        type: 'update',
        id: this.user.id,
        data: { fullName: this.fullName, role: this.role }
      });
    } else {
      this.save.emit({
        type: 'create',
        data: {
          email: this.email,
          password: this.password,
          fullName: this.fullName,
          role: this.role
        }
      });
    }
  }

  cancel() {
    this.close.emit();
  }
}