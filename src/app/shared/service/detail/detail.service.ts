import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

export interface Product {
  id: number;
  name: string,
  description: string,
  present: boolean,
  rate: number
}

@Injectable()
export class DetailService {

  public API = '//mighty-reef-79555.herokuapp.com/api/v1';
  public GOODS_API = this.API + '/goods';
  public CATEGORIES_API = this.API + '/categories';
  public SEARCH_AUTOCOMPLETE_API = this.API + '/search/autocomplete';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.CATEGORIES_API);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(this.GOODS_API + '/' + id);
  }

  getAutoComplete(query: string, page: number, size: number) {
    return this.http.get(this.SEARCH_AUTOCOMPLETE_API + '/?query=' + query + "&page=" + page + "&size=" + size);
  }

  findGoodsByCategoryId(query: string, page: number, size: number): Observable<any> {
    return this.http.get(this.GOODS_API + '?categoryId=' + query + "&page=" + page + "&size=" + size);
  }

  findGoodsById(id: string): Observable<Product> {
    return this.http.get<Product>(this.GOODS_API + '/' + id);
  }

  addRate(id: string) {
    this.http.post(this.GOODS_API + '/rate/' + id, null).subscribe();
  }

}
