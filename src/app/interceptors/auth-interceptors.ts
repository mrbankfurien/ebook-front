import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.token ? this.auth.token : 'DEFAULT_USER_EBOOK';
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'BANKS_EBOOK_APPS ' + authToken)
    });
    return next.handle(newRequest);
  }
}
