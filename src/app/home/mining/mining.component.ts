import {Component, OnInit} from '@angular/core';
import {BlockCoinsApiService} from '../../api/block-coins-api-service';
import {GlobalConst} from '../../consts/GlobalConst';
import {Router} from '@angular/router';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {LoaderStatus} from '../../consts/LoaderStatus';

const shajs = require('sha.js');

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss'],
  animations: [
    trigger('bounceAnim', [
      transition('* => *', [
        style({ transform: 'scale(1)' }),
        animate(150, keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.3)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ]),
    trigger('moveAnim', [
      transition('* => *', [
        animate(300, style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class MiningComponent implements OnInit {

  public loadMessage: string;
  public loadStatus: LoaderStatus;
  public loadEvent: any;

  myStyle: object = {};
  myParams: object = {};
  
  public hash: string;
  public target: string;

  public nonce: number;
  public cache: number;

  textTitle = '(жмите на блок)';
  tapState = 'default';

  isMake = false;
  isMine = false;

  private audio = new Audio();

  constructor(
    private blockApi: BlockCoinsApiService,
    private router: Router
  ) {
    this.audio.src = '../../../assets/audio/stone.wav';
    this.audio.load();

    this.loadStatus = LoaderStatus.NONE;
    this.loadMessage = '';
    this.loadEvent = () => this.toHome();

    this.cache = 0;
    this.target = '';

    for (let i = 0; i < GlobalConst.BLOCK_DFCLT; i++) {
      this.target += '0';
    }
  }

  ngOnInit() {
    this.make();
    this.initParticles();
  }

  public tap() {
    this.tapState = (this.tapState === 'default' ? 'tap' : 'default');
    const nonce = this.nonce;

    const mineHash = shajs('sha256')
      .update(this.hash + nonce)
      .digest('hex');
    this.textTitle = mineHash;

    if (mineHash.startsWith(this.target)) {
      this.audio.play();
      this.mine(nonce);
    }
    this.nonce++;
  }

  public accept() {
    if (!this.isMine) { return; }

    this.textTitle = this.hash;
    this.isMine = false;
    this.cache++;
  }

  private make() {
    this.isMake = false;
    this.blockApi.makeBlock().subscribe(data => {
      this.hash = data.hash;
      this.nonce = 0;
      this.isMake = true;
    }, () => this.error('Ошибка создания блока'));
  }

  private mine(nonce: number) {
    this.isMine = true;
    this.blockApi.mineBlock(nonce).subscribe((data) => {
        this.hash = data.hash;
        this.textTitle = 'Заберите монету';
    }, () => this.error('Ошибка майнинга блока'));
  }

  public flush() {
    if (this.cache === 0) { this.toHome(); }
    this.loadMessage = 'Подтверждение транзакции';
    this.loadStatus = LoaderStatus.LOAD;
    this.blockApi.flushBlock().subscribe(
      () => {
        this.cache = 0;
        this.loadMessage = 'Успешно!';
        this.loadStatus = LoaderStatus.DONE;
      }, () => this.error('Ошибка транзакции')
    );
  }

  error(txt: string) {
    this.loadStatus = LoaderStatus.ERROR;
    this.loadMessage = txt;
  }

  private toHome() {
    this.router.navigateByUrl('/home');
  }

  private initParticles() {
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
          value: 60,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'top',
          random: true,
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
            enable: false,
            mode: 'grab'
          },
          onclick: {
            enable: false,
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
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    };
  }
}
