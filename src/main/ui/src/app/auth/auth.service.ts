import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MessageModel } from './message.model';
import { User } from './user.model';

export interface AuthResponseData {
    id: string;
    expiresIn: string;
    email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    authenticated = false;
    model: any = {}

    constructor(private http: HttpClient) {

    }

  authenticate(credentials, callback) {

    let headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    let url = 'http://localhost:8080/user';
    this.http.get(url, {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

  logout() {

      let url = 'http://localhost:8080/logout'
    this.http.post(url, {}).subscribe(response => {
        this.authenticated = false;});
  }
}
