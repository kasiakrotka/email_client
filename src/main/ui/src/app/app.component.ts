import { Component } from '@angular/core';
import { InboxService } from './user-interface/shared/inbox.service';
import { Mail } from './user-interface/shared/mail.model';
import { SendService } from './user-interface/shared/send.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'temporary-email';
  messageSelected = false;
  selectedEmail: Mail;

  constructor(private inboxService: InboxService, private sendService: SendService) { }

  ngOnInit(): void {
  }
}
