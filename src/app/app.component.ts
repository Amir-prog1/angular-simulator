import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Color } from '../enums/Color';
import { Collection } from '../collection';

interface Program {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public companyName: string = 'РУМТИБЕТ';

  public programs: Program[] = [
    {
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает \nнезависимые способы реализации соответствующих условий активизации.',
      icon: '/images/icon/people.svg'
    },
    {
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает \nнезависимые способы реализации соответствующих условий активизации.',
      icon: '/images/icon/safety.svg'
    },
    {
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает \nнезависимые способы реализации соответствующих условий активизации.',
      icon: '/images/icon/loyalty.svg'
    }
  ];

  public cities = new Collection<string>([
    'Рим',
    'Ташкент',
    'Осло',
    'Лондон',
    'Париж'
  ]);

  public participants = new Collection<number>([
    1,
    2,
    3,
    4,
    5
  ]);

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

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }

  ngOnInit(): void {
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

    localStorage.setItem('lastVisit', currentDate);
  }

  private saveVisitCount(): void {
    const currentCount = Number(
      localStorage.getItem('visitCount') || '0'
    );

    localStorage.setItem(
      'visitCount',
      String(currentCount + 1)
    );
  }
}