import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleComponent } from './battle.component';
import {BattleRoutingModules} from './battle-routing.modules';
import {BattleViewModalComponent} from './battle-view-modal/battle-view-modal.component';
import {BattleRatingComponent} from './battle-rating/battle-rating.component';
import {BattleArenaComponent} from './battle-arena/battle-arena.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BattleRoutingModules
  ],
  exports: [
    BattleViewModalComponent
  ],
  declarations: [
    BattleComponent,
    BattleArenaComponent,
    BattleRatingComponent,
    BattleViewModalComponent
  ],
  entryComponents: [
    BattleViewModalComponent
  ]
})
export class BattleModule { }
