import {Component, OnDestroy, OnInit} from '@angular/core';
import {LandingFixService} from '../shared/services/landing-fix.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

  today: number = Date.now();

  constructor(private fix: LandingFixService) {
  }

  ngOnInit() {
    this.fix.addFix();
  }

  ngOnDestroy() {
    this.fix.removeFix();
  }

}
