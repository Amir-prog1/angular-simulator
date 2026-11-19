import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';
import { MessageType } from '../enums/message-type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  messages$: Observable<Message[]> = this.messagesSubject.asObservable();

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

  closeMessage(id: number): void {
    const messages: Message[] = this.messagesSubject.getValue();

    this.messagesSubject.next(
      messages.filter(
        (message: Message): boolean => message.id !== id,
      ),
    );
  }

  private addMessage(text: string, type: MessageType): void {
    const id: number = Date.now();

    const message: Message = {
      id,
      text,
      type,
    };

    const messages: Message[] = this.messagesSubject.getValue();

    this.messagesSubject.next([message, ...messages]);

    setTimeout((): void => {
      this.closeMessage(id);
    }, 5000);
  }

}