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
  error : string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.isLoginMode = false;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedin();
    if(this.isLoggedIn) {
      this.router.navigateByUrl('ui');
    }
  }

  login() {
    this.authService.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/ui');
    });
    return false;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
