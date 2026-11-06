import { MessageType } from '../enums/message-type';

export interface Message {
  id: number;
  text: string;
  type: MessageType;
}