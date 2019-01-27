import {Component, OnInit} from '@angular/core';
import {PaginationService} from '../../services/pagination-service';
import {Memetick} from '../../model/Memetick';
import {animate, animation, keyframes, state, style, transition, trigger, useAnimation} from '@angular/animations';


@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
  animations: [
    trigger('rotatedState', [
      transition('* => *', [
        style({transform: 'rotate(-180deg)'}),
        animate('400ms ease-out')
      ])
    ]),
    trigger('bouncedState', [
      transition('* => *', [
        style({ transform: 'scale(1)' }),
        animate(200, keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.5)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class MemesComponent implements OnInit {

  chromosomeState = 'default';
  likeState = 'default';

  public avatarURL: String = 'dasdasdasdasd';

  public memes = [
    'assets/memes/1.jpg',
    'assets/memes/2.jpg',
    'assets/memes/3.jpg',
    'assets/memes/4.jpg',
    'assets/memes/5.jpg',
    'assets/memes/6.jpg',
    'assets/memes/7.jpg',
    'assets/memes/8.jpg',
    'assets/memes/9.jpg',
    'assets/memes/10.jpg',
  ];

  public memInfo = {
    chromosome: 100500,
    like: 777,
    meLike: false,
    myChromosome: 20
  };

  public memetick: Memetick = new Memetick(
    'blablalbal',
    'TEST_NICK'
  );

  constructor(
    public page: PaginationService
  ) {

  }

  ngOnInit() {
    this.page.init('memes', 'date', {reverse: true, prepend: false});
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more();
    }
  }

  triggerChromosome() {
    if (this.memInfo.myChromosome >= 30) {
      return;
    }
    this.memInfo.chromosome++;
    this.memInfo.myChromosome++;
    this.chromosomeState = (this.chromosomeState === 'default' ? 'rotated' : 'default');
  }

  triggerLike() {
    this.memInfo.meLike = !this.memInfo.meLike;
    this.memInfo.like = this.memInfo.meLike ? this.memInfo.like + 1 : this.memInfo.like - 1;
    this.likeState = (this.likeState === 'default' ? 'bounced' : 'default');
  }

}
