import { Component, OnInit } from '@angular/core';
import {PaginationService} from '../../services/pagination-service';
import {Memetick} from '../../model/Memetick';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit {

  public avatarURL: String = 'dasdasdasdasd';

  public memes = [
    'assets/memes/1.jpg',
    'assets/memes/2.jpg',
    'assets/memes/3.jpg',
    'assets/memes/4.jpg',
    'assets/memes/5.jpg',
    'assets/memes/6.jpg',
    'assets/memes/7.jpg',
    'assets/memes/8.jpg',
    'assets/memes/9.jpg',
    'assets/memes/10.jpg',
  ];

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
