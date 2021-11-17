import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable()

export class RouteGuard implements CanActivate {

  constructor(private auth: UserService,
              private state: StateService,
              private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (observer) => {
        this.auth.isAuth$.subscribe(
          (auth) => {
            if (auth) {
              this.router.navigate(['/home'])
            }
            observer.next(true);
          }
        );
      }
    );
  }
}
