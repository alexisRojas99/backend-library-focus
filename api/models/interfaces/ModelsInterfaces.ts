export interface UsersRoles {
  id_user: number;
  id_role: number;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  UsersRoles: UsersRoles;
}

export interface User {
  update(arg0: { [key: string]: any; }): unknown;
  id: number;
  username: string;
  password: string;
  last_login: string;
  is_suspended: boolean;
  created_at: string;
  Roles: Role[];
}
