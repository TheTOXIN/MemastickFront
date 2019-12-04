import { Component, OnInit } from '@angular/core';
import {DonaterApiService} from '../../api/donater-api-service';
import {BOOMSTARTER} from '../../app.constants';
import {memotypeColors, memotypeLvl, memotypeNames, memotypeRarities} from '../../consts/MemotypeData';
import {MemotypeRarity} from '../../consts/MemotypeRarity';

@Component({
  selector: 'app-donater-rating',
  templateUrl: './donater-rating.component.html',
  styleUrls: ['./donater-rating.component.scss']
})
export class DonaterRatingComponent implements OnInit {

  raritySiquence = [];

  public memotypeColors = memotypeColors;
  public memotypeLvl = memotypeLvl;
  public memotypeNames = memotypeNames;

  isLoad = true;
  boomHref = BOOMSTARTER;

  myStyle: object = {};
  myParams: object = {};

  public donatersCarousel: any;
  public rating: any;

  constructor(
    private donaterApi: DonaterApiService
  ) {
    this.initParticles();
    this.initCarousel();
    this.initSiquence();
  }

  ngOnInit() {
    this.donaterApi.readRating().subscribe(data => {
      this.rating = data;
      this.isLoad = false;
    });
  }

  toBoom() {
    window.open(this.boomHref, '_blank');
  }

  public initSiquence() {
    this.raritySiquence[0] = MemotypeRarity.INCREDIBLE;
    this.raritySiquence[1] = MemotypeRarity.LEGENDARY;
    this.raritySiquence[2] = MemotypeRarity.EPIC;
    this.raritySiquence[3] = MemotypeRarity.RARE;
    this.raritySiquence[4] = MemotypeRarity.CLASSIC;
  }

  private initCarousel() {
    this.donatersCarousel = {
      loop: true,
      dots: false,
      autoplay: false,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      center: true,
      margin: 10
    };
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
      'particles': {
        'number': {
          'value': 69,
          'density': {
            'enable': true,
            'value_area': 500
          }
        },
        'color': {
          'value': ['#268D3E', '#2675F6', '#7745C8', '#D19705', '#910809']
        },
        'shape': {
          'type': 'circle',
            'stroke': {
            'width': 0,
              'color': '#fff'
          },
          'polygon': {
            'nb_sides': 5
          },
          'image': {
            'src': 'img/github.svg',
              'width': 100,
              'height': 100
          }
        },
        'opacity': {
          'value': 1,
            'random': true,
            'anim': {
            'enable': true,
              'speed': 0.3,
              'opacity_min': 0,
              'sync': false
          }
        },
        'size': {
          'value': 42,
            'random': true,
            'anim': {
            'enable': true,
              'speed': 2,
              'size_min': 5,
              'sync': false
          }
        },
        'line_linked': {
          'enable': false,
            'distance': 150,
            'color': '#ffffff',
            'opacity': 0.4,
            'width': 1
        },
        'move': {
          'enable': true,
            'speed': 1,
            'direction': 'top',
            'random': true,
            'straight': false,
            'out_mode': 'out',
            'bounce': false,
            'attract': {
            'enable': false,
              'rotateX': 600,
              'rotateY': 600
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
          'events': {
          'onhover': {
            'enable': false,
              'mode': 'bubble'
          },
          'onclick': {
            'enable': false,
              'mode': 'repulse'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 400,
              'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 250,
              'size': 0,
              'duration': 2,
              'opacity': 0,
              'speed': 3
          },
          'repulse': {
            'distance': 400,
              'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    };
  }
}
