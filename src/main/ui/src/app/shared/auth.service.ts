import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "../auth/user.model";

export interface AuthResponseData {
    address: string;
    end_date: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    let url = "http://localhost:8080/register";
    return this.http.post<AuthResponseData>(url,
        {
          address: email,
          password: password
        }
      ).pipe(catchError(this.handleError), tap(responseData => {
        this.handleAuth(responseData.address, responseData.end_date);
    }));
  }

  login(email: string, password: string) {
    let url = "http://localhost:8080/login";
    return this.http.post<AuthResponseData>(url,
      {
        address: email,
        password: password
      }).pipe(catchError(this.handleError), tap(responseData => {
      //this.handleAuth(responseData.address, responseData.end_date);
    }));
  }

  private handleAuth(address: String, end_date: String) {
    const user = new User(address, end_date);
    this.user.next(user);
  }
  private handleError(errorResp: HttpErrorResponse) {

    let errorMessage = 'Wystąpił błąd!';
    if(!errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage);
    }
    switch(errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "Ten adres email jest już zajęty.";
        break;
      case 'ERROR_AUTH':
        errorMessage = "Niepoprawny email lub hasło";
        break;
    }
    return throwError(errorMessage);
  }
}
