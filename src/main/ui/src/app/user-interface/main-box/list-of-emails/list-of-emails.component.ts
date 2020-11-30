import {Component, ElementRef, HostBinding, Input, OnInit} from '@angular/core';
import { InboxService } from '../../shared/inbox.service';
import { Mail } from '../../shared/mail.model';
import {Observable} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";

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
  startWidth: number;
  @Input()
  trigger: boolean;

  constructor(private inboxService: InboxService, private element: ElementRef) { }


  @HostBinding('@grow') get grow() {
    return {value: this.trigger, params: {startWidth: this.startWidth}};
  }

  setStartWidth(){
    this.startWidth= this.element.nativeElement.clientWidth;
    console.log("trigger: "+this.startWidth+"\n");
  }

  ngOnChanges(){
    this.setStartWidth();
  }

  ngOnInit(): void {
    let inboxObs: Observable<any>;
    this.messages = this.inboxService.getMessages();
    /*
    inboxObs = this.inboxService.fetchMessages();
    inboxObs.subscribe( response => {
      console.log(response);
    }, errorMessage => {
      console.log(errorMessage);
    });*/
  }

  onSelected(message: Mail): void {
      this.inboxService.messageSelected.emit(message);
  }
}
