import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private readonly userService:UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const hasToken = this.userService.getToken()
  if(hasToken){
     const authReq = req.clone({
    headers: req.headers.set('Authorization', hasToken)
  });
  authReq.headers.append('Authorization',`Bearer:${hasToken}`)
      return next.handle(authReq)

  }
 
  
   return next.handle(req)
     
  }
}
