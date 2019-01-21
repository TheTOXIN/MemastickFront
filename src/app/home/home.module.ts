import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.modules';
import {MemesComponent} from './memes/memes.component';
import {Router} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    MemesComponent
  ]
})
export class HomeModule {

}
