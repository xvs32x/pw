import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStore } from './session.store';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { UserInfoService } from '../user-info/user-info.service';
import { SessionQuery } from './session.query';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class SessionService {

  constructor(
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
    private http: HttpClient,
    private userInfoService: UserInfoService,
    private router: Router,
  ) {
  }

  login(payload: { email: string; password: string }): Observable<any> {
    this.sessionStore.setLoading(true);
    return this.http.post<{ id_token: string }>('api/sessions/create', payload).pipe(
      tap(res => this.sessionStore.setToken(res.id_token)),
      tap(() => this.sessionStore.setLoading(false)),
      tap(() => this.router.navigateByUrl('/transaction')),
      catchError((err) => {
        this.sessionStore.setError(err);
        this.sessionStore.setLoading(false);
        return of(err);
      })
    );
  }

  register(payload: { username: string; email: string; password: string }): Observable<string> {
    this.sessionStore.setLoading(true);
    return this.http.post<{ id_token: string }>('/api/users', payload).pipe(
      tap(res => this.sessionStore.setToken(res.id_token)),
      tap(() => this.sessionStore.setLoading(false)),
      tap(() => this.router.navigateByUrl('/transaction')),
      catchError((err) => {
        this.sessionStore.setError(err);
        this.sessionStore.setLoading(false);
        return of(err);
      })
    );
  }

  logout() {
    this.sessionStore.setToken(null);
    this.userInfoService.clear();
  }
}
