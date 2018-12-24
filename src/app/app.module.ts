import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {rootRouterConfig} from './app.routes';
import {AppComponent} from './app.component';
import {BlogComponent} from './blog/blog.component';
import {NgModule} from '@angular/core';
import {InviteService} from './services/invite-service';
import {HelloService} from './services/hello-service';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(rootRouterConfig, {useHash: false, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})
  ],
  providers: [
    InviteService,
    HelloService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
