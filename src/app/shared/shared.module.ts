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

@NgModule({
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    IntroModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPageScrollModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    IntroModalComponent
  ],
  providers: [
    WINDOW_PROVIDERS,
    LandingFixService
  ]
})
export class SharedModule {
}
