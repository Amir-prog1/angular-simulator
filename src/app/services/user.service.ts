import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { User } from '../models/user';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  users$: Observable<User[]> = this.usersSubject.asObservable();

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setItem<User[]>('users', users);
  }

  addUser(user: User): void {
    const users: User[] = [...this.usersSubject.value, user];

    this.setUsers(users);
  }

  deleteUser(userId: number): void {
    const users: User[] = this.usersSubject.value.filter(
      (user: User): boolean => user.id !== userId,
    );

    this.setUsers(users);
  }

  loadUsers(): Observable<User[]> {
    let cachedUsers: User[] | null = null;

    try {
      cachedUsers = this.localStorageService.getItem<User[]>('users');
    } catch {
      this.localStorageService.removeItem('users');
    }

    if (cachedUsers !== null && Array.isArray(cachedUsers)) {
      this.usersSubject.next(cachedUsers);
      return of(cachedUsers);
    }

    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(
      tap((users: User[]): void => {
        this.setUsers(users);
      }),
      catchError((): Observable<User[]> => {
        this.messageService.showError('Не удалось загрузить пользователей');
        return of([]);
      }),
      finalize((): void => {
        this.loaderService.hideLoader();
      }),
    );
  }

}