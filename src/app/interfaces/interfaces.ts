export interface User {
  id: string;
  email: string;
  name: string
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}
