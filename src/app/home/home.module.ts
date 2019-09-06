import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.modules';
import {MemetickComponent} from './memetick/memetick.component';
import {ParticlesModule} from 'angular-particle';
import {StatisticComponent} from './statistic/statistic.component';
import {SharedModule} from '../shared/shared.module';
import {ModalsModule} from '../modals/modals.module';
import {MemetickRatingComponent} from './memetick-rating/memetick-rating.component';
import {ControlModule} from '../control/control.module';
import {SettingsComponent} from './settings/settings.component';
import {LibraryComponent} from './library/library.component';
import {StartModule} from '../start/start.module';
import {TokenModule} from '../token/token.module';
import {MiningComponent} from './mining/mining.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ParticlesModule,
    SharedModule,
    ModalsModule,
    ControlModule,
    StartModule,
    TokenModule
  ],
  declarations: [
    HomeComponent,
    MemetickComponent,
    StatisticComponent,
    MemetickRatingComponent,
    SettingsComponent,
    LibraryComponent,
    MiningComponent
  ]
})
export class HomeModule {
}
