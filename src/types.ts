export interface Message {
  id: string;
  body: string;
  typeM: string;
  sender: string;
  sender_name: string;
  receiver: string | number;
  readed: number[];
  datetime: string;
}

export interface MessageData {
  id: string;
  body: string;
  typeM: string;
  sender: string;
  sender_name: string;
  receiver: string;
  readed: number[];
  datetime: string;
  differentUser: boolean;
}

export interface Chat {
  id: number;
  last_message: Message | null;
  messages: number[];
  type_room: string;
  unreaded_messages: Message[];
  users: number[];
  name: string;
}
