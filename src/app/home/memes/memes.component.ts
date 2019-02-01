import {Component, OnInit} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageViewModalComponent} from '../../shared/image-view-modal/image-view-modal.component';
import {MemeApiService} from '../../services/meme-api-service';
import {MemeLikeApiService} from '../../services/meme-like-api-service';


@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
  animations: [
    trigger('rotatedState', [
      transition('* => *', [
        style({transform: 'rotate(-90deg)'}),
        animate('200ms ease-out')
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

  triggerChromosome() {
    // if (this.memInfo.myChromosome >= 30) {return;}
    // this.memInfo.chromosome++;
    // this.memInfo.myChromosome++;
    this.chromosomeState = (this.chromosomeState === 'default' ? 'rotated' : 'default');
  }

  triggerLike() {
    // this.memInfo.meLike = !this.memInfo.meLike;
    // this.memInfo.like = this.memInfo.meLike ? this.memInfo.like + 1 : this.memInfo.like - 1;
    this.likeState = (this.likeState === 'default' ? 'bounced' : 'default');
  }

  imageView(url: String) {
    const modalRef = this.modalService.open(ImageViewModalComponent, {centered: true});
    modalRef.componentInstance.meme = url;
  }

}
