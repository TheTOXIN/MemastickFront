import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WINDOW} from '../shared/services/windows.service';
import {DOCUMENT} from '@angular/common';
import {MemeFilter} from '../consts/MemeFilter';
import {MainApiService} from '../api/main-api-service';
import {Home} from '../model/Home';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenAllowanceModalComponent} from '../token/token-allowance-modal/token-allowance-modal.component';
import {AlgorithmModalComponent} from '../modals/algorithm-modal/algorithm-modal.component';
import {StorageService} from '../services/storage-service';
import {PushRequestModalComponent} from '../modals/push-request-modal/push-request-modal.component';
import {DnaModalComponent} from '../modals/dna-modal/dna-modal.component';
import {SocialsModalComponent} from '../modals/socials-modal/socials-modal.component';
import {RoleType} from '../consts/RoleType';
import {AppComponent} from '../app.component';
import {VERSION} from '../app.constants';
import {StartInfoModalComponent} from '../modals/start-info-modal/start-info-modal.component';
import {CreedModalComponent} from '../modals/creed-modal/creed-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public home: Home;

  public today: number = Date.now();
  public versionMessage = 'ver: ' + VERSION;

  filters = MemeFilter;
  roles = RoleType;

  isLoad = true;
  isMesg = false;

  public message: string;
  public role: RoleType = RoleType.USER;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainApi: MainApiService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private storage: StorageService,
    private app: AppComponent,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {
    this.role = this.storage.getRole();
    this.message = this.storage.getHomeMessage();
    this.isMesg = this.message != null;
  }

  ngOnInit() {
    this.initMe();
    this.initControl();
    this.initStarter();
  }

  private initMe() {
    this.mainApi.home().subscribe(home => {
      this.home = home;
      this.isLoad = false;
      this.askPush();
      this.showCreed();
      this.homeMessage();
    });
  }

  private initControl() {
    this.app.control(true);
  }

  private initStarter() {
    if (this.storage.showStartInfo()) {
      this.modalService.open(StartInfoModalComponent, {'centered': true});
    }
  }

  homeMessage() {
    if (!this.isMesg) {
      this.message = this.home.message;
      this.isMesg = true;
      this.storage.setHomeMessage(this.message);
    }
  }

  showCreed() {
    if (!this.home.creedAgree) {
      const modalRef = this.modalService.open(CreedModalComponent, {'centered': true});
      modalRef.componentInstance.needAgree = true;
    }
  }

  askPush() {
    if (this.storage.getPushAsk()) {
      this.modalService.open(PushRequestModalComponent, {'centered': true});
    }
  }

  memes(filter: MemeFilter) {
    if (filter === MemeFilter.POOL) { filter = null; }
    this.router.navigate(['/memes'], {queryParams: {filter: filter}});
  }

  allowance() {
    this.modalService.open(TokenAllowanceModalComponent, {'centered': true});
  }

  algorithm() {
    this.modalService.open(AlgorithmModalComponent, {'centered': true});
  }

  docDna() {
    this.modalService.open(DnaModalComponent, {'centered': true});
  }

  socNet() {
    this.modalService.open(SocialsModalComponent, {'centered': true});
  }

  toBattle() {
    this.router.navigateByUrl('/battle');
  }

  toLab() {
    this.router.navigateByUrl('/lab');
  }

  toStart() {
    this.router.navigateByUrl('/start');
  }

  toAdmin() {
    this.router.navigateByUrl('/pages/admin');
  }

  toDonaters() {
    this.router.navigateByUrl('/donaters/rating');
  }
}
