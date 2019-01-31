import {Component, OnInit} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {Memetick} from '../../model/Memetick';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageViewModalComponent} from '../../shared/image-view-modal/image-view-modal.component';
import {UUID} from 'angular2-uuid';
import {MemetickAvatarApiService} from '../../services/memetick-avatar-api-service';
import {MemeApiService} from '../../services/meme-api-service';


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
    public page: MemesPaginationService,
    public avatarApi: MemetickAvatarApiService,
    private memeApi: MemeApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.page.init(1, 5, 'creating', true);
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

  imageView(url: String) {
    const modalRef = this.modalService.open(ImageViewModalComponent, {centered: true});
    modalRef.componentInstance.meme = url;
  }

}
