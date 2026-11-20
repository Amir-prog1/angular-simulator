import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';

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

  userForm: FormGroup<{
    name: FormControl<string>;
    username: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
    website: FormControl<string>;
    city: FormControl<string>;
  }> = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    website: [''],
    city: [''],
  });

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue: {
      name: string;
      username: string;
      email: string;
      phone: string;
      website: string;
      city: string;
    } = this.userForm.getRawValue();

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