import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemetickRoutingModule} from './memetick-routing.module';
import {MemetickListComponent} from './memetick-list/memetick-list.component';
import {MemetickRowComponent} from './memetick-row/memetick-row.component';
import {MemetickRatingComponent} from './memetick-rating/memetick-rating.component';
import {MemetickComponent} from './memetick/memetick.component';
import {MemetickStatsModalComponent} from './memetick-stats-modal/memetick-stats-modal.component';
import {SharedModule} from '../shared/shared.module';
import {ModalsModule} from '../modals/modals.module';
import {TokenModule} from '../token/token.module';
import {MemetickProfileComponent} from './memetick-profile/memetick-profile.component';
import {MemetickCardComponent} from './memetick-card/memetick-card.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ModalsModule,
    TokenModule,
    MemetickRoutingModule
  ],
  exports: [
    MemetickProfileComponent,
    MemetickCardComponent,
    MemetickStatsModalComponent
  ],
  declarations: [
    MemetickRowComponent,
    MemetickListComponent,
    MemetickComponent,
    MemetickRatingComponent,
    MemetickStatsModalComponent,
    MemetickProfileComponent,
    MemetickCardComponent
  ],
  entryComponents: [
    MemetickStatsModalComponent
  ],
})
export class MemetickModule { }
