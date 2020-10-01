import {Component, Input, OnInit} from '@angular/core';
import {MemetickRank} from '../../model/memetick/MemetickRank';

@Component({
  selector: 'app-dna-count',
  templateUrl: './dna-count.component.html',
  styleUrls: ['./dna-count.component.scss']
})
export class DnaCountComponent implements OnInit {

  @Input()
  public rank: MemetickRank;

  constructor() { }

  ngOnInit() {
  }
}
