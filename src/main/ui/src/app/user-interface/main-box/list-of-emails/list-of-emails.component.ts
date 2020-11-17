import { Component, OnInit } from '@angular/core';
import { InboxService } from '../../shared/inbox.service';
import { Mail } from '../../shared/mail.model';
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-of-emails',
  templateUrl: './list-of-emails.component.html',
  styleUrls: ['./list-of-emails.component.css']
})
export class ListOfEmailsComponent implements OnInit {

  messages: Mail[] = [];

  constructor(private inboxService: InboxService) { }

  ngOnInit(): void {
    let inboxObs: Observable<any>;
    this.messages = this.inboxService.getMessages();
    inboxObs = this.inboxService.fetchMessages();
    inboxObs.subscribe( response => {
      console.log(response);
    }, errorMessage => {
      console.log(errorMessage);
    });
  }

  onSelected(message: Mail): void {
      this.inboxService.messageSelected.emit(message);
  }
}
