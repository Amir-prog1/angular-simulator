import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);

  users$: Observable<User[]> = this.userService.getUsers();

  isUsersLoaded: boolean = false;

  ngOnInit(): void {
    this.userService.loadUsers().subscribe((): void => {
      this.isUsersLoaded = true;
    });
  }

}