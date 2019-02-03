import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PagesRoutingModule} from './pages-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {ReviewComponent} from './review/review.component';
import {FaqComponent} from './faq/faq.component';
import {DownloadComponent} from './download/download.component';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {RequestFormComponent} from './request-form/request-form.component';
import {ModalsModule} from '../modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ModalsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    ThankYouComponent,
    ReviewComponent,
    FaqComponent,
    DownloadComponent,
    ComingSoonComponent,
    RequestFormComponent
  ]
})
export class PagesModule {
}
