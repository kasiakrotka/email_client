import { Component, OnInit } from '@angular/core';
import { InboxService } from '../shared/inbox.service';
import { Mail } from '../shared/mail.model';
import { SendService } from '../shared/send.service';


@Component({
  selector: 'app-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.css'],
})
export class MainBoxComponent implements OnInit {

  selectedMail: Mail;
  selected = false;
  writing = false;
  constructor(private inboxService: InboxService, private sendSerice: SendService) { }

  ngOnInit(): void {
    this.inboxService.messageSelected.subscribe(
      (mail: Mail) => {
        if(this.selected == false){
          this.selectedMail = mail;
          this.selected = true;
          this.writing = false;
        }
        else
        {
          this.selectedMail = null;
          this.selected = false;
        }
      })

    this.sendSerice.messageForm.subscribe(
      ()=>{
        this.writing = !this.writing;
        this.selected = false;
        this.selectedMail = null;
      })
  }

}
