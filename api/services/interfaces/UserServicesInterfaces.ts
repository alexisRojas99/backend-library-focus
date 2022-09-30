export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery {
  page?: number;
  per_page?: number;
  username?: string;
  is_suspended?: boolean;
}

export interface UserServicesInterfaces {
  index(index: RequestQuery): Promise<object>;
  getUserById(id: number): Promise<object>;
}
