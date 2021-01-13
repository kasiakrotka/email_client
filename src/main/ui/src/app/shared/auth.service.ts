import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "./user.model";
import {TokenStorageService} from "./token-storage.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<User>(null);
  logged_in = false;
  user_data = this.user.asObservable();
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  errorMessage : String;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  signup(email: string, password: string, time: number) {
    let url = "http://localhost:8080/register";

    return this.http.post<any>(url,
      {
        address: email+"@ghost.com",
        password: password,
        expireTime: time
      }, {observe: "response"},);
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
          this.logged_in = true;
        })
    );
  }

  private handleAuth(auth: String, address: String, startDate: String, endDate: String, expirationDate: Date) {
    const user = new User(auth, address, startDate, endDate, expirationDate);
    this.user.next(user);
    return user;
  }

  private handleError(errorResp: HttpErrorResponse) {

    this.errorMessage = errorResp.message;

    switch(this.errorMessage) {
      case 'EMAIL_EXISTS':
        console.log("eluwina");
        this.errorMessage = "Ten adres email jest już zajęty.";
        break;
      case 'ERROR_AUTH':
        this.errorMessage = "Niepoprawny email lub hasło";
        break;
    }
    return throwError(this.errorMessage);
  }

  getToken() {
    return this.tokenStorage.getToken();
  }

  logout() {
    let url = "http://localhost:8080/logout";
    this.logged_in = false;
    return this.http.post<any>(url, null);
  }

  deleteAccount(user: User) {
    let url = "http://localhost:8080/delete";
    return this.http.post<any>(url, null);
  }

  addTimeToAccount(user: User, hours) {

    let url = "http://localhost:8080/addtime";
    return this.http.post<any>(url, hours, {observe:'response'}).pipe(
      catchError(this.handleError) ,
      tap(response => {
        let newdate: Date;
        newdate = new Date(response.body);
        this.updateEndDate(newdate);
      })
    );
  }

  updateEndDate(newdate: Date) {
    let user = this.user.getValue();
    user.setEndDateWithDate(newdate);
    this.user.next(user);
    this.tokenStorage.saveUser(user);
  }

  isAuthenticated(){
    const promise = new Promise(
      (resolve, reject) => {
        resolve(this.logged_in);
      }
    )
    return promise;
  }
}
