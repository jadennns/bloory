export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
}

export interface Channel {
  members: User[];
  id: string;
  name: string;
  icon: string;
  createdAt: string;
}

export interface Message {
  content: string;
  id: string;
  author: User;
  channel_id: string;
  createdAt: string;
}
