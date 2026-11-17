export class Collection<T> {

  private items: T[] = [];

  constructor(items: T[] = []) {
    this.items = [...items];
  }

  getAll(): T[] {
    return [...this.items];
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  clear(): void {
    this.items = [];
  }

  remove(index: number): void {
    this.items = this.items.filter(
      (_item: T, itemIndex: number): boolean => itemIndex !== index,
    );
  }

  replace(index: number, item: T): void {
    this.items = this.items.map(
      (currentItem: T, itemIndex: number): T =>
        itemIndex === index ? item : currentItem,
    );
  }

}