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
    AcceptComponent
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
    SpinnerComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    RedirectRootComponent,
    MemLogoComponent,
    NotificationComponent,
    TimerComponent,
    ModalLinkComponent,
    AcceptComponent
  ],
  providers: [
    WINDOW_PROVIDERS,
    LandingFixService
  ]
})
export class SharedModule {
}
