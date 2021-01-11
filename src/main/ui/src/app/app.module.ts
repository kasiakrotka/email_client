import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './user-interface/main-menu/main-menu.component';
import { InboxService } from './user-interface/shared/inbox.service';
import { MainBoxComponent } from './user-interface/main-box/main-box.component';
import { MailFormComponent } from './user-interface/main-box/mail-form/mail-form.component';
import { ListOfEmailsComponent } from './user-interface/main-box/list-of-emails/list-of-emails.component';
import { MailViewComponent } from './user-interface/main-box/mail-view/mail-view.component';
import { SendService } from './user-interface/shared/send.service';
import { AuthComponent } from './auth/auth.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpInterceptorService } from './shared/http-interceptorService';
import {AuthInterceptor} from "./shared/auth-interceptor";
import {MatDialogModule} from "@angular/material/dialog";
import { ConfirmDialogComponent } from './user-interface/confirm-dialog/confirm-dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {DataDialogComponent} from "./user-interface/data-dialog/data-dialog.component";
import {InfoDialogComponent} from "./user-interface/info-dialog/info-dialog.component";
@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    ListOfEmailsComponent,
    MailViewComponent,
    MainBoxComponent,
    MailFormComponent,
    AuthComponent, UserInterfaceComponent, ConfirmDialogComponent, DataDialogComponent, InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    InboxService,
    SendService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
