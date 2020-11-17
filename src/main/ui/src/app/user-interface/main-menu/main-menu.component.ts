import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { SendService } from '../shared/send.service';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit, OnDestroy{

  private userSub: Subscription;
  timeLeft: number = 60;
  interval;

  constructor(private http: HttpClient, private router: Router, private sendService: SendService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {

    });
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSend()
  {
    this.sendService.messageForm.emit();
  }


  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  onLogout() {

  }
}
