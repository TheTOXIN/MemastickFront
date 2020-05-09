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
import {MemeResearchComponent} from './meme-research/meme-research.component';
import {EvolveModule} from '../evolve/evolve.module';
import {TokenModule} from '../token/token.module';
import {MemesPanelComponent} from './memes-panel/memes-panel.component';
import {MemeEpiComponent} from './meme-epi/meme-epi.component';
import {MemeTextInputComponent} from './meme-text-input/meme-text-input.component';
import {FormsModule} from '@angular/forms';
import {MemeTextViewComponent} from './meme-text-view/meme-text-view.component';
import {AngularFittextModule} from 'angular-fittext';
import {MemesModalComponent} from './memes-modal/memes-modal.component';
import {MemeTypeDeadComponent} from './meme-type-dead/meme-type-dead.component';
import {MemeTypeSelectComponent} from './meme-type-select/meme-type-select.component';
import {MemeTypeIndividComponent} from './meme-type-individ/meme-type-individ.component';
import {MemeBestCommentComponent} from './meme-best-comment/meme-best-comment.component';
import {MemeResearchLinkComponent} from './meme-research-link/meme-research-link.component';
import {MemetickModule} from '../memetick/memetick.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ModalsModule,
    MemetickModule,
    EvolveModule,
    PinchZoomModule,
    MemesRoutingModules,
    TokenModule,
    FormsModule,
    AngularFittextModule
  ],
  exports: [
    MemesPageComponent,
    MemesModalComponent,
    MemeViewComponent
  ],
  declarations: [
    ScrollableDirective,
    DropZoneDirective,
    MemesComponent,
    MemesPageComponent,
    MemeViewComponent,
    MemeCreatorComponent,
    MemesShareComponent,
    MemeResearchComponent,
    MemesPanelComponent,
    MemeEpiComponent,
    MemeTextInputComponent,
    MemeTextViewComponent,
    MemesModalComponent,
    MemeTypeSelectComponent,
    MemeTypeIndividComponent,
    MemeTypeDeadComponent,
    MemeBestCommentComponent,
    MemeResearchLinkComponent
  ],
  entryComponents: [
    MemesModalComponent
  ]
})
export class MemesModule {

}
