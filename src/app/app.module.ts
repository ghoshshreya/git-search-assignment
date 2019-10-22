import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//FEATURE MODULES
import { CommonComponentModule } from './common-component/common-component.module'; 

//COMPONENTS
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

//SERVICES
import { CommonService } from './shared/services/common-service.service';
import { SessionStorageService } from './shared/services/session-storage.service';
import { AuthGuardService } from './shared/guards/auth-guard.guard';

export const appRoutes : Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'search',
    canLoad: [AuthGuardService],
    loadChildren: './search-module/search-module.module#SearchModule'
  },
  {
    path: 'userProfile',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [ 
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule, 
    HttpClientModule, 
    CommonComponentModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes) 
  ],
  declarations: [ 
    AppComponent, 
    PageNotFoundComponent, 
    LoginComponent
  ],
  bootstrap: [ 
    AppComponent 
  ],
  providers: [ 
    CommonService, 
    SessionStorageService, 
    AuthGuardService
  ]
})
export class AppModule { }
