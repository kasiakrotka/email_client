import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoginMode = false;
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    }
    else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
        this.error = 'An error occured!'
      }
    );
    form.reset();
  }

}
