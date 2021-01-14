import {Injectable} from '@angular/core';
import {User} from "./user.model";

const TOKEN_KEY = "TOKEN_KEY";
const USER_KEY = "USER_KEY";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
    //localStorage.clear();
  }

  signOut() {
    localStorage.clear();
  }

  public saveToken(token) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    let parsedObject: {
      address: String;
      Authorization: String;
      endDate: String;
      startDate: String;
      expirationDate: string;
    } = JSON.parse(localStorage.getItem(USER_KEY));

    if (parsedObject != null) {
      let date = new Date(parsedObject.expirationDate);
      const loadedUser = new User(
        parsedObject.Authorization,
        parsedObject.address,
        parsedObject.startDate,
        parsedObject.endDate,
        date);
      return loadedUser;
    }
    return null;
  }
}
