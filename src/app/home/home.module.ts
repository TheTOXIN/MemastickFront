import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.modules';
import {MemetickComponent} from './memetick/memetick.component';
import {ParticlesModule} from 'angular-particle';
import {StatisticComponent} from './statistic/statistic.component';
import {SharedModule} from '../shared/shared.module';
import {ModalsModule} from '../modals/modals.module';
import {MemesModule} from '../memes/memes.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ParticlesModule,
    SharedModule,
    ModalsModule,
    MemesModule
  ],
  declarations: [
    HomeComponent,
    MemetickComponent,
    StatisticComponent
  ]
})
export class HomeModule {

}
