import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { MessageType } from '../enums/message-type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public messages: Message[] = [];
  public addMessage(text: string, type: MessageType): void {
    const id: number = Date.now();

    const message: Message = {
      id,
      text,
      type,
    };

    this.messages = [message, ...this.messages];

    setTimeout(() => {
      this.closeMessage(id);
    }, 5000);
  }
  public closeMessage(id: number): void {
    this.messages = this.messages.filter((message: Message): boolean => message.id !== id);
  }
}