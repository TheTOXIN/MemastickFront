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


@NgModule({
  exports: [
    CommonModule,
    IntroModalComponent,
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent,
    TokenInfoModalComponent,
    EvolveStepInfoModalComponent,
    ShareModalComponent
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
    ShareModalComponent
  ],
  entryComponents: [
    IntroModalComponent,
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent,
    TeamModalComponent,
    TokenInfoModalComponent,
    EvolveStepInfoModalComponent,
    ShareModalComponent
  ]
})
export class ModalsModule {
}
