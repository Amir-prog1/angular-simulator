import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { LocalStorageService } from './services/local-storage.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoading: boolean = true;
  private loaderId: ReturnType<typeof setTimeout> | null = null;

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  public ngOnInit(): void {
    this.saveLastVisit();
    this.saveVisitCount();

    this.loaderId = setTimeout((): void => {
      this.isLoading = false;
    }, 2000);
  }

  public ngOnDestroy(): void {
    if (this.loaderId !== null) {
      clearTimeout(this.loaderId);
    }
  }

  private saveLastVisit(): void {
    const currentDate: string = new Date().toISOString();
    this.localStorageService.setItem('lastVisit', currentDate);
  }

  private saveVisitCount(): void {
    const currentCount: number =
      this.localStorageService.getItem<number>('visitCount') ?? 0;

    this.localStorageService.setItem('visitCount', currentCount + 1);
  }
}