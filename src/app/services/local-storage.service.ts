import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    const item: string | null = localStorage.getItem(key);

    if (item === null) {
      return null;
    }

    const parsedItem: T = JSON.parse(item);

    return parsedItem;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}