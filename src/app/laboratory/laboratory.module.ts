import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LaboratoryComponent} from './laboratory.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {FormsModule} from '@angular/forms';
import {LaboratoryInfoModalComponent} from './laboratory-info-modal/laboratory-info-modal.component';
import {LaboratoryWarnScreenComponent} from './laboratory-warn-screen/laboratory-warn-screen.component';

@NgModule({
  declarations: [
    LaboratoryComponent,
    LaboratoryInfoModalComponent,
    LaboratoryWarnScreenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule
  ],
  entryComponents: [
    LaboratoryInfoModalComponent
  ]
})
export class LaboratoryModule { }
