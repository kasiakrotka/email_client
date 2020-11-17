import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "./user.model";
import {TokenStorageService} from "./token-storage.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<User>(null);
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  signup(email: string, password: string, time: number) {
    let url = "http://localhost:8080/register";

    return this.http.post<any>(url,
      {
        address: email+"@ghost.com",
        password: password,
        expireTime: time
      }, {observe: "response"},).pipe(
        catchError(this.handleError), tap(response => {
        console.log(response);
        this.login(email, password);
        })
    );
  }


  login(email: string, password: string) {
    let url = "http://localhost:8080/login";
    return this.http.post<any>(url,
      {
        address: email+"@ghost.com",
        password: password
      }, {observe: 'response'}).pipe(
        catchError(this.handleError) ,
        tap(response => {
          let headers = response.headers;
          const expirationDate = new Date (new Date().getTime() + headers.get('expires'));
          this.tokenStorage.saveUser(this.handleAuth(
            headers.get('Authorization'),
            headers.get('address'),
            headers.get('startDate'),
            headers.get('endDate'),
            expirationDate));
          this.tokenStorage.saveToken(response.headers.get('Authorization').substring(7));
        })
    );
  }

  private handleAuth(auth: String, address: String, startDate: String, endDate: String, expirationDate: Date) {
    const user = new User(auth, address, startDate, endDate, expirationDate);
    this.user.next(user);
    return user;
  }

  private handleError(errorResp: HttpErrorResponse) {

    let errorMessage = errorResp.error.message;

    switch(errorMessage) {
      case 'EMAIL_EXISTS':
        errorMessage = "Ten adres email jest już zajęty.";
        break;
      case 'ERROR_AUTH':
        errorMessage = "Niepoprawny email lub hasło";
        break;
    }
    return throwError(errorMessage);
  }

  getToken() {
    return this.tokenStorage.getToken();
  }
}
