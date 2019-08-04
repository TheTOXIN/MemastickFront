import {Component, OnInit, ViewChild} from '@angular/core';
import {WebSocketService} from './services/web-socket-service';
import {NotificationComponent} from './shared/notification/notification.component';
import {OauthApiService} from './services/oauth-api-service';
import {ControlComponent} from './control/control.component';
import {PwaService} from './services/pwa-service';
import {VERSION} from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public controlWork = false;

  constructor(
    private webSocketService: WebSocketService,
    private oauth: OauthApiService,
    private pwa: PwaService
  ) {

  }

  ngOnInit(): void {
    if (this.oauth.checkTokens()) {
      this.update();
      this.notify();
      this.control(true);
    }
  }

  public update() {
    this.pwa.checkUpdate(() => {
      alert('Мемастик обновился, подтвердите чтобы обновить');
      document.location.reload();
    });
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
