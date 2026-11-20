import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

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
    this.loaderService.isLoading$.subscribe((isLoading: boolean): void => {
      document.body.classList.toggle('loader-active', isLoading);
    });
  }

}