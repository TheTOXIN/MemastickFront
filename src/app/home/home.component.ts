import {Component, ElementRef, HostListener, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WINDOW} from '../shared/services/windows.service';
import {DOCUMENT} from '@angular/common';
import {MemeFilter} from '../consts/MemeFilter';
import {MainApiService} from '../api/main-api-service';
import {Home} from '../model/Home';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import * as randomEmoji from 'random-emoji';
import {TokenAllowanceModalComponent} from '../token/token-allowance-modal/token-allowance-modal.component';
import {AlgorithmModalComponent} from '../modals/algorithm-modal/algorithm-modal.component';
import {StorageService} from '../services/storage-service';
import {PushRequestModalComponent} from '../modals/push-request-modal/push-request-modal.component';
import {DnaModalComponent} from '../modals/dna-modal/dna-modal.component';
import {SocialsModalComponent} from '../modals/socials-modal/socials-modal.component';
import {DonatModalComponent} from '../modals/donat-modal/donat-modal.component';
import {RoleType} from '../consts/RoleType';
import {AppComponent} from '../app.component';
import {VERSION} from '../app.constants';
import {StartInfoModalComponent} from '../modals/start-info-modal/start-info-modal.component';
import {ModalType} from '../consts/ModalType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public versionMessage = 'ver: ' + VERSION;

  filters = MemeFilter;
  roles = RoleType;

  myStyle: object = {};
  myParams: object = {};

  isLoad = true;
  showLogo = true;

  public isHello;
  public hello;

  public home: Home;
  public role: RoleType = RoleType.USER;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainApi: MainApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private storage: StorageService,
    private app: AppComponent,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {
    this.role = this.storage.getRole();
  }

  ngOnInit() {
    this.initParticles();
    this.initMe();
    this.initControl();
    this.initStarter();
    this.initVK();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number >= 42) {
      this.showLogo = false;
    } else {
      this.showLogo = true;
    }
  }

  private initMe() {
    this.mainApi.home().subscribe(home => {
      this.home = home;
      this.isLoad = false;
      this.askPush();
      this.initHello();
    });
  }

  private initControl() {
    this.app.control(true);
  }

  private initStarter() {
    this.route.queryParams.subscribe(params => {
      if (params.modal === ModalType.STARTER) {
        this.modalService.open(StartInfoModalComponent, {'centered': true});
      }
    });
  }

  private initVK() {
    const ss = document.createElement('script');

    ss.type = 'text/javascript';
    ss.innerText = 'VK.Widgets.Comments("vk_comments", {limit: 5, attach: false}, );';

    this.elementRef.nativeElement.appendChild(ss);
  }

  askPush() {
    if (this.storage.getPushAsk()) {
      this.modalService.open(PushRequestModalComponent, {'centered': true});
    }
  }

  initHello() {
    let hello = this.storage.getHello();

    this.isHello = hello == null;

    if (this.isHello) {
      const emoji = randomEmoji.random({count: 1})[0].character;
      hello = emoji + ' ПРИВЕТ ' + this.home.nick + '!';
      this.storage.setHello(hello);
    }

    this.hello = hello;
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

  donate() {
    this.modalService.open(DonatModalComponent, {'centered': true});
  }

  toBattle() {
    this.router.navigateByUrl('/battle');
  }

  toStart() {
    this.router.navigateByUrl('/start');
  }

  toAdmin() {
    this.router.navigateByUrl('/pages/admin');
  }

  initParticles() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 700
          }
        },
        color: {
          value: '#ff8800'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 10,
            color: '#ff8800'
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 3,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 5,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#c926ff',
          opacity: 0.5,
          width: 5
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 1
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    };
  }

  year() {
    return (new Date()).getFullYear();
  }
}
