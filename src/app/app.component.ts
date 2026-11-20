import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { LoaderComponent } from './components/loader/loader.component';
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
    LoaderComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.saveLastVisit();
    this.saveVisitCount();
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