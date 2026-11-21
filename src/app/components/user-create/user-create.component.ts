import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';

interface UserCreateFormValue {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  city: string;
}

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
    city: this.formBuilder.nonNullable.control(''),
  });

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue: UserCreateFormValue = this.userForm.getRawValue();

    const user: User = {
      id: Date.now(),
      name: formValue.name,
      username: formValue.username,
      email: formValue.email,
      phone: formValue.phone,
      website: formValue.website,
      address: {
        street: '',
        suite: '',
        city: formValue.city,
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    };

    this.createUser.emit(user);
    this.userForm.reset();
  }

}