import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    CommonModule,
    UserCardComponent,
    UserCreateComponent,
    UsersFilterComponent,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  users$: Observable<User[]> = this.userService.getUsers();

  filteredUsers$: Observable<User[]>;

  isUsersLoaded: boolean = false;

  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.searchSubject,
    ]).pipe(
      map(([users, search]: [User[], string]): User[] => {
        const normalizedSearch: string = search.trim().toLowerCase();

        return users.filter((user: User): boolean =>
          user.name.trim().toLowerCase().includes(normalizedSearch),
        );
      }),
    );
  }

  ngOnInit(): void {
    this.userService.loadUsers().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((): void => {
      this.isUsersLoaded = true;
    });
  }

  onCreateUser(user: User): void {
    this.userService.addUser(user);
  }

  onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }

  onSearchChange(search: string): void {
    this.searchSubject.next(search);
  }

}