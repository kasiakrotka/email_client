import {Component, OnInit} from '@angular/core';
import {InboxService} from '../shared/inbox.service';
import {Mail} from '../shared/mail.model';
import {SendService} from '../shared/send.service';


@Component({
  selector: 'app-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.css'],
})
export class MainBoxComponent implements OnInit {

  selectedMail: Mail;
  selected = false;
  writing = false;

  constructor(private inboxService: InboxService, private sendService: SendService) {
  }

  ngOnInit(): void {
    this.inboxService.messageSelected.subscribe(
      (mail: Mail) => {
        if (mail == null || mail == this.selectedMail) {
          this.selectedMail = null;
          this.selected = false;
          this.writing = false;
        } else {
          this.selectedMail = mail;
          this.selected = true;
          this.writing = false;
        }
      });

    this.sendService.messageForm.subscribe(
      () => {
        this.writing = !this.writing;
        this.selected = false;
        this.selectedMail = null;
        console.log(this.writing);
      })
  }

}
