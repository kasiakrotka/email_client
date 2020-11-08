import { Component, OnInit } from '@angular/core';
import { InboxService } from './shared/inbox.service';
import { SendService } from './shared/send.service';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {
  title = 'temporary-email';
  isLoggedIn = false;
  loggedInUser: string = '';
  greeting = {};

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthService, private inboxService: InboxService, private sendService: SendService) {
  }


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedin();
    this.loggedInUser = this.authService.getLoggedinUser();

    if(!this.isLoggedIn){
      this.router.navigateByUrl('auth');
    }
    this.http.get('http://localhost:8080/resource').subscribe(data => this.greeting = data);
  }
  authenticated() { return this.authService.authenticated; }
}
