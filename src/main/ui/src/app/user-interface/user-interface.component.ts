import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {
  title = 'temporary-email';
  isLoggedIn = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user => {
      this.isLoggedIn = !user ? false: true;
    });
  }

  ngOnDestroy() {
     this.userSub.unsubscribe();
  }
}
