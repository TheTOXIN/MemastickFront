import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {MemeViewComponent} from '../meme-view/meme-view.component';
import {Meme} from '../../model/Meme';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit, OnDestroy {

  private currentMeme: Meme;

  @ViewChild(MemeViewComponent) view: MemeViewComponent;

  constructor(
    public pagination: MemesPaginationService,
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

  memeView(meme: Meme) {
    this.currentMeme = meme;
    this.view.viewShow();
  }
}
