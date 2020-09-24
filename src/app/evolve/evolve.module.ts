import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalsModule} from '../modals/modals.module';
import {SharedModule} from '../shared/shared.module';
import {TokenModule} from '../token/token.module';
import {EvolveFitnessComponent} from './evolve-fitness/evolve-fitness.component';
import {EvolveAdaptationComponent} from './evolve-adaptation/evolve-adaptation.component';
import {EvolveCrossingComponent} from './evolve-crossing/evolve-crossing.component';
import {EvolveMutationComponent} from './evolve-mutation/evolve-mutation.component';
import {EvolveSurvivalComponent} from './evolve-survival/evolve-survival.component';
import {Ng5SliderModule} from 'ng5-slider';
import {FormsModule} from '@angular/forms';
import {MemetickModule} from '../memetick/memetick.module';
import {CommentsModule} from '../comments/comments.module';


@NgModule({
  imports: [
    CommonModule,
    ModalsModule,
    MemetickModule,
    SharedModule,
    TokenModule,
    FormsModule,
    Ng5SliderModule,
    CommentsModule
  ],
  exports: [
    EvolveAdaptationComponent,
    EvolveFitnessComponent,
    EvolveCrossingComponent,
    EvolveMutationComponent,
    EvolveSurvivalComponent,
  ],
  declarations: [
    EvolveAdaptationComponent,
    EvolveFitnessComponent,
    EvolveCrossingComponent,
    EvolveMutationComponent,
    EvolveSurvivalComponent,
  ]
})
export class EvolveModule {

}
