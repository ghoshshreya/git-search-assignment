import { Component } from '@angular/core';
import { SessionStorageService } from './shared/services/session-storage.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  name = 'Git Search Assignment';
  public showNavBar: boolean = true;
  public loggedInUserName: string = null;
  
  constructor(private _session: SessionStorageService) {}

  /*----------METHOD TRIGGERRED WHEN A ROUTE IS ACTIVATED IN THE ROUTER OUTLET----------*/
  /*-------------HANDLES DISPLAY OF NAVBAR DEPENDING ON THE ROUTE ACTIVATED------------*/
  public routeActivated($event)
  {
    if($event && $event.COMPONENT_NAME === 'LOGIN_COMPONENT')
    {
      this.showNavBar = false;
    }
    else 
    {
      this.showNavBar = true;
      this.loggedInUserName = this._session.getSession();
    }
  }
}
