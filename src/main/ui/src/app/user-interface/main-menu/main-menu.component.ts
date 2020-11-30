import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { SendService } from '../shared/send.service';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {TokenStorageService} from "../../shared/token-storage.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {DataDialogComponent} from "../data-dialog/data-dialog.component";
import {newArray} from "@angular/compiler/src/util";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";

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

  constructor(private dialog: MatDialog, private http: HttpClient, private tokenService: TokenStorageService, private router: Router, private sendService: SendService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user_data.subscribe(user => this.loggedUser = user);
    this.loggedUser = this.loggedUser;
    if(this.loggedUser != null)
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

  DeleteAccount() {
    this.authService.deleteAccount(this.loggedUser).subscribe( response => {
      console.log(response);
    })

    this.onLogout();
  }

  onDelete(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      description: 'Czy na pewno chcesz usunąć konto?'
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => {
      if(data == true)
      {
        this.DeleteAccount();
      }
    })
  }

  onAddTime() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      description: 'Podaj liczbę godzin o które chcesz przedłużyć aktywność konta: '
    }

    const dialogRef = this.dialog.open(DataDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => {
      if(data != null)
      {
        let hours: number = data;
        this.AddTimeToAccount(hours);
      }
    })
  }

  AddTimeToAccount(hours) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.authService.addTimeToAccount(this.loggedUser, hours).subscribe( response => {
      this.authService.user_data.subscribe(user => this.loggedUser = user);
      this.loggedUser = this.loggedUser;
      if(this.loggedUser != null)
        this.timeLeft = this.loggedUser.getLeftTime();
      this.updateTimer();
      this.startTimer();
      dialogConfig.data = {
        id: 2,
        description: 'Przedłużenie ważności konta powiodło się'
      }
      const dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => {});
    }, errorMessage => {
       dialogConfig.data = {
        id: 2,
        description: errorMessage
      }
      const dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => {});
    });
  }
}
