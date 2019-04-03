import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.modules';
import {MemetickComponent} from './memetick/memetick.component';
import {ParticlesModule} from 'angular-particle';
import {StatisticComponent} from './statistic/statistic.component';
import {SharedModule} from '../shared/shared.module';
import {ModalsModule} from '../modals/modals.module';
import {TokenWalletComponent} from './token-wallet/token-wallet.component';
import {TokenAcceptComponent} from './token-accept/token-accept.component';
import {MemetickRatingComponent} from './memetick-rating/memetick-rating.component';
import {TokenAllowanceModalComponent} from './token-allowance-modal/token-allowance-modal.component';
import {NotificationComponent} from './notification/notification.component';
import {ControlModule} from '../control/control.module';
import {SettingsComponent} from './settings/settings.component';
import {LibraryComponent} from './library/library.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ParticlesModule,
    SharedModule,
    ModalsModule,
    ControlModule
  ],
  exports: [
    TokenAcceptComponent,
    TokenAllowanceModalComponent
  ],
  declarations: [
    HomeComponent,
    MemetickComponent,
    StatisticComponent,
    TokenWalletComponent,
    TokenAcceptComponent,
    MemetickRatingComponent,
    TokenAllowanceModalComponent,
    NotificationComponent,
    SettingsComponent,
    LibraryComponent
  ],
  entryComponents: [
    TokenAllowanceModalComponent
  ]
})
export class HomeModule {
  // TODO create tokens module
}
