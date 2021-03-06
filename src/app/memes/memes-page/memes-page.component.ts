import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MemeData} from '../../model/MemeData';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {MemeLikeApiService} from '../../api/meme-like-api-service';
import {MemeApiService} from '../../api/meme-api-service';
import {DomSanitizer} from '@angular/platform-browser';
import {Meme} from '../../model/Meme';
import {TimerObservable} from 'rxjs-compat/observable/TimerObservable';
import {EvolveStep} from '../../consts/EvolveStep';
import {MemeType} from '../../consts/MemeType';
import {ValidConst} from '../../consts/ValidConst';
import {evolveIcons, memeIcons} from '../../consts/IconsData';
import {MemeResearchComponent} from '../meme-research/meme-research.component';
import {MemetickCardComponent} from '../../memetick/memetick-card/memetick-card.component';
import {CardService} from '../../services/card-service';
import {MemeStateInfoModalComponent} from '../meme-state-info-modal/meme-state-info-modal.component';

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
    ]),
    trigger('counterState', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate(300, style({ transform: 'translateY(-25%)', opacity: 0.5 })),
        animate(500, style({ opacity: 1 })),
        animate(100, style({ transform: 'translateY(-50%)', opacity: 0 }))
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

  private stepIcons;
  private typeIcons;

  constructor(
    public pagination: MemesPaginationService,
    private likeApi: MemeLikeApiService,
    private memeApi: MemeApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private cardService: CardService
  ) {
    this.stepIcons = evolveIcons;
    this.typeIcons = memeIcons;
  }

  ngOnInit() {
  }

  triggerChromosome(data: MemeData) {
    data.counterState = (data.counterState === 'default' ? 'count' : 'default');

    if (this.fullChromosome(data)) { return; }
    if (this.isMemeDeath(data.page.meme)) { return; }

    data.page.likes.firstChromosome = false;
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
    data.page.likes.myLike ? data.page.meme.likes++ : data.page.meme.likes--;

    this.likeApi.trigger(data.page.meme.id);
  }

  fullChromosome(data: MemeData) {
    return data.page.likes != null && data.page.likes.myChromosomes >= ValidConst.MAX_CHROMOSOME;
  }

  evolveStepInfo(step: EvolveStep) {
    const modalRef = this.modalService.open(MemeStateInfoModalComponent, {'centered': true});
    modalRef.componentInstance.step = step;
  }

  memeTypeInfo(type: MemeType) {
    const modalRef = this.modalService.open(MemeStateInfoModalComponent, {'centered': true});
    modalRef.componentInstance.type = type;
  }

  loadMeme(data: MemeData) {
    data.loadState = true;
  }

  isMemeDeath(meme: Meme) {
    return meme.type === MemeType.DEAD;
  }

  memeResearch() {
    this.cardService.open({
      content: MemeResearchComponent,
      meme: this.data.page.meme
    });
  }

  memetickCard() {
    this.cardService.open({
      content: MemetickCardComponent,
      memetickId: this.data.page.memetick.id
    });
  }

  viewerEvent(meme: Meme) {
    if (this.isMemeDeath(meme)) { return; }
    this.viewer.emit(meme);
  }
}
