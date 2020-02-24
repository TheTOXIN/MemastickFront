import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LaboratoryComponent} from './laboratory.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LaboratoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule
  ]
})
export class LaboratoryModule { }
