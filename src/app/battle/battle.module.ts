import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleComponent } from './battle.component';
import {BattleRoutingModules} from './battle-routing.modules';
import {BattleViewModalComponent} from './battle-view-modal/battle-view-modal.component';
import {BattleRequestModalComponent} from './battle-request-modal/battle-request-modal.component';
import {BattleRatingComponent} from './battle-rating/battle-rating.component';
import {BattleArenaComponent} from './battle-arena/battle-arena.component';

@NgModule({
  imports: [
    CommonModule,
    BattleRoutingModules
  ],
  exports: [
    BattleViewModalComponent,
    BattleRequestModalComponent,
  ],
  declarations: [
    BattleComponent,
    BattleArenaComponent,
    BattleRatingComponent,
    BattleViewModalComponent,
    BattleRequestModalComponent,
  ],
  entryComponents: [
    BattleViewModalComponent,
    BattleRequestModalComponent,
  ]
})
export class BattleModule { }
