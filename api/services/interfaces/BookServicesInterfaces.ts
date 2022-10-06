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

export interface RequestQueryCreateHistoryBook {
  id_user: number;
  isbn: string;
  quantity: number;
  movement_type: string;
}

export interface RequestQueryReturnBook {
  id: number;
}

export interface RequestQueryGetHistory {
  id: number;
  username: string;
  is_suspended: boolean;
  roles: Array<any>;
}

export interface BookServicesInterface {
  index(queryFilters: RequestQuery): Promise<object>;
  getBookById(id: string): Promise<object>;
  getHistory(idUser: RequestQueryGetHistory): Promise<object>;
  createBook(book: RequestQueryCreateBook): Promise<object>;
  createHistoryBook(book: RequestQueryCreateHistoryBook): Promise<object>;
  returnBook(bookRecord: RequestQueryReturnBook): Promise<object>;
}
