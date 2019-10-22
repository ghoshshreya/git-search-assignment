import { Component, OnInit, Input } from '@angular/core';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  @Input()
  public loggedInUserName = null;

  constructor(private _session: SessionStorageService, private router: Router) { }

  logout() {
    this._session.removeSession();
    this.router.navigate(['/login']);
  }

}