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
import {SpinnerComponent} from './spinner/spinner.component';
import {MemLogoComponent} from './mem-logo/mem-logo.component';
import {NotificationComponent} from './notification/notification.component';
import {TimerComponent} from './timer/timer.component';
import {ModalLinkComponent} from './modal-link/modal-link.component';
import {AcceptComponent} from './accpet/accept.component';
import {GroupByPipe} from './pipes/GroupByPipe';
import {DonaterRatingComponent} from './donater-rating/donater-rating.component';
import {DonaterMessageComponent} from './donater-message/donater-message.component';
import {OwlModule} from 'ngx-owl-carousel';
import {AngularFittextModule} from 'angular-fittext';
import {GpBtnComponent} from './gp-btn/gp-btn.component';
import {PreviewScreenComponent} from './preview-screen/preview-screen.component';
import {RankLevelComponent} from './rank-level/rank-level.component';
import {DnaLineComponent} from './dna-line/dna-line.component';
import {TemplateModalComponent} from './template-modal/template-modal.component';
import {StatisticComponent} from './statistic/statistic.component';
import {DnaCountComponent} from './dna-count/dna-count.component';
import {LohRadarComponent} from './loh-radar/loh-radar.component';
import {ChartsModule} from 'ng2-charts';
import {DonaterMessagesComponent} from './donater-messages/donater-messages.component';
import {CounterComponent} from './counter/counter.component';
import {PreviewUpdateComponent} from './preview-update/preview-update.component';
import {CommentsComponent} from './comments/comments.component';
import {DnaSpinnerComponent} from './dna-spinner/dna-spinner.component';
import {BottomSheetComponent} from './bottom-sheet/bottom-sheet.component';

@NgModule({
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    SpinnerComponent,
    MemLogoComponent,
    NotificationComponent,
    TimerComponent,
    ModalLinkComponent,
    AcceptComponent,
    GroupByPipe,
    DonaterRatingComponent,
    DonaterMessageComponent,
    GpBtnComponent,
    PreviewScreenComponent,
    RankLevelComponent,
    DnaLineComponent,
    TemplateModalComponent,
    StatisticComponent,
    DnaCountComponent,
    LohRadarComponent,
    CommentsComponent,
    DonaterMessagesComponent,
    CounterComponent,
    PreviewUpdateComponent,
    DnaSpinnerComponent,
    BottomSheetComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPageScrollModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    OwlModule,
    AngularFittextModule,
    ChartsModule
  ],
  declarations: [
    SpinnerComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    MemLogoComponent,
    NotificationComponent,
    TimerComponent,
    ModalLinkComponent,
    AcceptComponent,
    GroupByPipe,
    DonaterRatingComponent,
    DonaterMessageComponent,
    GpBtnComponent,
    PreviewScreenComponent,
    RankLevelComponent,
    DnaLineComponent,
    TemplateModalComponent,
    StatisticComponent,
    DnaCountComponent,
    LohRadarComponent,
    CommentsComponent,
    DonaterMessagesComponent,
    CounterComponent,
    PreviewUpdateComponent,
    DnaSpinnerComponent,
    BottomSheetComponent
  ],
  entryComponents: [
    BottomSheetComponent
  ],
  providers: [
    WINDOW_PROVIDERS,
    LandingFixService
  ]
})
export class SharedModule {
}
