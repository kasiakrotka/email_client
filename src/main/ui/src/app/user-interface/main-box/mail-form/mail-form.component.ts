import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SendService } from '../../shared/send.service';
import { Mail } from '../../shared/mail.model';


@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.css']
})
export class MailFormComponent implements OnInit {

  simple_mail = new Mail('newsletter@news.cropp.com', 'Podbij świat… w dobrych butach', 'Ten list został wysłany pod adres: frygtt@gmail.com. Mamy nadzieję, że informacje odnośnie marki Cropp, które do Państwa wysyłamy są ciekawe i wartościowe. Gdyby jednak nie chcieli już Państwo takich listów otrzymywać, lub jeśli list ten dotarł do Państwa przez pomyłkę proszę o kliknięcie w kliknij tutaj. \n LPP S.A., ul. Łąkowa 39/44, 80-769 Gdańsk, Polska, zarejestrowana przez Sąd Rejonowy Gdańsk-Północ w Gdańsku, KRS: 0000000778, kapitał zakładowy 3.662.246 PLN (zapłacony w całości), NIP: 583-10-14-898, \n REGON: 190852164');


  constructor(private http: HttpClient, private sendService: SendService) { }

  ngOnInit(): void {
  }

  onSend() {
    //send http post request

  }

}
