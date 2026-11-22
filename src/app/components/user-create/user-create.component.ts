import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';

type UserCreateFormValue = Omit<User, 'id'>;

type FormControls<T> = {
  [K in keyof T]: T[K] extends object
    ? FormGroup<FormControls<T[K]>>
    : FormControl<T[K]>;
};

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {

  @Output() createUser: EventEmitter<User> = new EventEmitter<User>();

  private formBuilder: FormBuilder = inject(FormBuilder);

  userForm: FormGroup<FormControls<UserCreateFormValue>> = this.formBuilder.nonNullable.group({
    name: this.formBuilder.nonNullable.control('', Validators.required),
    username: this.formBuilder.nonNullable.control('', Validators.required),
    email: this.formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
    phone: this.formBuilder.nonNullable.control(''),
    website: this.formBuilder.nonNullable.control(''),
    address: this.formBuilder.nonNullable.group({
      street: this.formBuilder.nonNullable.control(''),
      suite: this.formBuilder.nonNullable.control(''),
      city: this.formBuilder.nonNullable.control(''),
      zipcode: this.formBuilder.nonNullable.control(''),
      geo: this.formBuilder.nonNullable.group({
        lat: this.formBuilder.nonNullable.control(''),
        lng: this.formBuilder.nonNullable.control(''),
      }),
    }),
    company: this.formBuilder.nonNullable.group({
      name: this.formBuilder.nonNullable.control(''),
      catchPhrase: this.formBuilder.nonNullable.control(''),
      bs: this.formBuilder.nonNullable.control(''),
    }),
  });

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue: UserCreateFormValue = this.userForm.getRawValue();

    const user: User = {
      id: Date.now(),
      ...formValue,
    };

    this.createUser.emit(user);
    this.userForm.reset();
  }

}