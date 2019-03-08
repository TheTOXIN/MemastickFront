import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EvolveBirthComponent} from './evolve-birth/evolve-birth.component';
import {EvolveSurvivalComponent} from './evolve-survival/evolve-survival.component';
import {ModalsModule} from '../modals/modals.module';
import {HomeModule} from '../home/home.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ModalsModule,
    HomeModule,
    SharedModule
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
export class EvolveModule {

}
