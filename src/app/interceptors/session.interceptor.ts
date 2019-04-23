import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { flatMap, last, take } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Router } from '@angular/router';
import { SessionQuery } from '../state/session/session.query';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private sessionQuery: SessionQuery,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.sessionQuery.selectToken().pipe(
      take(1),
      flatMap((token: string) => {
        // If user is guest
        if (!token) {
          return next.handle(req);
        }
        // Set header if all ok
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
        return next.handle(authReq);
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.error === 'UnauthorizedError') {
            this.router.navigateByUrl('/auth');
          }
        }
        return throwError(err);
      })
    );
  }
}

