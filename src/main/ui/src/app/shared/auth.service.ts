import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map, retry, tap} from 'rxjs/operators';
import { MessageModel } from '../auth/message.model';
import { User } from '../auth/user.model';

export interface AuthResponseData {
    id: string;
    expiresIn: string;
    email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    authenticated = false;
    model: any = {}
    errorMessage = '';
    error = false;
    credentials: any = undefined;
    username: String;
    password: String;
    SESSION_KEY = 'auth_user'

    constructor(private http: HttpClient) {

    }

    getCredentials() {
      return this.credentials;
    }

  authenticate(credentials, callback) {

    this.credentials = credentials;
    let headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    let url = 'http://localhost:8080/user';
    this.http.get(url, {headers: headers}).subscribe((response) => {
      if (response['name']) {
        this.authenticated = true;
        this.username = credentials.username;
        this.password = credentials.password;
        this.registerInSession(this.username);
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    }, ()=> {this.errorMessage = "Nieprawidłowy login lub hasło"})
      ;

  }

  registerInSession(username: String) {
    sessionStorage.setItem(this.SESSION_KEY, username.toString())
  }



  logout() {

      let url = 'http://localhost:8080/logout'
    this.http.post(url, {}).subscribe(response => {
        this.authenticated = false;
      sessionStorage.removeItem(this.SESSION_KEY);
      this.username = null;
      this.password = null;
    });
  }

  isUserLoggedin() {
    let user = sessionStorage.getItem(this.SESSION_KEY)
    if (user === null) return false
    return true
  }

  getLoggedinUser() {
    let user = sessionStorage.getItem(this.SESSION_KEY)
    if (user === null) return ''
    return user
  }


}
