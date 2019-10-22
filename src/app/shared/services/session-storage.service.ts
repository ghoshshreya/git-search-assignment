import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {

  constructor() { }

  /*----------METHOD TO FETCH THE SESSION DATA----------*/
  getSession()
  {
    return  sessionStorage.getItem("userName")
  }

  /*----------METHOD TO FETCH THE SESSION DATA----------*/
  setSession(userName)
  {
    sessionStorage.setItem("userName", userName);
  }

  /*----------METHOD TO remove THE SESSION DATA----------*/
  removeSession()
  {
    sessionStorage.removeItem("userName");
  }

}