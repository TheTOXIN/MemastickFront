import {Component, OnInit, ViewChild} from '@angular/core';
import {WebSocketService} from './services/web-socket-service';
import {NotificationComponent} from './shared/notification/notification.component';
import {OauthApiService} from './services/oauth-api-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public controlWork = false;

  constructor(
    private webSocketService: WebSocketService,
    private oauth: OauthApiService
  ) {
    if (oauth.checkTokens()) {
      this.notify();
      this.control(true);
    }
  }

  public notify() {
    this.webSocketService.connect();
    this.webSocketService.notiferObservable.subscribe((notify) => {
      if (notify != null) {
        this.notification.show(notify);
      }
    });
  }

  public control(val: boolean) {
    this.controlWork = val;
  }
}
