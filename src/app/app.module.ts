import {RouterModule} from '@angular/router';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {rootRouterConfig} from './app.routes';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {InviteApiService} from './api/invite-api-service';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MyHttpInterceptor} from './configs/my-http-interceptor';
import {OAuthModule} from 'angular-oauth2-oidc';
import {OauthApiService} from './services/oauth-api-service';
import {MemetickApiService} from './api/memetick-api-service';
import {PasswordApiService} from './api/password-api-service';
import {RegistrationApiService} from './api/registration-api-service';
import {AngularFireModule} from '@angular/fire';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MemesPaginationService} from './services/memes-pagination.service';
import {StatisticApiService} from './api/statistic-api-service';
import {MemetickAvatarApiService} from './api/memetick-avatar-api-service';
import {MemeApiService} from './api/meme-api-service';
import {MemeLikeApiService} from './api/meme-like-api-service';
import {ModalsModule} from './modals/modals.module';
import {MemesModule} from './memes/memes.module';
import {TokenApiService} from './api/token-api-service';
import {HomeModule} from './home/home.module';
import {EvolveMemeApiService} from './api/evolve-meme-api-service';
import {EvolveModule} from './evolve/evolve.module';
import {TokenAllowanceApiService} from './api/token-allowance-api-service';
import {MainApiService} from './api/main-api-service';
import {PwaService} from './services/pwa-service';
import {ControlModule} from './control/control.module';
import {MemetickInventoryApiService} from './api/memetick-inventory-api-service';
import {TokenModule} from './token/token.module';
import {SocketService} from './services/socket.service';
import {TokenAcceptApiService} from './api/token-accept-api.service';
import {PushService} from './services/push-service';
import {NotifyBellApiService} from './api/notify-bell-api-service';
import {SettingApiService} from './api/setting-api-service';
import {StorageService} from './services/storage-service';
import {ErrorHandlerService} from './services/error-handler-service';
import {AngularFittextModule} from 'angular-fittext';
import {MemeCoinsApiService} from './api/meme-coins-api-service';
import {ShopApiService} from './api/shop-api-service';
import {BlockCoinsApiService} from './api/block-coins-api-service';
import {TranslatorApiService} from './api/translator-api-service';
import {MemotypeModule} from './memotype/memotype.module';
import {MemotypeApiService} from './api/memotype-api-service';
import {BattleModule} from './battle/battle.module';
import {BattleApiService} from './api/battle-api-service';
import {DonateApiService} from './api/donate-api-service';
import {LaboratoryModule} from './laboratory/laboratory.module';
import {RankApiService} from './api/rank-api-service';
import {AdminApiService} from './api/admin-api-service';
import {MemeLohApiService} from './api/meme-loh-api-service';
import {MemeCommentApiService} from './api/meme-comment-api.-service';
import {AcceptService} from './services/accept-service';
import {AcceptState} from './state/accept-state';
import {LoaderService} from './services/loader-service';
import {MemetickModule} from './memetick/memetick.module';
import {NotifyCounterService} from './services/notify-counter.service';
import {ChatModule} from './chat/chat.module';
import {ChatService} from './services/chat-service';
import {DirectivesModule} from './directivies/directives.module';
import {CardService} from './services/card-service';
import {CardState} from './state/card-state.service';
import {MyHammerConfig} from './configs/my-hammer-config';
import {CommentsModule} from './comments/comments.module';
import {FireMetricService} from './services/fire-metric-service';
import {DonateModule} from './donate/donate.module';
import {ShopModule} from './shop/shop.module';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {ShopComponent} from './shop/shop.component';
import {ControlService} from './services/control-service';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ModalsModule,
    MemesModule,
    HomeModule,
    TokenModule,
    EvolveModule,
    ControlModule,
    MemotypeModule,
    MemetickModule,
    BattleModule,
    DirectivesModule,
    ChatModule,
    DonateModule,
    ShopModule,
    CommentsModule,
    LaboratoryModule,
    HttpClientModule,
    AngularFittextModule,
    OAuthModule.forRoot(),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireMessagingModule, // WTF DEPLOY
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(rootRouterConfig, {useHash: false, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AppComponent,
    InviteApiService,
    OauthApiService,
    MemetickApiService,
    PasswordApiService,
    StatisticApiService,
    RegistrationApiService,
    MemesPaginationService,
    MemetickAvatarApiService,
    MemeApiService,
    MemeLikeApiService,
    TokenApiService,
    EvolveMemeApiService,
    TokenAllowanceApiService,
    MainApiService,
    PwaService,
    MemetickInventoryApiService,
    TokenAcceptApiService,
    SocketService,
    PushService,
    NotifyBellApiService,
    SettingApiService,
    StorageService,
    ErrorHandlerService,
    MemeCoinsApiService,
    ShopApiService,
    BlockCoinsApiService,
    TranslatorApiService,
    MemotypeApiService,
    BattleApiService,
    DonateApiService,
    RankApiService,
    AdminApiService,
    MemeLohApiService,
    MemeCommentApiService,
    AcceptService,
    AcceptState,
    LoaderService,
    NotifyCounterService,
    ChatService,
    CardService,
    CardState,
    FireMetricService,
    ControlService,
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
