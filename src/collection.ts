export class Collection<T> {
  private items: T[] = [];

  constructor(items: T[] = []) {
    this.items = [...items];
  }

  public getAll(): T[] {
    return [...this.items];
  }

  public get(index: number): T | undefined {
    return this.items[index];
  }

  public clear(): void {
    this.items = [];
  }

  public remove(index: number): void {
    this.items = this.items.filter(
      (_item: T, itemIndex: number): boolean => itemIndex !== index,
    );
  }

  public replace(index: number, item: T): void {
    this.items = this.items.map(
      (currentItem: T, itemIndex: number): T =>
        itemIndex === index ? item : currentItem,
    );
  }
}