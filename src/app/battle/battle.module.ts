import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleComponent } from './battle.component';
import {BattleRoutingModules} from './battle-routing.modules';
import {BattleViewModalComponent} from './battle-view-modal/battle-view-modal.component';
import {BattleRatingComponent} from './battle-rating/battle-rating.component';
import {BattleArenaComponent} from './battle-arena/battle-arena.component';
import {SharedModule} from '../shared/shared.module';
import {BattleViewRowComponent} from './battle-view-row/battle-view-row.component';
import {BattleViewComponent} from './battle-view/battle-view.component';
import {BattleListComponent} from './battle-list/battle-list.component';
import {MemesModule} from '../memes/memes.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BattleResponseModalComponent} from './battle-response-modal/battle-response-modal.component';
import {BattleViewLinkComponent} from './battle-view-link/battle-view-link.component';
import {AngularSvgIconModule} from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MemesModule,
    NgbModule,
    AngularSvgIconModule,
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
    BattleListComponent,
    BattleViewRowComponent,
    BattleViewLinkComponent,
    BattleViewComponent,
    BattleResponseModalComponent
  ],
  entryComponents: [
    BattleViewModalComponent,
    BattleResponseModalComponent
  ]
})
export class BattleModule { }
