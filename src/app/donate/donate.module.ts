import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate.component';
import {DonateMessageComponent} from './donate-message/donate-message.component';
import {DonateMessageInfoModalComponent} from './donate-message-info-modal/donate-message-info-modal.component';
import {DonateRatingComponent} from './donate-rating/donate-rating.component';
import {SharedModule} from '../shared/shared.module';
import {OwlModule} from 'ngx-owl-carousel';
import {AngularFittextModule} from 'angular-fittext';
import {DonateRoutes} from './donate.routes';
import {DonateMessagesComponent} from './donate-messages/donate-messages.component';

@NgModule({
  declarations: [
    DonateComponent,
    DonateRatingComponent,
    DonateMessageComponent,
    DonateMessagesComponent,
    DonateMessageInfoModalComponent,
  ],
  entryComponents: [
    DonateMessageInfoModalComponent
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
