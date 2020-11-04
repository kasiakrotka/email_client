import { Component, Input, OnInit } from '@angular/core';
import { InboxService } from '../../shared/inbox.service';
import { Mail } from '../../shared/mail.model';


@Component({
  selector: 'app-mail-view',
  templateUrl: './mail-view.component.html',
  styleUrls: ['./mail-view.component.css']
})
export class MailViewComponent implements OnInit {

  @Input() mail: Mail;
  constructor() {
  }

  ngOnInit(): void {
  }
}
