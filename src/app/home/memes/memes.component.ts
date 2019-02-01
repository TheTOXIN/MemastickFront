import {Component, OnInit} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageViewModalComponent} from '../../shared/image-view-modal/image-view-modal.component';
import {MemeApiService} from '../../services/meme-api-service';
import {MemeLikeApiService} from '../../services/meme-like-api-service';
import {MemePage} from '../../model/MemePage';


@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
  animations: [
    trigger('rotatedState', [
      transition('* => *', [
        style({transform: 'rotate(180deg)'}),
        animate('150ms ease-out')
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

  constructor(
    public page: MemesPaginationService,
    private likeApi: MemeLikeApiService,
    private memeApi: MemeApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.page.init(1, 3, 'creating', true);
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more();
    }
  }

  triggerChromosome(meme: MemePage) {
     if (meme.like.myChromosomes >= 30) { return; }

     meme.like.chromosomes++;
     meme.like.myChromosomes++;
     meme.chromosomeState = (meme.chromosomeState === 'default' ? 'rotated' : 'default');

     this.likeApi.chromosome(meme.id, 1);
  }

  triggerLike(meme: MemePage) {
    meme.like.myLike = !meme.like.myLike;

    if (meme.like.myLike) {
      meme.like.likes++;
    } else {
      meme.like.likes--;
    }

    meme.likeState = (meme.likeState === 'default' ? 'bounced' : 'default');

    this.likeApi.trigger(meme.id);
  }

  imageView(url: String) {
    const modalRef = this.modalService.open(ImageViewModalComponent, {centered: true});
    modalRef.componentInstance.meme = url;
  }

}
