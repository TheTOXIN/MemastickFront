import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EvolveAdaptationComponent} from './evolve-adaptation/evolve-adaptation.component';
import {EvolveSurvivalComponent} from './evolve-survival/evolve-survival.component';
import {ModalsModule} from '../modals/modals.module';
import {HomeModule} from '../home/home.module';
import {SharedModule} from '../shared/shared.module';
import {TokenModule} from '../token/token.module';

@NgModule({
  imports: [
    CommonModule,
    ModalsModule,
    HomeModule,
    SharedModule,
    TokenModule
  ],
  exports: [
    EvolveAdaptationComponent,
    EvolveSurvivalComponent
  ],
  declarations: [
    EvolveAdaptationComponent,
    EvolveSurvivalComponent
  ]
})
export class EvolveModule {

}
