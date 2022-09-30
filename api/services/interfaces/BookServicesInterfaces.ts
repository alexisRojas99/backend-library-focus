export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery {
  isbn?: string;
  title?: string;
  author?: string;
  genre?: string;
}

export interface RequestQueryCreateBook {
  isbn: string;
  title: string;
  author: string;
  genre: string;
  image: string;
  published_year: number;
  stock: number;
}

export interface BookServicesInterface {
  // index(index: RequestQuery): Promise<object>;
  index(queryFilters: RequestQuery): Promise<object>;
  getBookById(id: string): Promise<object>;
  getHistory(): Promise<object>;
  createBook(book: RequestQueryCreateBook): Promise<object>;
}
