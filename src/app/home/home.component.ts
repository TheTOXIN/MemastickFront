import {Component, HostListener, Inject, OnInit} from '@angular/core';
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
import {NotifyType} from '../consts/NotifyType';
import {LocalStorageService} from '../services/local-storage-service';
import {PushRequestModalComponent} from '../modals/push-request-modal/push-request-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myStyle: object = {};
  myParams: object = {};

  filters = MemeFilter;

  isLoad = true;

  private messages = [
    'Мемастик в процессе разработки, не ругайте нас',
    'Чувствуй себя как дома! (но не очень сильно)',
    'Мемы - это лучшее на что ты можешь потратить свое время',
    'Новый день! Новый мем!',
    'Вы не создаете мемы на свой страх и риск!',
    'Мемы спасут мир от войны',
    'Много хромосом, это хорошо или плохо?',
    'Сделал мемас, гуляй как...',
    'Мем мне в печень, и я счастлив вечен',
    'Ааа ну это уже какая то страшилка получается',
    'Помните и уважайте пожилые мемы',
    'МУТАГЕН->КРОССОВЕР->МИКРОСКОП->АНТИБИОТИК->ПРОБИРКА'
  ];

  public emoji: any;
  public message: String;

  public home: Home;

  public showLogo = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainApi: MainApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private storageService: LocalStorageService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {
    this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  ngOnInit() {
    this.initParticles();
    this.initEmoji();
    this.initMe();
    this.initEvent();
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

  private initEvent() {
    this.route.queryParams.subscribe(params => {
      if (params.event === NotifyType.ALLOWANCE) {
        this.allowance();
      }
    });
  }

  private initEmoji() {
    this.emoji = randomEmoji.random({count: 1})[0].character;
  }

  private initMe() {
    this.mainApi.home().subscribe(home => {
      this.home = home;
      this.isLoad = false;
      this.askPush();
    });
  }

  askPush() {
    if (this.storageService.getPushAsk()) {
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

  vkontakte() {
    this.redirect('https://vk.com/memastick');
  }

  telegram() {
    this.redirect('https://telegram.me/memastick');
  }

  private redirect(url: string) {
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.href = url;
    document.body.appendChild(a);
    a.click();
  }

  toStart() {
    this.router.navigateByUrl('/start');
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
