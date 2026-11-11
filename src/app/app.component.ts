import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MessageService } from './services/message.service';
import { MessageType } from './enums/message-type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { LocalStorageService } from './services/local-storage.service';

interface Program {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public MessageType = MessageType;

  public showSuccess(): void {
    this.messageService.addMessage('Направления получены', MessageType.SUCCESS);
  }

  public showInfo(): void {
    this.messageService.addMessage('Стоимость отправлена на почту', MessageType.INFO);
  }

  public showWarning(): void {
    this.messageService.addMessage('Программа недоступна', MessageType.WARN);
  }

  public showError(): void {
    this.messageService.addMessage('Материалы недоступны', MessageType.ERROR);
  }

  public companyName: string = 'РУМТИБЕТ';

  public programs: Program[] = [
    {
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает \nнезависимые способы реализации соответствующих условий активизации.',
      image: 'people-icon',
    },
    {
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает \nнезависимые способы реализации соответствующих условий активизации.',
      image: 'safety-icon',
    },
    {
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает \nнезависимые способы реализации соответствующих условий активизации.',
      image: 'loyalty-icon',
    },
  ];

  public cities = new Collection<string>([
    'Рим',
    'Ташкент',
    'Осло',
    'Лондон',
    'Париж',
  ]);

  public participants = new Collection<number>([1, 2, 3, 4, 5]);

  public location: string = '';
  public tourDate: string = '';
  public participantCount: number | null = null;

  public currentDate: Date = new Date();
  private timerId: ReturnType<typeof setInterval> | null = null;

  public counter: number = 0;

  public showTimer: boolean = true;

  public liveText: string = '';

  public isLoading: boolean = true;
  private loaderId: ReturnType<typeof setTimeout> | null = null;

  public messageService = inject(MessageService);
  private localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.saveLastVisit();
    this.saveVisitCount();

    this.timerId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);

    this.loaderId = setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    if (this.loaderId) {
      clearTimeout(this.loaderId);
    }
  }

  public increaseCounter(): void {
    this.counter++;
  }

  public decreaseCounter(): void {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  public toggleTask(): void {
    this.showTimer = !this.showTimer;
  }

  public isFormValid(): boolean {
    return !!(
      this.location &&
      this.tourDate &&
      this.participantCount
    );
  }

  public isPrimaryColor(color: Color): boolean {
    return (
      color === Color.RED ||
      color === Color.GREEN ||
      color === Color.BLUE
    );
  }

  private saveLastVisit(): void {
    const currentDate = new Date().toISOString();

    this.localStorageService.setItem('lastVisit', currentDate);
  }

  private saveVisitCount(): void {
    const currentCount: number =
      this.localStorageService.getItem<number>('visitCount') ?? 0;

    this.localStorageService.setItem('visitCount', currentCount + 1);
  }
}