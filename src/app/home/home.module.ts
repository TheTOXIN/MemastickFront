import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.modules';
import {MemesComponent} from './memes/memes.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {ScrollableDirective} from '../directivies/scrollable.directive';
import {MemetickComponent} from './memetick/memetick.component';
import {MemeCreatorComponent} from './meme-creator/meme-creator.component';
import {ParticlesModule} from 'angular-particle';
import {DropZoneDirective} from '../directivies/drop-zone.directive';
import {StatisticComponent} from './statistic/statistic.component';
import {SharedModule} from '../shared/shared.module';
import {LoaderComponent} from './loader/loader.component';
import {ModalsModule} from '../modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ParticlesModule,
    SharedModule,
    ModalsModule
  ],
  declarations: [
    HomeComponent,
    MemesComponent,
    SpinnerComponent,
    MemeCreatorComponent,
    MemetickComponent,
    StatisticComponent,
    ScrollableDirective,
    DropZoneDirective,
    LoaderComponent
  ]
})
export class HomeModule {

}
