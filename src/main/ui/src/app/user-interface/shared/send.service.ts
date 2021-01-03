import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {EventEmitter, Injectable, SecurityContext} from '@angular/core';
import { Mail } from './mail.model';
import {tap} from "rxjs/operators";
import {TokenStorageService} from "../../shared/token-storage.service";
import {AuthService} from "../../shared/auth.service";

@Injectable()
export class SendService {
    messageForm = new EventEmitter<Mail>();
    newMessageForm = new EventEmitter<Mail>();
    address = '';
    subject = '';
    body = '';

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private authService: AuthService){}

    private sentMessages: Mail[] = null;

    getMessages() {
        return this.sentMessages;
    }

    createAndStoreMessage(mail: Mail) {
        //jakie sprzykladowe parametry
        //mozna usunac w przyszlosci
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');

        this.http
        .post<Mail>('https://ghostmail-spring.firebaseio.com/send.json',
        mail,
        {
            //typ odpowiedzi
            responseType: 'json',
            //dodawanie header'ow
            headers: new HttpHeaders({'custom-header': 'header'}),
            //dodawanie Params
            params: searchParams
        })
        .subscribe(responseData => {
          console.log(responseData);
        });
    }

  sendMessage() {
    let url = "http://localhost:8080/sendmail";
    let addresses = (this.address.replace(/\s/g, "")).split(',');
    let loggedUser;
    this.authService.user_data.subscribe(user => loggedUser = user);
    loggedUser = loggedUser;
    console.log(loggedUser.getAddress());
    return this.http.post<any>(url,
      {
        sender: loggedUser.getAddress(),
        recipients: addresses,
        subject: this.subject,
        body: this.body
      }, {observe: "response"},).pipe(
        tap(response => {
        console.log(response);
      })
    );
  }
}
