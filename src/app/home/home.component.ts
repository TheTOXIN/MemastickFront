import { Component, OnInit } from '@angular/core';
import {Memetick} from '../model/Memetick';
import {MemetickApiService} from '../services/memetick-api-service';
import {Router} from '@angular/router';
import {MemFireService} from '../services/mem-fire-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  public memetick: Memetick = new Memetick(
    '',
    ''
  );

  constructor(
    private router: Router,
    private memFire: MemFireService,
    private memetickApi: MemetickApiService
  ) {

  }

  ngOnInit() {
    this.initParticles();
    this.takeMe();
  }

  private takeMe() {
    this.memetickApi.me().subscribe(data => {
      this.memetick = data;
    });
  }

  memes() {
    this.router.navigateByUrl('/home/memes');
  }

  memeCreator() {
    this.router.navigateByUrl('/home/memes/create');
  }

  memetickMe() {
    this.router.navigateByUrl('/home/memetick/me');
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
          value: 100,
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
            width: 3,
            color: '#ff8800'
          },
          polygon: {
            nb_sides: 5
          },
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
            speed: 30,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ff8800',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
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
