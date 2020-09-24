import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SocketService} from './services/socket.service';
import {NotificationComponent} from './shared/notification/notification.component';
import {OauthApiService} from './services/oauth-api-service';
import {PwaService} from './services/pwa-service';
import {PushService} from './services/push-service';
import {StorageService} from './services/storage-service';
import {MemeFilter} from './consts/MemeFilter';
import {ANDROID_URL, VERSION} from './app.constants';
import {Router} from '@angular/router';
import {MainApiService} from './api/main-api-service';
import {LoaderState} from './state/loader-state';
import {LoaderService} from './services/loader-service';
import {LoaderStatus} from './consts/LoaderStatus';
import {NotifyCounterService} from './services/notify-counter.service';
import {FireMetricService} from './services/fire-metric-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  public state: LoaderState = new LoaderState();

  public controlWork = false;

  public showPreview = false;
  public textPreview: string;

  public showUpdater = false;
  public versUpdater: string;

  public soundNotify = new Audio();

  constructor(
    private socket: SocketService,
    private push: PushService,
    private loaderService: LoaderService,
    private metric: FireMetricService,
    private counterService: NotifyCounterService,
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
      this.init();
      this.update();
      this.clear();
      this.loader();
      this.control();
    }

    this.checkTWA();
    this.loadSound();
    this.routerEvent();
    this.metricLaunch(isAuth);
  }

  ngOnDestroy(): void {
    if (this.oauth.checkTokens()) {
      this.socket.disconnect();
    }
  }

  public init() {
    this.mainApi.init().subscribe(data => {
      this.oauth.checkMe(data.login);

      this.showUpdater = data.version !== VERSION;
      this.versUpdater = data.version;

      this.counterService.triggerBellCounter(data.notifyCount.countBells);
      this.counterService.triggerItemCounter(data.notifyCount.countItems);

      this.socketer(data.login);
    });
  }

  public socketer(login: string) {
    this.socket.connect(login);

    this.socket.connectEvent.subscribe(data => {
      if (data) {
        this.socket.notifer();
      }
    });

    this.socket.notiferObservable.subscribe((notify) => {
      if (notify != null) {
        this.notification.show(notify);
      }
    });
  }

  public update() {
    this.pwa.checkUpdate(() => {
      alert('Мемастик обновился, подтвердите чтобы обновить');
      this.showUpdater = false;
      window.location.reload();
    });
  }

  public clear() {
    this.storage.remMemePage(MemeFilter.POOL);
  }

  public loader() {
    this.loaderService.get().subscribe(state => {
      this.state = state;
    });
  }

  public control(val: boolean = true) {
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

  private metricLaunch(isAuth: boolean) {
    if (isAuth) {
      this.metric.launch('auth');
    } else {
      this.metric.launch('anon');
    }
  }

  private routerEvent() {
    this.router.events.subscribe((val: any) => {
      if (this.state.status !== LoaderStatus.NONE) {
        this.state.status = LoaderStatus.NONE;
        this.state.message = '';
        this.state.event = null;
      }
    });
  }

  private loadSound() {
    this.soundNotify.src = '../../../assets/audio/nice.wav';
    this.soundNotify.volume = 0.75;
    this.soundNotify.load();
  }
}
