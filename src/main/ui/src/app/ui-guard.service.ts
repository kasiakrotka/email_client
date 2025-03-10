import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./shared/auth.service";

@Injectable()
export class UIGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
    Observable<boolean> |
    Promise<boolean> |
    boolean {
    return this.authService.isAuthenticated().then(
      (authenticated: boolean) => {
        if(authenticated == false) {
          return true;
        } else {
          this.router.navigate(['ui'])
        }
      }
    );
  }
}
