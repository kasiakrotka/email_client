import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;
  error: string = null;
  credentials = {username: '', password: ''};

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.isLoginMode = false;
  }

  ngOnInit(): void {
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
