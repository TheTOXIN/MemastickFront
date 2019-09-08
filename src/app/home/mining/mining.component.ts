import {Component, OnInit} from '@angular/core';
import {BlockCoinsApiService} from '../../api/block-coins-api-service';
import {GlobalConst} from '../../consts/GlobalConst';
import {Router} from '@angular/router';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {ErrorCode} from '../../consts/ErrorCode';
import {Pickaxe} from '../../model/Pickaxe';
import {MemetickInventoryApiService} from '../../api/memetick-inventory-api-service';

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
        animate(300, style({ transform: 'translateY(100%) scale(0.1)', opacity: 0 }))
      ])
    ]),
    trigger('rotateAnim', [
      transition('right => left', [
        animate(150, style({ transform: 'rotate(-140deg)'})),
        animate(300, style({ transform: 'rotate(-45deg)'}))
      ]),
      transition('left => right', [
        animate(150, style({ transform: 'rotate(60deg)'})),
        animate(300, style({ transform: 'rotate(-45deg)'}))
      ])
    ])
  ]
})
export class MiningComponent implements OnInit {

  private audio = new Audio();
  private tapMax = 1;
  private tapCount = 0;

  public loadMessage: string;
  public loadStatus: LoaderStatus;
  public loadEvent: any;

  public pickaxe: Pickaxe;
  public loadPickaxe: boolean;

  public hash: string;
  public target: string;

  public nonce: number;
  public cache: number;

  textTitle = 'МАЙНИНГ';
  hashTitle = '';

  myStyle: object = {};
  myParams: object = {};

  tapState = 'default';
  rotateState = 'right';

  isMake = false;
  isMine = false;
  isBroke = false;

  BLOCK_NONCE = GlobalConst.BLOCK_NONCE;

  constructor(
    private blockApi: BlockCoinsApiService,
    private inventoryApi: MemetickInventoryApiService,
    private router: Router
  ) {
    this.audio.src = '../../../assets/audio/stone.wav';
    this.audio.load();

    this.loadStatus = LoaderStatus.NONE;
    this.loadMessage = '';
    this.loadEvent = () => this.toHome();

    this.loadPickaxe = false;

    this.nonce = 0;
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
    this.rotateState = (this.rotateState === 'right' ? 'left' : 'right');
    if (!this.isMine) { this.tapState = (this.tapState === 'default' ? 'tap' : 'default'); }

    this.tapCount++;
    if (this.isMine || this.tapCount <= this.tapMax) { return; }
    this.tapCount = 0;

    const nonce = this.nonce;
    const mineHash = this.sha(this.hash + nonce);
    this.hashTitle = mineHash;

    if (mineHash.startsWith(this.target)) {
      this.hash = mineHash;
      this.mine(nonce);
    }
    this.nonce++;
  }

  public accept() {
    if (!this.isMine) { return; }

    this.textTitle = 'МАЙНИНГ';
    this.isMine = false;
    this.isBroke = false;
    this.cache++;
  }

  public getPickaxe() {
    this.inventoryApi.getPickaxe().subscribe(data => {
      this.pickaxe = data;
      this.loadPickaxe = true;
    });
  }

  private make() {
    this.isMake = false;
    this.blockApi.makeBlock().subscribe(data => {
      this.hash = data.hash;
      this.isMake = true;
    }, (data) => this.error(data.error, 'Ошибка создания блока'));
  }

  private mine(nonce: number) {
    this.isMine = true;
    this.blockApi.mineBlock(nonce).subscribe(() => {
      this.audio.play();
      this.isBroke = true;
      this.textTitle = 'Заберите монету';
      this.hash = this.sha(this.hash);
      this.nonce = 0;
    }, (data) => this.error(data.error, 'Ошибка майнинга блока'));
  }

  public flush() {
    if (this.cache === 0) { this.toHome(); return; }

    this.loadMessage = 'Подтверждение транзакции';
    this.loadStatus = LoaderStatus.LOAD;
    this.blockApi.flushBlock(this.pickaxe.token).subscribe(
      () => {
        this.loadMessage = 'Успешно!';
        this.loadStatus = LoaderStatus.DONE;
      }, (data) => this.error(data.error, 'Ошибка транзакции')
    );
  }

  private broke() {
    this.audio.play();
    this.textTitle = 'Кирка сломалась';
    this.pickaxe.have = false;
    this.pickaxe.receipt = ' 01:00:00';
    this.isMine = false;
  }

  error(error: any, txt: string) {
    if (error.code === ErrorCode.MINE_FAIL) {
      this.loadStatus = LoaderStatus.ERROR;
      this.loadMessage = txt;
    } else if (error.code === ErrorCode.MINE_END) {
      this.broke();
    }
  }

  private sha(data): string {
    return shajs('sha256')
      .update(data)
      .digest('hex');
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
