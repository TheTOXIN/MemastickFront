import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxPageScrollModule} from 'ngx-page-scroll';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
// Services
import {WINDOW_PROVIDERS} from './services/windows.service';
import {LandingFixService} from '../shared/services/landing-fix.service';
import {IntroModalComponent} from './intro-modal/intro-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OpenIntroModalComponent} from './open-intro-modal/open-intro-modal.component';
import {LogoutModalComponent} from './logout-modal/logout-modal.component';
import {ChangeAvatarModalComponent} from './change-avatar-modal/change-avatar-modal.component';
import {ChangeNickModalComponent} from './change-nick-modal/change-nick-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    IntroModalComponent,
    OpenIntroModalComponent,
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPageScrollModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    IntroModalComponent,
    OpenIntroModalComponent,
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent
  ],
  providers: [
    WINDOW_PROVIDERS,
    LandingFixService
  ],
  entryComponents: [
    IntroModalComponent,
    LogoutModalComponent,
    ChangeNickModalComponent,
    ChangeAvatarModalComponent
  ]
})
export class SharedModule {
}
