import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchBoxComponent } from './components/search-box/search-box.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    SearchBoxComponent,
    NavBarComponent,
    LoaderComponent
  ],
  exports: [
    SearchBoxComponent,
    NavBarComponent,
    LoaderComponent
  ]
})
export class CommonComponentModule { }