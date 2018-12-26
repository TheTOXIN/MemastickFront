import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  animations: [
    trigger('atomState', [
      state('default', style({transform: 'rotate(0)'})),
      state('rotated', style({transform: 'rotate(360deg)'})),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ]),
    trigger('memasikState', [
      state('default', style({opacity: 0})),
      state('move', style({opacity: 1, transform: 'translateY(-150px)'})),
      transition('move => default', animate('400ms ease-out')),
      transition('default => move', animate('400ms ease-in'))
    ])
  ],
})
export class FeatureComponent implements OnInit {

  stateAtom = 'default';
  stateMemasik = 'default';

  color = this.getRandomColor();
  text = 'МЕМАСИКИ';

  constructor() {
  }

  ngOnInit() {
  }

  animate() {
    if (this.stateMemasik === 'default') { this.color = this.getRandomColor(); }
    this.stateAtom = (this.stateAtom === 'default' ? 'rotated' : 'default');
    this.stateMemasik = (this.stateMemasik === 'default' ? 'move' : 'default');
  }

  getRandomColor() {
    this.color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + this.color).slice(-6);
  }

}
