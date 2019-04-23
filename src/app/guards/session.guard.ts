import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionQuery } from '../state/session/session.query';
import { map, take } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionQuery: SessionQuery,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionQuery.selectToken().pipe(
      take(1),
      map(x => !!x),
      tap(res => res ? null : this.router.navigateByUrl('/auth'))
    );
  }

}
