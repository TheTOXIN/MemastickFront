import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxPageScrollModule} from 'ngx-page-scroll';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {WINDOW_PROVIDERS} from './services/windows.service';
import {LandingFixService} from './services/landing-fix.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './loader/loader.component';
import {RedirectRootComponent} from './redirect-root/redirect-root.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {MemLogoComponent} from './mem-logo/mem-logo.component';
import {NotificationComponent} from './notification/notification.component';
import {TimerComponent} from './timer/timer.component';
import {ModalLinkComponent} from './modal-link/modal-link.component';
import {AcceptComponent} from './accpet/accept.component';
import {GroupByPipe} from './pipes/GroupByPipe';
import {DonaterRatingComponent} from './donater-rating/donater-rating.component';
import {DonaterMessageComponent} from './donater-message/donater-message.component';
import {ParticlesModule} from 'angular-particle';
import {OwlModule} from 'ngx-owl-carousel';
import {AngularFittextModule} from 'angular-fittext';

@NgModule({
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    RedirectRootComponent,
    SpinnerComponent,
    MemLogoComponent,
    NotificationComponent,
    TimerComponent,
    ModalLinkComponent,
    AcceptComponent,
    GroupByPipe,
    DonaterRatingComponent,
    DonaterMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPageScrollModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ParticlesModule,
    OwlModule,
    AngularFittextModule
  ],
  declarations: [
    SpinnerComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    RedirectRootComponent,
    MemLogoComponent,
    NotificationComponent,
    TimerComponent,
    ModalLinkComponent,
    AcceptComponent,
    GroupByPipe,
    DonaterRatingComponent,
    DonaterMessageComponent
  ],
  providers: [
    WINDOW_PROVIDERS,
    LandingFixService
  ]
})
export class SharedModule {
}
