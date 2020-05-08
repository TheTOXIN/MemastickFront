import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WebSocketService} from './services/web-socket-service';
import {NotificationComponent} from './shared/notification/notification.component';
import {OauthApiService} from './services/oauth-api-service';
import {PwaService} from './services/pwa-service';
import {PushService} from './services/push-service';
import {StorageService} from './services/storage-service';
import {MemeFilter} from './consts/MemeFilter';
import {ANDROID_URL, VERSION} from './app.constants';
import {Router} from '@angular/router';
import {MainApiService} from './api/main-api-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public controlWork = false;

  public showPreview = false;
  public textPreview: string;

  public showUpdater = false;
  public versUpdater: string;

  constructor(
    private socket: WebSocketService,
    private push: PushService,
    private oauth: OauthApiService,
    private storage: StorageService,
    private mainApi: MainApiService,
    private pwa: PwaService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const isAuth = this.oauth.checkTokens();

    this.previewer(isAuth);
    this.redirecter(isAuth);

    if (isAuth) {
      this.hello();
      this.me();
      this.update();
      this.notify();
      this.clear();
      this.control(true);
    }

    this.checkTWA();
  }

  ngOnDestroy(): void {
    if (this.oauth.checkTokens()) {
      this.socket.disconnect();
    }
  }

  public hello() {
    this.mainApi.hello().subscribe(data => {
      this.showUpdater = data !== VERSION;
      this.versUpdater = data;
    });
  }

  public me() {
    if (!this.storage.getMe()) {
      this.oauth.loadMe();
    }
  }

  public update() {
    this.pwa.checkUpdate(() => {
      alert('Мемастик обновился, подтвердите чтобы обновить');
      this.showUpdater = false;
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

  public clear() {
    this.storage.remMemePage(MemeFilter.POOL);
  }

  public control(val: boolean) {
    this.controlWork = val;
  }

  public checkTWA() {
    if (document.referrer.startsWith(ANDROID_URL)) {
      this.storage.asTWA();
    }
  }

  public previewer(isAuth: boolean) {
    this.showPreview = this.storage.isPreview();
    this.textPreview = isAuth ? 'С возвращением!' : 'Добро пожаловать!';
  }

  private redirecter(isAuth: boolean) {
    if (location.pathname !== '/') { return; }

    if (isAuth) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/start');
    }
  }
}
