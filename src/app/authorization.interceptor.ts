import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';  // <-- Import your AuthService

@Injectable() 
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
   
    const authToken = this.authService.getAuthorizationToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return next.handle(authReq);
  }
}
