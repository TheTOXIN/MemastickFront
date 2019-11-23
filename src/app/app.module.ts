import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {rootRouterConfig} from './app.routes';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {InviteApiService} from './api/invite-api-service';
import {HelloApiService} from './api/hello-api-service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MyHttpInterceptor} from './configs/my-http-interceptor';
import {OAuthModule} from 'angular-oauth2-oidc';
import {OauthApiService} from './services/oauth-api-service';
import {MemetickApiService} from './api/memetick-api-service';
import {PasswordApiService} from './api/password-api-service';
import {RegistrationApiService} from './api/registration-api-service';
import {AngularFireModule} from '@angular/fire';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
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
import {WebSocketService} from './services/web-socket-service';
import {TokenAcceptApiService} from './api/token-accept-api.service';
import {PushService} from './services/push-service';
import * as firebase from 'firebase';
import {NotifyBellApiService} from './api/notify-bell-api-service';
import {SettingApiService} from './api/setting-api-service';
import {StorageService} from './services/storage-service';
import {ErrorHandlerService} from './services/error-handler-service';
import {AngularFittextModule} from 'angular-fittext';
import {MemeCoinsApiService} from './api/meme-coins-api-service';
import {ShopApiService} from './api/shop-api-service';
import {BlockCoinsApiService} from './api/block-coins-api-service';
import {ShopComponent} from './shop/shop.component';
import {TranslatorApiService} from './api/translator-api-service';
import {MemotypeModule} from './memotype/memotype.module';
import {MemotypeApiService} from './api/memotype-api-service';
import {BattleModule} from './battle/battle.module';
import {BattleApiService} from './api/battle-api-service';
import {BlogComponent} from './blog/blog.component';
import {MetrikaModule} from 'ng-yandex-metrika';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    BlogComponent,
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
    BattleModule,
    HttpClientModule,
    AngularFittextModule,
    OAuthModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(rootRouterConfig, {useHash: false, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    // MetrikaModule.forRoot({id: 56352478, webvisor: true, clickmap: true, trackLinks: true, accurateTrackBounce: true})
  ],
  providers: [
    AppComponent,
    InviteApiService,
    HelloApiService,
    OauthApiService,
    MemetickApiService,
    PasswordApiService,
    StatisticApiService,
    RegistrationApiService,
    AngularFireStorage,
    AngularFirestore,
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
    WebSocketService,
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
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
