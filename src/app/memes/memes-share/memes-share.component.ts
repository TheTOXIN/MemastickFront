import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeApiService} from '../../api/meme-api-service';
import {OauthApiService} from '../../services/oauth-api-service';
import {MemeResearchComponent} from '../meme-research/meme-research.component';
import {MemeViewComponent} from '../meme-view/meme-view.component';
import {Meme} from '../../model/Meme';
import {MemeData} from '../../model/MemeData';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-memes-share',
  templateUrl: './memes-share.component.html',
  styleUrls: ['./memes-share.component.scss']
})
export class MemesShareComponent implements OnInit {

  public memeData: MemeData;
  public memeURL: string;

  isLoad = true;
  isLogin = true;

  myStyle: object = {};
  myParams: object = {};

  @ViewChild(MemeViewComponent) view: MemeViewComponent;
  @ViewChild(MemeResearchComponent) research: MemeResearchComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private memeApi: MemeApiService,
    public avatrApi: MemetickAvatarApiService,
    public ouath: OauthApiService,
    private meta: Meta
  ) {
  }

  ngOnInit() {
    this.initParticles();
    this.isLogin = this.ouath.checkTokens();
    this.route.params.subscribe(params => {
      if (this.isLogin) {
        this.memeApi.memePage(params['id']).subscribe(page => {
            this.memeData = new MemeData(page);
            this.memeData.avatar = this.avatrApi.dowloadAvatar(page.memetick.id);
            this.isLoad = false;
          },
          () => this.router.navigateByUrl('error')
        );
      } else {
        this.memeApi.memeIMG(params['id']).subscribe(data => {
            this.addMeta(data.url);
            this.memeURL = data.url;
            this.isLoad = false;
          },
          () => this.toStart()
        );
      }
    });
  }

  addMeta(url: string) {
    this.meta.addTag( { property: 'og:image', content: url } );
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }

  toStart() {
    this.router.navigateByUrl('/start');
  }

  memeView(meme: Meme) {
    this.view.viewShow(meme);
  }

  memeResearch(meme: Meme) {
    this.research.researchShow(meme);
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
          value: 50,
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
            speed: 0.5,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 10,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 5,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 100,
          color: '#ffffff',
          opacity: 0.5,
          width: 2
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
