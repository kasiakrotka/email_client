import { Component, OnInit } from '@angular/core';
import { InboxService } from './shared/inbox.service';
import { Mail } from './shared/mail.model';
import { SendService } from './shared/send.service';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {
  title = 'temporary-email';
  messageSelected = false;
  selectedEmail: Mail;
  greeting: any = {};

  constructor(private http: HttpClient, private authService: AuthService, private inboxService: InboxService, private sendService: SendService) {
  }


  ngOnInit(): void {

  }
  authenticated() { return this.authService.authenticated; }
}
