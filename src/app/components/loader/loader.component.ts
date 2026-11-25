import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  loaderService: LoaderService = inject(LoaderService);

  constructor() {
    this.loaderService.isLoading$.pipe(
      takeUntilDestroyed(),
    ).subscribe((isLoading: boolean): void => {
      document.body.classList.toggle('loader-active', isLoading);
    });
  }

}