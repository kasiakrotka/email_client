import { Component, OnInit } from '@angular/core';
import { InboxService } from '../../shared/inbox.service';
import { Mail } from '../../shared/mail.model';

@Component({
  selector: 'app-list-of-emails',
  templateUrl: './list-of-emails.component.html',
  styleUrls: ['./list-of-emails.component.css']
})
export class ListOfEmailsComponent implements OnInit {

  messages: Mail[] = [];

  constructor(private inboxService: InboxService) { }

  ngOnInit(): void {
    this.messages = this.inboxService.getMessages();
  }

  onSelected(message: Mail): void {
      this.inboxService.messageSelected.emit(message);
  }
}
