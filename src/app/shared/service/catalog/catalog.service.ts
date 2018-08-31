import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {CreateCategoryRequest} from "../../../product-dashboard/category-add/category-add.component";

export interface CategoryPage {
  content: Category[],
  size: number,
  page: number
}

export interface Category {
  id: number;
  goodsSize: number;
  name: string
}

@Injectable()
export class CatalogService {
  public API = '//mighty-reef-79555.herokuapp.com/api/v1';
  public CATEGORIES_API = this.API + '/categories';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<CategoryPage> {
    return this.http.get<any>(this.CATEGORIES_API)
      .pipe(
        catchError(this.handleError('getAll', []))
      );
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.CATEGORIES_API + '/' + id);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(s: string) {
    alert(s);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.CATEGORIES_API + '/' + id)
      .pipe(
        catchError(this.handleError('delete', []))
      );

  }

  createCategory(category: CreateCategoryRequest): Observable<any> {
    return this.http.post(this.CATEGORIES_API, category);
  }
}
