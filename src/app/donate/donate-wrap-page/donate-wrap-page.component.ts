import {Component, Input, OnInit} from '@angular/core';
import {DONAT} from '../../app.constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-donate-wrap-page',
  templateUrl: './donate-wrap-page.component.html',
  styleUrls: ['./donate-wrap-page.component.scss']
})
export class DonateWrapPageComponent implements OnInit {

  @Input()
  public isLoad = false;

  @Input()
  public title = '';

  @Input()
  public description = '';

  readonly donateHref = DONAT;

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit() {

  }

  toDonate() {
    window.open(this.donateHref, '_blank');
  }

  toTop() {
    this.router.navigateByUrl('/donate');
  }
}
