import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';

/**
 * here is our AUTH GUARD
 */
@Injectable()
export class AuthGuard implements CanActivateChild {
  /**
   * @ignore
   */
    constructor(private router: Router) {}
  /**
   * This Method checks whether user is logged in or not .
   */

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if(localStorage.getItem('token')){
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;

  }
}
