import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LogoutModalComponent} from './logout-modal/logout-modal.component';
import {ChangeNickModalComponent} from './change-nick-modal/change-nick-modal.component';
import {ChangeAvatarModalComponent} from './change-avatar-modal/change-avatar-modal.component';
import {IntroModalComponent} from './intro-modal/intro-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TeamModalComponent} from './team-modal/team-modal.component';
import {PinchZoomModule} from 'ngx-pinch-zoom';
import {TokenInfoModalComponent} from './token-info-modal/token-info-modal.component';
import {ShareModalComponent} from './share-modal/share-modal.component';
import {AlgorithmModalComponent} from './algorithm-modal/algorithm-modal.component';
import {PushRequestModalComponent} from './push-request-modal/push-request-modal.component';
import {EpiModalComponent} from './epi-modal/epi-modal.component';
import {SocialsModalComponent} from './socials-modal/socials-modal.component';
import {DnaModalComponent} from './dna-modal/dna-modal.component';
import {SharedModule} from '../shared/shared.module';
import {MemeCoinHistoryModalComponent} from './meme-coin-history-modal/meme-coin-history-modal.component';
import {StartInfoModalComponent} from './start-info-modal/start-info-modal.component';
import {UserDataModalComponent} from './user-data-modal/user-data-modal.component';
import {RankTypesModalComponent} from './rank-types-modal/rank-types-modal.component';
import {RankTokensModalComponent} from './rank-tokens-modal/rank-tokens-modal.component';
import {TokenModule} from '../token/token.module';
import {CreedModalComponent} from './creed-modal/creed-modal.component';
import {MemeCreateModalComponent} from './meme-create-modal/meme-create-modal.component';
import {ImageModalComponent} from './image-modal/image-modal.component';
import {OwlModule} from 'ngx-owl-carousel';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  exports: [
    CommonModule,
    IntroModalComponent,
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent,
    TokenInfoModalComponent,
    ShareModalComponent,
    AlgorithmModalComponent,
    PushRequestModalComponent,
    SocialsModalComponent,
    EpiModalComponent,
    DnaModalComponent,
    MemeCoinHistoryModalComponent,
    StartInfoModalComponent,
    UserDataModalComponent,
    RankTypesModalComponent,
    RankTokensModalComponent,
    CreedModalComponent,
    MemeCreateModalComponent,
    IntroModalComponent,
    ImageModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    PinchZoomModule,
    SharedModule,
    TokenModule,
    OwlModule,
    ImageCropperModule
  ],
  declarations: [
    IntroModalComponent,
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent,
    TeamModalComponent,
    TokenInfoModalComponent,
    ShareModalComponent,
    AlgorithmModalComponent,
    PushRequestModalComponent,
    SocialsModalComponent,
    EpiModalComponent,
    DnaModalComponent,
    MemeCoinHistoryModalComponent,
    StartInfoModalComponent,
    UserDataModalComponent,
    RankTypesModalComponent,
    RankTokensModalComponent,
    CreedModalComponent,
    MemeCreateModalComponent,
    IntroModalComponent,
    ImageModalComponent
  ],
  entryComponents: [
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent,
    TeamModalComponent,
    TokenInfoModalComponent,
    ShareModalComponent,
    AlgorithmModalComponent,
    PushRequestModalComponent,
    SocialsModalComponent,
    EpiModalComponent,
    DnaModalComponent,
    MemeCoinHistoryModalComponent,
    StartInfoModalComponent,
    UserDataModalComponent,
    RankTypesModalComponent,
    RankTokensModalComponent,
    CreedModalComponent,
    MemeCreateModalComponent,
    IntroModalComponent,
    ImageModalComponent
  ]
})
export class ModalsModule {
}
