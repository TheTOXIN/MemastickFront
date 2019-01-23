import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.modules';
import {MemesComponent} from './memes/memes.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {ScrollableDirective} from '../directivies/scrollable.directive';
import {MemetickComponent} from './memetick/memetick.component';
import {MemeCreatorComponent} from './meme-creator/meme-creator.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    MemesComponent,
    SpinnerComponent,
    MemeCreatorComponent,
    MemetickComponent,
    ScrollableDirective
  ]
})
export class HomeModule {

}
