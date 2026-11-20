import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { User } from '../models/user';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  users$: Observable<User[]> = this.usersSubject.asObservable();

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  loadUsers(): Observable<User[]> {
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