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
    name: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    username: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100),
    ]),
    phone: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(25),
    ]),
    website: this.formBuilder.nonNullable.control('', Validators.maxLength(100)),
    address: this.formBuilder.nonNullable.group({
      street: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      suite: this.formBuilder.nonNullable.control('', Validators.maxLength(50)),
      city: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      zipcode: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      geo: this.formBuilder.nonNullable.group({
        lat: this.formBuilder.nonNullable.control('', Validators.required),
        lng: this.formBuilder.nonNullable.control('', Validators.required),
      }),
    }),
    company: this.formBuilder.nonNullable.group({
      name: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      catchPhrase: this.formBuilder.nonNullable.control('', Validators.maxLength(200)),
      bs: this.formBuilder.nonNullable.control('', Validators.maxLength(100)),
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