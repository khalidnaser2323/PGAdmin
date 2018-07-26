import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../node_modules/@angular/router';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Constants } from '../Constants';

@Injectable()
export class LoginActivateService implements CanActivate {

  constructor(private router: Router, @Inject(SESSION_STORAGE) private storage: StorageService, ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.storage.get(Constants.USER_DATA) == undefined || this.storage.get(Constants.USER_DATA) == null) {
      this.router.navigate(['login']);
      return false;
    }
    else {
      return true;
    }
  }

}
