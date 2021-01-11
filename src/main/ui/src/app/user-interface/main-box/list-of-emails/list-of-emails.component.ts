import {Component, ElementRef, HostBinding, Input, OnInit} from '@angular/core';
import { InboxService } from '../../shared/inbox.service';
import { Mail } from '../../shared/mail.model';
import {Observable} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";
import {isPackageNameSafeForAnalytics} from "@angular/cli/models/analytics";

@Component({
  selector: 'app-list-of-emails',
  templateUrl: './list-of-emails.component.html',
  styleUrls: ['./list-of-emails.component.css'],
  animations: [
    trigger('grow', [
      transition('void <=> *', []),
      transition('* <=> *', [
        style({height: '{{startWidth}}px', opacity: 0}),
        animate('.5s ease'),
      ], {params: {startWidth: 0}})
    ])
  ]
})
export class ListOfEmailsComponent implements OnInit {

  messages: Mail[] = [];
  selectedMessage: Mail = null;
  startWidth: number;
  @Input()
  trigger: boolean;

  constructor(private inboxService: InboxService, private element: ElementRef) { }

  ngOnInit(): void {
      //this.messages = this.inboxService.getMessages();
      this.inboxService.fetchMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  onSelected(message: Mail): void {

      this.selectedMessage = message;
      this.inboxService.messageSelected.emit(message);
  }
}
