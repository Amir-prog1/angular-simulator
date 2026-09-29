import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from '../collection';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public companyName: string = 'РУМТИБЕТ';

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

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
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