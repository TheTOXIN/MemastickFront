import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemeApiService} from '../../services/meme-api-service';
import {MemeLikeApiService} from '../../services/meme-like-api-service';
import {MemeData} from '../../model/MemeData';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';
import {MemeViewComponent} from '../meme-view/meme-view.component';


@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
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
export class MemesComponent implements OnInit, OnDestroy {

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
    this.pagination.init(3, 'creating', true);
  }

  ngOnDestroy() {
    this.pagination.destroy();
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.pagination.more();
    }
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
    this.memePreview = url;
    this.view.viewShow();
  }
}
