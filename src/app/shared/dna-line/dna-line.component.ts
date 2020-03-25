import {Component, Input, OnInit} from '@angular/core';
import {MemetickRank} from '../../model/MemetickRank';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dna-line',
  templateUrl: './dna-line.component.html',
  styleUrls: ['./dna-line.component.scss']
})
export class DnaLineComponent implements OnInit {

  @Input()
  public rank: MemetickRank;

  public dnaCrop = 'inset(0px 0px 0px 0px)';

  constructor(
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.dnaCrop = `inset(0px ${100 - this.rank.percent}% 0px 0px)`;
  }

  public get getDnaCrop() {
    return this.sanitizer.bypassSecurityTrustStyle(this.dnaCrop);
  }
}
