import {Component, Injectable, Input, OnInit} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';

@Component({
  selector: 'app-evolve-birth',
  templateUrl: './evolve-birth.component.html',
  styleUrls: ['./evolve-birth.component.scss']
})
export class EvolveBirthComponent implements OnInit {

  @Input()
  public evolve: EvolveMeme;

  constructor(

  ) {

  }

  ngOnInit() {
  }
}
