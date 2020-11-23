import { Injectable } from '@angular/core';
import {User} from "./user.model";

const TOKEN_KEY =  "TOKEN_KEY";
const USER_KEY = "USER_KEY";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
    sessionStorage.clear();
  }

  signOut() {
    sessionStorage.clear();
  }

  public saveToken(token) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User) {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log("User key: "+USER_KEY);
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

}
