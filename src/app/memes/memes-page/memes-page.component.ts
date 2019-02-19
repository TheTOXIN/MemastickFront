import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MemeData} from '../../model/MemeData';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {UUID} from 'angular2-uuid';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {MemeLikeApiService} from '../../services/meme-like-api-service';
import {MemeApiService} from '../../services/meme-api-service';
import {DomSanitizer} from '@angular/platform-browser';
import {Meme} from '../../model/Meme';
import {Observable} from 'rxjs/Observable';
import {TimerObservable} from 'rxjs-compat/observable/TimerObservable';

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

  @Output()
  public viewer = new EventEmitter<Meme>();

  private timerChromosome;
  private counterChromosome = 0;

  viewerEvent(meme: Meme) {
    this.viewer.emit(meme);
  }

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
    if (this.fullChromosome(data)) { return; }

    this.startTimerChromosome(data);

    data.chromosomeState = (data.chromosomeState === 'default' ? 'rotated' : 'default');
    data.page.meme.chromosomes++;
    data.page.likes.myChromosomes++;

    this.counterChromosome++;
  }

  startTimerChromosome(data: MemeData) {
    if (this.timerChromosome !== undefined) { this.timerChromosome.unsubscribe(); }
    this.timerChromosome = TimerObservable.create(666, 1000).subscribe(() => {
      this.pushChromosome(data);
      this.timerChromosome.unsubscribe();
    });
  }

  pushChromosome(data: MemeData) {
    if (this.counterChromosome === 0) { return; }
    this.likeApi.chromosome(data.page.meme.id, this.counterChromosome);
    this.counterChromosome = 0;
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
}
