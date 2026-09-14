import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';
import { CreateUserRequest, UpdateUserRequest, UserResponse } from '../../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: UserResponse[] = [];
  selectedUser: UserResponse | null = null;
  showModal = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: () => this.toastr.error('Failed to load users')
    });
  }

  openAddModal() {
    this.selectedUser = null;
    this.showModal = true;
  }

  openEditModal(user: UserResponse) {
    this.selectedUser = user;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
  }

  handleSave(event: { type: 'create'; data: CreateUserRequest } | { type: 'update'; id: number; data: UpdateUserRequest }) {
    if (event.type === 'create') {
      this.userService.createUser(event.data).subscribe({
        next: () => {
          this.toastr.success('User created successfully');
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Creation failed');
        }
      });
    } else {
      this.userService.updateUser(event.id, event.data).subscribe({
        next: () => {
          this.toastr.success('User updated successfully');
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => this.toastr.error(err.error?.message || 'Update failed')
      });
    }
  }

  deleteUser(user: UserResponse) {
    if (confirm(`Delete user ${user.email}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.toastr.success('User deleted');
          this.loadUsers();
        },
        error: () => this.toastr.error('Delete failed')
      });
    }
  }
}