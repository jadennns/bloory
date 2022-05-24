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
