import { Component, DestroyRef, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  private destroyRef: DestroyRef = inject(DestroyRef);

  searchControl: FormControl<string> = new FormControl('', {
    nonNullable: true,
  });

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((value: string): void => {
      this.searchChange.emit(value);
    });
  }

}