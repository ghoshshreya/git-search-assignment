import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { Router } from '@angular/router';

function validateUserName(control: FormControl) {
  let regex: RegExp = (/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
  return regex.test(control.value) ? null : {
    validateUserName: {
      valid: false
    }
  };
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public COMPONENT_NAME: string = "LOGIN_COMPONENT";
  public loginForm: FormGroup;
  public maxLengthThreshold: number = 38;

  constructor(private _fb: FormBuilder, private _sessionStorageService: SessionStorageService, private router: Router){}

  ngOnInit() {
    this.createForm();
  }

  /*----------METHOD TO CREATE THE LOGIN FORM---------*/
  createForm()
  {
    this.loginForm = this._fb.group({
      'userName': [null, [Validators.required,Validators.maxLength(this.maxLengthThreshold),validateUserName]]
    })
  }

  /*----------METHOD TO LOGIN AND SAVE THE USER DATA IN SESSION STORAGE---------*/
  login(formValue)
  {
    if(undefined != formValue && undefined != formValue.userName)
    {
      this._sessionStorageService.setSession(formValue.userName);
      this.router.navigate(['/search']);
    }
  }
}