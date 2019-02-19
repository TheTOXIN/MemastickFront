import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit, OnDestroy {

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
}
