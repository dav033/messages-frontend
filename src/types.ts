export interface Message {
  id: string;
  body: string;
  typeM: string;
  sender: string;
  receiver: string;
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
