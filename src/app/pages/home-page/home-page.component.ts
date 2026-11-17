import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { Color } from '../../../enums/Color';
import { Collection } from '../../../collection';
import { LocalStorageService } from '../../services/local-storage.service';

interface Program {
  title: string;
  description: string;
  image: string;
}

interface PopularCard {
  image: string;
  alt: string;
  rating: string;
  title: string;
  description: string;
  price: number;
}

interface BlogCard {
  image: string;
  alt: string;
  title: string;
  description: string;
  date: string;
  id: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {
  private messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

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

  public popularCards: PopularCard[] = [
    {
      image: 'lough',
      alt: 'Озеро',
      rating: '4.9',
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480,
    },
    {
      image: 'night-in-the-mountains',
      alt: 'Горы',
      rating: '4.5',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500,
    },
    {
      image: 'stretching-in-the-mountains',
      alt: 'Скалы',
      rating: '5.0',
      title: 'Растяжка в горах',
      description: 'для тех, кто заботится о себе',
      price: 230,
    },
  ];

  public blogCards: BlogCard[] = [
    {
      image: 'italy',
      alt: 'Италия',
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      id: 'blog-article-italy',
    },
    {
      image: 'airplane',
      alt: 'Самолёт',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      id: 'blog-article-world',
    },
    {
      image: 'narrow-street',
      alt: 'Улочка',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      id: 'blog-article-solo-travel',
    },
    {
      image: 'india',
      alt: 'Индия',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      id: 'blog-article-india',
    },
  ];

  public cities: Collection<string> = new Collection<string>([
    'Рим', 'Ташкент', 'Осло', 'Лондон', 'Париж',
  ]);

  public participants: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);

  public location: string = '';
  public tourDate: string = '';
  public participantCount: number | null = null;

  public currentDate: Date = new Date();
  private timerId: ReturnType<typeof setInterval> | null = null;

  public counter: number = 0;
  public showTimer: boolean = true;
  public liveText: string = '';

  public ngOnInit(): void {
    this.saveLastVisit();
    this.saveVisitCount();

    this.timerId = setInterval((): void => {
      this.currentDate = new Date();
    }, 1000);
  }

  public ngOnDestroy(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }
  }

  public showSuccess(): void {
    this.messageService.showSuccess('Направления получены');
  }

  public showInfo(): void {
    this.messageService.showInfo('Стоимость отправлена на почту');
  }

  public showWarning(): void {
    this.messageService.showWarn('Программа недоступна');
  }

  public showError(): void {
    this.messageService.showError('Материалы недоступны');
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
    const currentDate: string = new Date().toISOString();

    this.localStorageService.setItem('lastVisit', currentDate);
  }

  private saveVisitCount(): void {
    const currentCount: number =
      this.localStorageService.getItem<number>('visitCount') ?? 0;

    this.localStorageService.setItem('visitCount', currentCount + 1);
  }
}