import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ID } from '@datorama/akita';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  id?: ID;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
    private http: HttpClient
  ) {
  }

  find(filter: string): Observable<User[]> {
    return this.http.post<User[]>('api/api/protected/users/list', {filter}).pipe(
      catchError(err => of(err))
    );
  }
}
