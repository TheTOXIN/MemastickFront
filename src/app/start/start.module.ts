import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartRoutingModule} from './start-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwlModule} from 'ngx-owl-carousel';

import {StartComponent} from './start.component';
import {IntroComponent} from './intro/intro.component';
import {AboutComponent} from './about/about.component';
import {FeatureComponent} from './feature/feature.component';
import {TestimonialComponent} from './testimonial/testimonial.component';
import {ScreenshotComponent} from './screenshot/screenshot.component';
import {HowItWorkComponent} from './how-it-work/how-it-work.component';
import {TeamComponent} from './team/team.component';
import {PriceComponent} from './price/price.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {FaqComponent} from './faq/faq.component';
import {DownloadComponent} from './download/download.component';
import {NewsLetterComponent} from './news-letter/news-letter.component';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OpenIntroModalComponent} from './open-intro-modal/open-intro-modal.component';
import {ModalsModule} from '../modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    StartRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ModalsModule,
    FormsModule,
    OwlModule,
    NgxPageScrollModule,
    NgbModule
  ],
  exports: [
    TeamComponent
  ],
  declarations: [
    StartComponent,
    IntroComponent,
    AboutComponent,
    FeatureComponent,
    TestimonialComponent,
    ScreenshotComponent,
    HowItWorkComponent,
    TeamComponent,
    PriceComponent,
    ContactUsComponent,
    FaqComponent,
    DownloadComponent,
    NewsLetterComponent,
    OpenIntroModalComponent
  ]
})
export class StartModule {
}
