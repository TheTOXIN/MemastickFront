import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleComponent } from './battle.component';
import {BattleRoutingModules} from './battle-routing.modules';
import {BattleViewModalComponent} from './battle-view-modal/battle-view-modal.component';
import {BattleRatingComponent} from './battle-rating/battle-rating.component';
import {BattleArenaComponent} from './battle-arena/battle-arena.component';
import {SharedModule} from '../shared/shared.module';
import {MemesModule} from '../memes/memes.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BattleResponseModalComponent} from './battle-response-modal/battle-response-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MemesModule,
    NgbModule,
    BattleRoutingModules
  ],
  exports: [
    BattleViewModalComponent,
    BattleResponseModalComponent
  ],
  declarations: [
    BattleComponent,
    BattleArenaComponent,
    BattleRatingComponent,
    BattleViewModalComponent,
    BattleResponseModalComponent
  ],
  entryComponents: [
    BattleViewModalComponent,
    BattleResponseModalComponent
  ]
})
export class BattleModule { }
