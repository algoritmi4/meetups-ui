export interface IUser {
  user_id: number;
  username: string;
  image_url: string;
}

export interface IMessage {
  message_id: number;
  sender_id: number;
  message_text: string;
  created_at: string;
}

export interface IRoomInfo {
  chat_id: number;
  type: string;
  participants: IUser[];
  messages: IMessage[];
}
