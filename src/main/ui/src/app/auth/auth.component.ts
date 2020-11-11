import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.isLoginMode = false;
  }

  ngOnInit(): void {

  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    //if(!form.valid)
     // return;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObs = this.authService.login(this.credentials.username, this.credentials.password);
    }
    else {
      authObs = this.authService.signup(this.credentials.username, this.credentials.password);
    }

    authObs.subscribe(resData => {
        console.log(resData);
        this.router.navigate(['/ui']);
      });

    form.reset();
  }
}
