import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { SendService } from '../shared/send.service';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {TokenStorageService} from "../../shared/token-storage.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit{

  loggedUser: any;
  timeLeft: number = 60;
  hours: number =0;
  minutes: number =0;
  seconds: number =0;
  interval;

  constructor(private http: HttpClient, private tokenService: TokenStorageService, private router: Router, private sendService: SendService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user_data.subscribe(user => this.loggedUser = user);
    this.loggedUser = this.loggedUser;
    this.timeLeft = this.loggedUser.getLeftTime();
    this.updateTimer();
    this.startTimer();
  }

  onSend()
  {
    this.sendService.messageForm.emit();
  }


  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.updateTimer();
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  updateTimer() {
    this.hours = Math.floor(this.timeLeft/3600);
    this.minutes = Math.floor((this.timeLeft - this.hours*3600)/60);
    this.seconds = Math.floor(this.timeLeft - this.hours*3600 - this.minutes*60);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  onLogout() {
    this.authService.logout().subscribe( response => {
      console.log(response);
      this.tokenService.signOut();
      this.router.navigate(['/auth']);
    });
  }

  onDelete() {
    this.authService.deleteAccount(this.loggedUser).subscribe( response => {
      console.log(response);
    })

    this.onLogout();
  }
}
