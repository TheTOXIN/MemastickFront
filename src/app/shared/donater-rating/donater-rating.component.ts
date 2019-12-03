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
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 700
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 10,
            color: '#ffffff'
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
          color: '#ffffff',
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
}
