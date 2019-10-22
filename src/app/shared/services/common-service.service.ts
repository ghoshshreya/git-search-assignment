import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators/catchError'; 

@Injectable()
export class CommonService {

  constructor(private _http: HttpClient) { }

  get(url): Observable<any> {
    return this._http.get(url).pipe(catchError(this.handleError));;
  }

  private handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) 
    {
        errorMessage = `Error: ${error.error.message}`;
    }
    else 
    {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}