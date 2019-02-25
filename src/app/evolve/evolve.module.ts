import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EvolveBirthComponent} from './evolve-birth/evolve-birth.component';
import {EvolveSurvivalComponent} from './evolve-survival/evolve-survival.component';
import {ModalsModule} from '../modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    ModalsModule
  ],
  exports: [
    EvolveBirthComponent,
    EvolveSurvivalComponent
  ],
  declarations: [
    EvolveBirthComponent,
    EvolveSurvivalComponent
  ]
})
export class EvolveModule { }
