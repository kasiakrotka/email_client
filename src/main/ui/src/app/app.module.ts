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
import { MaterialDialogComponent } from './user-interface/material-dialog/material-dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MaterialModule} from "./material.module";
@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    ListOfEmailsComponent,
    MailViewComponent,
    MainBoxComponent,
    MailFormComponent,
    AuthComponent, UserInterfaceComponent, MaterialDialogComponent
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
  entryComponents: [MaterialDialogComponent]
})
export class AppModule { }
