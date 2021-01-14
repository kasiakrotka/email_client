import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Mail} from './mail.model';
import {catchError, exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from "../../shared/auth.service";
import {throwError} from "rxjs";

@Injectable()
export class InboxService {
  messageSelected = new EventEmitter<Mail>();
  selectedMessage = null;
  isFetching = false;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  fetchMessages() {
    this.isFetching = true;
    let url = "http://localhost:8080/inbox";
    return this.http.get<Mail[]>(url, {observe: 'response'}).pipe(
      map(responseData => {
        let messagesArray: Mail[];
        messagesArray = responseData.body;
        return messagesArray;
      }));
  }
}
