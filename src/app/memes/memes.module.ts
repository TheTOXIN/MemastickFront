import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemesPageComponent} from './memes-page/memes-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MemesPageComponent
  ],
  declarations: [
    MemesPageComponent
  ]
})
export class MemesModule {

}
