import { Component, OnInit } from '@angular/core';
import {PaginationService} from '../../services/pagination-service';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit {

  constructor(
    public page: PaginationService
  ) {

  }

  ngOnInit() {
    this.page.init('memes', 'date', { reverse: true, prepend: false });
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more();
    }
  }

}
