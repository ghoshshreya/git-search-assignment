import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService {

  constructor(private _http: HttpClient) { }

  get(url) {
    console.error(url);
    return this._http.get(url);
    // .catchError(this.handleError('searchHeroes', [])  //TODO
  }

  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) 
  {
    console.error('Exception occurred :: ', error.error.message);
  } 
  return throwError(
    'Something bad happened; please try again later.');
};

}