import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Mail } from './mail.model';
import {catchError, exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from "../../shared/auth.service";
import {throwError} from "rxjs";

@Injectable()
export class InboxService {
    messageSelected = new EventEmitter<Mail>();
    selectedMessage = null;
    isFetching = false;
    fetchedMail : Mail[] = []
    error: any;

    constructor(private http: HttpClient, private authService: AuthService) {
    }


    private messages: Mail[] = [
        {sender: 'newsletter@news.cropp.com', topic: 'Podbij świat… w dobrych butach', text: 'Ten list został wysłany pod adres: frygtt@gmail.com. Mamy nadzieję, że informacje odnośnie marki Cropp, które do Państwa wysyłamy są ciekawe i wartościowe. Gdyby jednak nie chcieli już Państwo takich listów otrzymywać, lub jeśli list ten dotarł do Państwa przez pomyłkę proszę o kliknięcie w kliknij tutaj. \n LPP S.A., ul. Łąkowa 39/44, 80-769 Gdańsk, Polska, zarejestrowana przez Sąd Rejonowy Gdańsk-Północ w Gdańsku, KRS: 0000000778, kapitał zakładowy 3.662.246 PLN (zapłacony w całości), NIP: 583-10-14-898, \n REGON: 190852164'},
        {sender: 'contact@mailer.humblebundle.com', topic: 'This week at Humble: $12 for 12 games, Ikenfell launch, and more!', text: ''}
    ];

    getMessages() {
        return this.messages;
    }

    fetchMessages() {
        this.isFetching = true;
      let url = "http://localhost:8080/resources";
      return this.http.post<any>(url, {observe: 'response'}).pipe(
        catchError(this.handleError) ,
        tap(response => {
          console.log(response);
        }));
        /*
        this.http.get<Mail>('https://ghostmail-spring.firebaseio.com/send.json')
        .pipe(
            map(responseData => {
                const messagesArray: Mail[] = [];
                for( const key in responseData) {
                    if(responseData.hasOwnProperty(key))
                    messagesArray.push({...responseData[key], id: key})
                }
            return messagesArray;
        })).subscribe(messages => {
            this.isFetching = false;
            this.fetchedMail = messages;
            console.log(messages)
        }, error => {
            this.error = error.message;
            console.log(error);
        });
        //mozna zrobić tak ze ta metoda zwraca observable a w kontrolerze
        //wykorzystujacym serwis możemy zasubskrybować zwracaną observable
        //i prawdopodobnie tak zrobie jak juz bede pobierać jakieś dane xD
         */
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

    deleteMessages(mailArray: Mail[]){
        //this.http.delete();
    }


}
