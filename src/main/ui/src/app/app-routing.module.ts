import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import {AppComponent} from "./app.component";
import {AuthGuard} from "./auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'ui', canActivate: [AuthGuard], component: UserInterfaceComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'logout', component: AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
