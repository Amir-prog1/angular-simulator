import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { MessageType } from '../enums/message-type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: Message[] = [];

  showWarn(text: string): void {
    this.addMessage(text, MessageType.WARN);
  }

  showError(text: string): void {
    this.addMessage(text, MessageType.ERROR);
  }

  showSuccess(text: string): void {
    this.addMessage(text, MessageType.SUCCESS);
  }

  showInfo(text: string): void {
    this.addMessage(text, MessageType.INFO);
  }

  private addMessage(text: string, type: MessageType): void {
    const id: number = Date.now();

    const message: Message = {
      id,
      text,
      type,
    };

    this.messages = [message, ...this.messages];

    setTimeout((): void => {
      this.closeMessage(id);
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter(
      (message: Message): boolean => message.id !== id,
    );
  }

}