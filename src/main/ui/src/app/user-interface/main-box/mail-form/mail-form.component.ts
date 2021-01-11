import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { SendService } from '../../shared/send.service';
import { Mail } from '../../shared/mail.model';
import {FormBuilder, NgForm, Validators} from "@angular/forms";


@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.css']
})
export class MailFormComponent implements OnInit, AfterViewInit {

  @ViewChild('f') mailForm: NgForm;
  loggedUser: any;

  email = {
    address: '',
    topic: '',
    body: '',
  }

  constructor(public fb: FormBuilder, private http: HttpClient, private sendService: SendService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
    this.mailForm.form.patchValue({
      address: this.sendService.address,
      topic: this.sendService.subject,
      body: this.sendService.body
    });},0);
  }

  onSend() {
    this.copyDataToService();
    this.sendService.sendMessage().subscribe();
  }

  ngOnDestroy() {
    this.copyDataToService();
  }
  ngOnChanges(){
    this.copyDataToService();
  }

  copyDataToService(){
    this.sendService.body = this.mailForm.value.body;
    this.sendService.address = this.mailForm.value.address;
    this.sendService.subject = this.mailForm.value.topic;
  }

  onReset() {
    this.mailForm.resetForm();
    this.sendService.body = '';
    this.sendService.address = '';
    this.sendService.subject = '';
  }

  closeTab() {
    this.sendService.messageForm.emit();
  }
}
