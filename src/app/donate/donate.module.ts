import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate.component';
import {DonateMessageComponent} from './donate-message/donate-message.component';
import {DonateMessageInfoComponent} from './donate-message-info/donate-message-info.component';
import {DonateRatingComponent} from './donate-rating/donate-rating.component';
import {SharedModule} from '../shared/shared.module';
import {OwlModule} from 'ngx-owl-carousel';
import {AngularFittextModule} from 'angular-fittext';
import {DonateRoutes} from './donate.routes';
import {DonateMessagesComponent} from './donate-messages/donate-messages.component';
import {DonateRatingsComponent} from './donate-ratings/donate-ratings.component';
import {DonateRatingTabComponent} from './donate-rating-tab/donate-rating-tab.component';
import {DonateWrapPageComponent} from './donate-wrap-page/donate-wrap-page.component';
import {DonateRatingRowComponent} from './donate-rating-row/donate-rating-row.component';

@NgModule({
  declarations: [
    DonateComponent,
    DonateRatingComponent,
    DonateRatingsComponent,
    DonateRatingTabComponent,
    DonateRatingRowComponent,
    DonateMessageComponent,
    DonateMessagesComponent,
    DonateMessageInfoComponent,
    DonateWrapPageComponent,
  ],
  entryComponents: [
    DonateMessageInfoComponent
  ],
  imports: [
    CommonModule,
    DonateRoutes,
    SharedModule,
    OwlModule,
    AngularFittextModule,
  ]
})
export class DonateModule { }
