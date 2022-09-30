import { Request } from 'express';

export type Login = {
  username: string;
  password: string;
}

export type UserToken = {
  id: number;
  username: string;
  is_suspended: boolean;
  roles: string[];
}
export interface MainServicesInterfaces {
  login(login: Login): Promise<object>;
  authToken(user: UserToken): Promise<object>;
}
