import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WebSocketService} from './services/web-socket-service';
import {NotificationComponent} from './shared/notification/notification.component';
import {OauthApiService} from './services/oauth-api-service';
import {ControlComponent} from './control/control.component';
import {PwaService} from './services/pwa-service';
import {VERSION} from './app.constants';
import {PushService} from './services/push-service';
import {StorageService} from './services/storage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public controlWork = false;

  constructor(
    private socket: WebSocketService,
    private push: PushService,
    private oauth: OauthApiService,
    private storage: StorageService,
    private pwa: PwaService
  ) {

  }

  ngOnInit(): void {
    if (this.oauth.checkTokens()) {
      this.me();
      this.update();
      this.notify();
      this.control(true);
    }
  }

  ngOnDestroy(): void {
    if (this.oauth.checkTokens()) {
      this.socket.disconnect();
    }
  }

  public me() {
    if (!this.storage.getMe()) {
      this.oauth.loadMe();
    }
  }

  public update() {
    this.pwa.checkUpdate(() => {
      alert('Мемастик обновился, подтвердите чтобы обновить');
      document.location.reload();
    });
  }

  public notify() {
    this.push.register();
    this.socket.connect();

    this.socket.notiferObservable.subscribe((notify) => {
      if (notify != null) {
        this.notification.show(notify);
      }
    });
  }

  public control(val: boolean) {
    this.controlWork = val;
  }
}
