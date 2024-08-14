export interface Message {
  id: string;
  createdAt: string;
  author: string;
  message: string;
}

export type MessageMutation = Omit<Message, 'id' | 'createdAt'>;
