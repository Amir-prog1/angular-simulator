import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { MessageType} from '../enums/message-type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public messages: Message[] = [];
  public addMessage(text: string, type: MessageType): void {
    const id = Date.now();

    const message: Message = {
      id: id,
      text: text,
      type: type,
    };

    this.messages.unshift(message);

    setTimeout(() => {
      this.closeMessage(id);
    }, 5000);
  }
  public closeMessage(id: number): void {
    this.messages =this.messages.filter(message => message.id !== id);
  }
}
