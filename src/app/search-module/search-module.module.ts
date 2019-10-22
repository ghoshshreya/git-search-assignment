import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GitSearchComponent } from './components/git-search/git-search.component';
import { CommonComponentModule } from '../common-component/common-component.module';
import { GithubUserProfileComponent } from './components/github-user-profile/github-user-profile.component';
import { ReplacePipe } from '../shared/pipes/replace.pipe';
import { ClipStringPipe } from '../shared/pipes/clip-string.pipe';

export const searchModuleRoutes : Routes = [
  {
    path: '',
    component: GitSearchComponent      
  },
  {
    path: 'userProfile/:userName',
    component: GithubUserProfileComponent
  },
  {
    path: 'userProfile',
    redirectTo: '/search',
    pathMatch: 'full'
  }  
]
@NgModule({
  imports: [
    CommonModule,
    CommonComponentModule,
    RouterModule.forChild(searchModuleRoutes)
  ],
  declarations: [
    GitSearchComponent,
    GithubUserProfileComponent,
    ReplacePipe,
    ClipStringPipe
  ]
})
export class SearchModule { }