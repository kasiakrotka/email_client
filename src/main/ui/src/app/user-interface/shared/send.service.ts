import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Mail } from './mail.model';

@Injectable()
export class SendService {
    messageForm = new EventEmitter<Mail>();
    newMessageForm = new EventEmitter<Mail>();
    address = '';
    topic = '';
    body = '';

    constructor(private http: HttpClient){}

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

  }
}
