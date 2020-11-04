import { Component, OnInit } from '@angular/core';
import { InboxService } from './shared/inbox.service';
import { Mail } from './shared/mail.model';
import { SendService } from './shared/send.service';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {
  title = 'temporary-email';
  messageSelected = false;
  selectedEmail: Mail;

  constructor(private inboxService: InboxService, private sendService: SendService) { }


  ngOnInit(): void {
  }

}
