export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery {
  page?: number;
  per_page?: number;
  username?: string;
  is_suspended?: boolean;
}

export interface RequestQueryCreateUser {
  firstname: string;
  lastname: number;
  username: string;
  id_role: number;
  password: string;
}

export interface UserServicesInterfaces {
  index(index: RequestQuery): Promise<object>;
  getUserById(id: number): Promise<object>;
  createUser(dataUser: RequestQueryCreateUser): Promise<object>;
}
