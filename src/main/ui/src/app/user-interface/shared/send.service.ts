import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Mail } from './mail.model';

@Injectable()
export class SendService {
    messageForm = new EventEmitter<Mail>();
    newMessageForm = new EventEmitter<Mail>();
    currentMessage = null;

    constructor(private http: HttpClient){}

    private sentMessages: Mail[] = [
        {sender: 'ja@frygtt.com', topic: 'Wyslany mail 1', text: 'Ten list został wysłany pod adres: frygtt@gmail.com. Mamy nadzieję, że informacje odnośnie marki Cropp, które do Państwa wysyłamy są ciekawe i wartościowe. Gdyby jednak nie chcieli już Państwo takich listów otrzymywać, lub jeśli list ten dotarł do Państwa przez pomyłkę proszę o kliknięcie w kliknij tutaj. \n LPP S.A., ul. Łąkowa 39/44, 80-769 Gdańsk, Polska, zarejestrowana przez Sąd Rejonowy Gdańsk-Północ w Gdańsku, KRS: 0000000778, kapitał zakładowy 3.662.246 PLN (zapłacony w całości), NIP: 583-10-14-898, \n REGON: 190852164', seen: false},
        {sender: 'ja@frygtt.com', topic: 'Wyslany mail 2', text: '', seen: false}
    ];

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

}