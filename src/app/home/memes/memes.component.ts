import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageViewModalComponent} from '../../modals/image-view-modal/image-view-modal.component';
import {MemeApiService} from '../../services/meme-api-service';
import {MemeLikeApiService} from '../../services/meme-like-api-service';
import {MemePage} from '../../model/MemePage';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';


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

  constructor(
    public page: MemesPaginationService,
    private likeApi: MemeLikeApiService,
    private memeApi: MemeApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.page.init(3, 'creating', true);
  }

  ngOnDestroy() {
    console.log('destroy');
    this.page.destroy();
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more();
    }
  }

  triggerChromosome(meme: MemePage) {
    if (this.fullChromosome(meme)) { return; }

    meme.chromosomeState = (meme.chromosomeState === 'default' ? 'rotated' : 'default');

    meme.like.chromosomes++;
    meme.like.myChromosomes++;

    this.likeApi.chromosome(meme.id, 1);
  }

  triggerLike(meme: MemePage) {
    meme.likeState = (meme.likeState === 'default' ? 'bounced' : 'default');

    meme.like.myLike = !meme.like.myLike;
    meme.like.myLike ? meme.like.likes++ : meme.like.likes--;

    this.likeApi.trigger(meme.id);
  }

  fullChromosome(meme: MemePage) {
    return meme.like != null && meme.like.myChromosomes >= 30;
  }

  imageView(url: String) {
    const modalRef = this.modalService.open(ImageViewModalComponent, {centered: true});
    modalRef.componentInstance.meme = url;
  }

  memetickView(memetickId: UUID) {
    this.router.navigate(['/home/memetick', memetickId]);
  }

}
