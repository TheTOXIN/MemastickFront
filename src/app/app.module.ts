import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {rootRouterConfig} from './app.routes';
import {AppComponent} from './app.component';
import {BlogComponent} from './blog/blog.component';
import {NgModule} from '@angular/core';
import {InviteApiService} from './services/invite-api-service';
import {HelloApiService} from './services/hello-api-service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MyHttpInterceptor} from './configs/my-http-interceptor';
import {OAuthModule} from 'angular-oauth2-oidc';
import {OauthApiService} from './services/oauth-api-service';
import {MemetickApiService} from './services/memetick-api-service';
import {PasswordApiService} from './services/password-api-service';
import {RegistrationApiService} from './services/registration-api-service';
import {AngularFireModule} from '@angular/fire';
import {MemFireService} from './services/mem-fire-service';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {PaginationService} from './services/pagination-service';
import {StatisticApiService} from './services/statistic-api-service';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(rootRouterConfig, {useHash: false, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    InviteApiService,
    HelloApiService,
    OauthApiService,
    MemetickApiService,
    PasswordApiService,
    StatisticApiService,
    RegistrationApiService,
    MemFireService,
    AngularFireStorage,
    AngularFirestore,
    PaginationService,
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
