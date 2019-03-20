import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './control.component';
import {HomeModule} from '../home/home.module';

@NgModule({
  declarations: [
    ControlComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ControlComponent
  ]
})
export class ControlModule { }
