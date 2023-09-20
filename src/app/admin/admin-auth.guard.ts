import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');
    const token = this.authService.getToken();
    const isAdmin = this.authService.getLocalStorageData().isAdmin
      ? true
      : false;
    return new Promise((resolve, reject) => {
      if (token && isAdmin) {
        resolve(true);
      } else {
        this.router.navigate(['/error-page']);
      }
    });
  }
}
