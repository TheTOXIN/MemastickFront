import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MemetickRank} from '../../model/memetick/MemetickRank';

@Component({
  selector: 'app-dna-line',
  templateUrl: './dna-line.component.html',
  styleUrls: ['./dna-line.component.scss']
})
export class DnaLineComponent implements OnInit {

  @Input()
  public rank: MemetickRank;

  public dnaCrop = 'inset(0px 0px 0px 0px)';
  public dnaPerc = 0;

  private interval;

  constructor(
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.initDnaCrop();
    this.interval = setInterval(() => this.incrementDna(), 10);
  }

  incrementDna() {
    if (this.dnaPerc > this.rank.percent) {
      clearInterval(this.interval);
      return;
    } else {
      this.dnaPerc += 1;
      this.initDnaCrop();
    }
  }

  initDnaCrop() {
    this.dnaCrop = `inset(0px ${100 - this.dnaPerc}% 0px 0px)`;
  }

  public get getDnaCrop() {
    return this.sanitizer.bypassSecurityTrustStyle(this.dnaCrop);
  }
}
