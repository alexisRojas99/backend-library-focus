export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery {
  page?: number;
  per_page?: number;
  username?: string;
  is_suspended?: boolean;
}

export interface BookServicesInterface {
  // index(index: RequestQuery): Promise<object>;
  index(): Promise<object>;
  getBookById(id: string): Promise<object>;
  getHistory(): Promise<object>;
}
