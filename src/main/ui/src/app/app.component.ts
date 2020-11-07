import { Component } from '@angular/core';
import { InboxService } from './user-interface/shared/inbox.service';
import { Mail } from './user-interface/shared/mail.model';
import { SendService } from './user-interface/shared/send.service';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'temporary-email';
  greeting = {};
  messageSelected = false;
  selectedEmail: Mail;

  constructor(private auth: AuthService, private http: HttpClient, private inboxService: InboxService, private sendService: SendService) {

  }

  ngOnInit(): void {
  }

}
