import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MemeData} from '../../model/MemeData';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {UUID} from 'angular2-uuid';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {MemeLikeApiService} from '../../services/meme-like-api-service';
import {MemeApiService} from '../../services/meme-api-service';
import {DomSanitizer} from '@angular/platform-browser';
import {MemeViewComponent} from '../meme-view/meme-view.component';

@Component({
  selector: 'app-memes-page',
  templateUrl: './memes-page.component.html',
  styleUrls: ['./memes-page.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('default => rotated', [style({transform: 'rotate(-360deg)'}), animate('150ms ease-out')]),
      transition('rotated => default', animate('150ms ease-in'))
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
export class MemesPageComponent implements OnInit {

  @Input()
  public data: MemeData;

  private memePreview: string;

  @ViewChild(MemeViewComponent) view: MemeViewComponent;

  constructor(
    public pagination: MemesPaginationService,
    private likeApi: MemeLikeApiService,
    private memeApi: MemeApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private router: Router
  ) {

  }
  ngOnInit() {
  }

  triggerChromosome(data: MemeData) {
    if (this.fullChromosome(data)) {
      return;
    }

    data.chromosomeState = (data.chromosomeState === 'default' ? 'rotated' : 'default');

    data.page.likes.chromosomes++;
    data.page.likes.myChromosomes++;

    this.likeApi.chromosome(data.page.meme.id, 1);
  }

  triggerLike(data: MemeData) {
    data.likeState = (data.likeState === 'default' ? 'bounced' : 'default');

    data.page.likes.myLike = !data.page.likes.myLike;
    data.page.likes.myLike ? data.page.likes.likes++ : data.page.likes.likes--;

    this.likeApi.trigger(data.page.meme.id);
  }

  fullChromosome(data: MemeData) {
    return data.page.likes != null && data.page.likes.myChromosomes >= 30;
  }

  memetickView(memetickId: UUID) {
    this.router.navigate(['/home/memetick', memetickId]);
  }

  memeView(url: string) {
    console.log("MEME");
    this.memePreview = url;
    this.view.viewShow();
  }
}
