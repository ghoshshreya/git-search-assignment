import { Injectable }       from '@angular/core';
import { CanLoad, CanActivate, Route, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(private _session: SessionStorageService, private router: Router) {
  }

  canLoad(route: Route): boolean {
    if(undefined != this._session.getSession())	
    {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}