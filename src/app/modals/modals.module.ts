import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {LogoutModalComponent} from './logout-modal/logout-modal.component';
import {ChangeNickModalComponent} from './change-nick-modal/change-nick-modal.component';
import {ChangeAvatarModalComponent} from './change-avatar-modal/change-avatar-modal.component';
import {IntroModalComponent} from './intro-modal/intro-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TeamModalComponent} from './team-modal/team-modal.component';
import {PinchZoomModule} from 'ngx-pinch-zoom';
import {TokenInfoModalComponent} from './token-info-modal/token-info-modal.component';
import {EvolveStepInfoModalComponent} from './evolve-step-info-modal/evolve-step-info-modal.component';
import {ShareModalComponent} from './share-modal/share-modal.component';
import {AlgorithmModalComponent} from './algorithm-modal/algorithm-modal.component';
import {FollowingModalComponent} from './following-modal/following-modal.component';
import {PushRequestModalComponent} from './push-request-modal/push-request-modal.component';
import {EpiModalComponent} from './epi-modal/epi-modal.component';
import {SocialsModalComponent} from './socials-modal/socials-modal.component';
import {DnaModalComponent} from './dna-modal/dna-modal.component';


@NgModule({
  exports: [
    CommonModule,
    IntroModalComponent,
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent,
    TokenInfoModalComponent,
    EvolveStepInfoModalComponent,
    ShareModalComponent,
    AlgorithmModalComponent,
    FollowingModalComponent,
    PushRequestModalComponent,
    SocialsModalComponent,
    EpiModalComponent,
    DnaModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPageScrollModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    PinchZoomModule
  ],
  declarations: [
    IntroModalComponent,
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent,
    TeamModalComponent,
    TokenInfoModalComponent,
    EvolveStepInfoModalComponent,
    ShareModalComponent,
    AlgorithmModalComponent,
    FollowingModalComponent,
    PushRequestModalComponent,
    SocialsModalComponent,
    EpiModalComponent,
    DnaModalComponent
  ],
  entryComponents: [
    IntroModalComponent,
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent,
    TeamModalComponent,
    TokenInfoModalComponent,
    EvolveStepInfoModalComponent,
    ShareModalComponent,
    AlgorithmModalComponent,
    FollowingModalComponent,
    PushRequestModalComponent,
    SocialsModalComponent,
    EpiModalComponent,
    DnaModalComponent
  ]
})
export class ModalsModule {
}
