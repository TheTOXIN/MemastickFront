import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemesPageComponent} from './memes-page/memes-page.component';
import {PinchZoomModule} from 'ngx-pinch-zoom';
import {SharedModule} from '../shared/shared.module';
import {MemeViewComponent} from './meme-view/meme-view.component';
import {MemesComponent} from './memes/memes.component';
import {ScrollableDirective} from '../directivies/scrollable.directive';
import {ModalsModule} from '../modals/modals.module';
import {DropZoneDirective} from '../directivies/drop-zone.directive';
import {MemeCreatorComponent} from './meme-creator/meme-creator.component';
import {MemesRoutingModules} from './memes-routing.modules';
import {MemesShareComponent} from './memes-share/memes-share.component';
import {HomeModule} from '../home/home.module';
import {MemeResearchComponent} from './meme-research/meme-research.component';
import {EvolveModule} from '../evolve/evolve.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ModalsModule,
    HomeModule,
    EvolveModule,
    PinchZoomModule,
    MemesRoutingModules
  ],
  exports: [
    MemesPageComponent
  ],
  declarations: [
    ScrollableDirective,
    DropZoneDirective,
    MemesComponent,
    MemesPageComponent,
    MemeViewComponent,
    MemeCreatorComponent,
    MemesShareComponent,
    MemeResearchComponent
  ]
})
export class MemesModule {

}
