export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery {
  isbn?: string;
  title?: string;
  author?: string;
  genre?: string;
}

export interface BookServicesInterface {
  // index(index: RequestQuery): Promise<object>;
  index(queryFilters: RequestQuery): Promise<object>;
  getBookById(id: string): Promise<object>;
  getHistory(): Promise<object>;
}
