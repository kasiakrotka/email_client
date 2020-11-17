import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {TokenStorageService} from "../shared/token-storage.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;
  credentials = {username: '', password: ''};
  isLoggedIn = false;
  error : string = null;
  expiresTime: number[] = [1, 2, 5, 12, 24];
  chosenTime: number = 1;


  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.isLoginMode = false;
  }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
    }
  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    //if(!form.valid)
     // return;

    let authObs: Observable<any>;

    if(this.isLoginMode) {
      authObs = this.authService.login(this.credentials.username, this.credentials.password);
    }
    else {
      authObs = this.authService.signup(this.credentials.username, this.credentials.password, this.chosenTime);
    }

    authObs.subscribe( response => {
      console.log(response);
      this.isLoggedIn = true;
      this.router.navigate(['/ui']);

    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
    });
    form.reset();
  }

  changeWebsite(e) {
    this.chosenTime = e.target.value;
  }
}
