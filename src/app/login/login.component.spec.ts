import { LoginComponent } from './login.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [SessionStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  /*---------VALIDATES COMPONENT CREATION----------*/
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*----------VALIDATES USERNAME FEILD VALIDITY----------*/
  it('username validity', () => {
    let username = component.loginForm.controls['userName'];
    // expect(loginForm.valid).toBeFalsy();

    username.setValue("");
    expect(username.hasError('required')).toBeTruthy();

    username.setValue("--helo");
    expect(username.hasError('validateUserName')).toBeTruthy();

    username.setValue("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(username.hasError('maxlength')).toBeTruthy();
  });

  /*----------VALIDATES FORM VALIDITY----------*/
  it('form validity', () => {
    let loginForm = component.loginForm;
    let userName = component.loginForm.controls['userName'];
    userName.setValue("");
    expect(loginForm.valid).toBeFalsy();
  });

});