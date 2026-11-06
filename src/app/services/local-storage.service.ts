import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    return item === null ? null : JSON.parse(item) as T;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
