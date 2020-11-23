import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    authReq = req.clone({headers: req.headers.set('Content-Type', 'application/json')})
    const token = this.token.getToken();
    console.log("interceptor: "+token);
    if(token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token)})
    }
    return  next.handle((authReq));
  }
}
