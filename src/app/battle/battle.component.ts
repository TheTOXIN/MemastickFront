import { Component, OnInit } from '@angular/core';
import {BattleApiService} from '../api/battle-api-service';
import {BattleView} from '../model/battle/BattleView';
import {Router} from '@angular/router';
import {BattleStatus} from '../consts/BattleStatus';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BattleRuleModalComponent} from './battle-rule-modal/battle-rule-modal.component';
import {StorageService} from '../services/storage-service';
import {OauthApiService} from '../services/oauth-api-service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  public battleWait: BattleView[] = [];
  public battleStart: BattleView[] = [];
  public battleCancel: BattleView[] = [];
  public battleEnd: BattleView[] = [];

  public battlesCount;
  public membersCount;

  public battleHint: string;

  isLoad = true;
  isOauth = false;

  myStyle: object = {};
  myParams: object = {};

  hints = [
    'Выбирайте PVP граммотно, от него может зависть ваша победа',
    'Когда отвечайте на вызов, держите в голове, что ваш мем может умереть',
    'Старайтесь на арене угадывать мемы, с наибольшим кол-вом голосов',
    'Если вы проголосовали за мем который проигрывает, ваше ДНК комбо обнуляется',
    'Не забывайте, что ваше место в рейтинге, может занять другой меметик',
  ];

  constructor(
    private battleApi: BattleApiService,
    private router: Router,
    private modalService: NgbModal,
    private storage: StorageService,
    private oauth: OauthApiService
  ) {
    this.battleHint = this.hints[Math.floor(Math.random() * this.hints.length)];
  }

  ngOnInit() {
    this.initParticles();
    this.checkOuath();

    if (!this.isOauth) { return; }
    if (this.storage.battleRule()) { this.toInfo(); }

    this.battleApi.home().subscribe(data => {
      this.battleWait = data.battles[BattleStatus.WAIT];
      this.battleStart = data.battles[BattleStatus.START];
      this.battleCancel = data.battles[BattleStatus.CANCEL];
      this.battleEnd = data.battles[BattleStatus.END];

      this.battlesCount = data.battlesCount;
      this.membersCount = data.membersCount;

      this.isLoad = false;
    });
  }

  private checkOuath() {
    this.isOauth = this.oauth.checkTokens();
  }

  toArena() {
    this.router.navigateByUrl('/battle/arena');
  }

  toRating() {
    this.router.navigateByUrl('/battle/rating');
  }

  toMemes() {
    this.router.navigateByUrl('/memes?filter=INDV');
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }

  toStart() {
    this.router.navigateByUrl('/start');
  }

  toInfo() {
    this.modalService.open(BattleRuleModalComponent, {'centered': true});
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
          value: 30,
          density: {
            enable: true,
            value_area: 481
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
            nb_sides: 12
          }
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: false,
            speed: 0.5,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 47,
          random: true,
          anim: {
            enable: true,
            speed: 9,
            size_min: 5,
            sync: true
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'bounce',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 320,
            rotateY: 481
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
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
